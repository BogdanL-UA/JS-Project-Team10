import Notiflix from 'notiflix';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {
  getDatabase,
  set,
  ref,
  update,
  push,
  onValue,
} from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyANvf5DboogtJf9gd318qK6ilPZ01xrlU8',
  authDomain: 'js-project-team10.firebaseapp.com',
  projectId: 'js-project-team10',
  storageBucket: 'js-project-team10.appspot.com',
  messagingSenderId: '385026279680',
  appId: '1:385026279680:web:184d90dda8d043ce558be5',
  measurementId: 'G-TVCY6RM8XF',
  databaseURL:
    'https://js-project-team10-default-rtdb.europe-west1.firebasedatabase.app/',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
let filmsInQueue;
let filmsInWatched;

const logInForm = document.querySelector('.log-in__form');
const registrationForm = document.querySelector('.registration__form');
const signOutBtn = document.querySelector('.sign-out-button');
const logInBtn = document.querySelector('.log-in-button');
const signUpBtn = document.querySelector('.sign-up-btn');
const authModal = document.querySelector('#auth');
const authCloseBtn = document.querySelector('.authorisation__closeBtn');
// const firstBtn = document.querySelector(".test-btn1");
// const secondBtn = document.querySelector(".test-btn2");
// const thirdBtn = document.querySelector(".test-btn3");

let userUid = localStorage.getItem('uid');
if (userUid != null && signOutBtn.classList.contains('is-hidden')) {
  signOutBtn.classList.remove('is-hidden');
  logInBtn.classList.add('is-hidden');
}

registrationForm.addEventListener('submit', async e => {
  e.preventDefault();
  const {
    elements: { email, password },
  } = e.currentTarget;

  await createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(userCredential => {
      // Signed in
      let user = userCredential.user;

      userUid = user.uid;
      localStorage.setItem('uid', userUid);
      set(ref(database, 'users/' + user.uid), {
        email: email.value,
        password: password.value,
        queuedFilms: '[]',
        watchedFilms: '[]',
      });
      getQueuedFilms();
      getWatchedFilms();
      signOutBtn.classList.remove('is-hidden');
      logInBtn.classList.add('is-hidden');
      logInForm.classList.remove('is-hidden');
      registrationForm.classList.add('is-hidden');
      authModal.classList.add('is-hidden');
      let lgDate = new Date();
      update(ref(database, 'users/' + user.uid), {
        last_login: lgDate,
      })
        .then(() => {
          Notiflix.Notify.info('User successfully created');
          // Data saved successfully!
        })
        .catch(error => {
          // The write failed...
          Notiflix.Notify.warning(error);
        });
      // ...
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      Notiflix.Notify.warning(errorMessage);

      // ..
    });
});

logInForm.addEventListener('submit', e => {
  e.preventDefault();
  const {
    elements: { email, password },
  } = e.currentTarget;

  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(userCredential => {
      // Signed in
      signOutBtn.classList.remove('is-hidden');
      logInBtn.classList.add('is-hidden');
      authModal.classList.add('is-hidden');

      let user = userCredential.user;

      userUid = user.uid;
      getQueuedFilms();
      getWatchedFilms();
      localStorage.setItem('uid', userUid);
      let lgDate = new Date();
      update(ref(database, 'users/' + user.uid), {
        last_login: lgDate,
      })
        .then(() => {
          Notiflix.Notify.info('User successfully logged in');
          // Data saved successfully!
        })
        .catch(error => {
          // The write failed...
          Notiflix.Notify.warning(error);
        });
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      Notiflix.Notify.warning(errorMessage);
    });
});

signOutBtn.addEventListener('click', e => {
  e.preventDefault();
  signOut(auth)
    .then(() => {
      Notiflix.Notify.info('User successfully signed out');
      signOutBtn.classList.add('is-hidden');
      logInBtn.classList.remove('is-hidden');
      localStorage.removeItem('uid', userUid);
      localStorage.removeItem('watchedMovies');
      localStorage.removeItem('queueMovies');
      // Sign-out successful.
    })
    .catch(error => {
      const errorMessage = error.message;
      Notiflix.Notify.warning(errorMessage);
      // An error happened.
    });
});

signUpBtn.addEventListener('click', e => {
  e.preventDefault();
  logInForm.classList.add('is-hidden');
  registrationForm.classList.remove('is-hidden');
});

logInBtn.addEventListener('click', e => {
  e.preventDefault();
  authModal.classList.remove('is-hidden');
});

authCloseBtn.addEventListener('click', e => {
  e.preventDefault();
  authModal.classList.add('is-hidden');

  if (logInForm.classList.contains('is-hidden')) {
    logInForm.classList.remove('is-hidden');
    registrationForm.classList.add('is-hidden');
  }
});

function setQueuedFilm(filmId) {
  getQueuedFilms();
  let queuedFilms = JSON.parse(filmsInQueue);

  queuedFilms.push(filmId);
  let strQueuedFilms = JSON.stringify(queuedFilms);

  const newQueuedFilmRef = ref(database, 'users/' + userUid);
  update(newQueuedFilmRef, {
    queuedFilms: strQueuedFilms,
  })
    .then(() => {
      alert('success');
    })
    .catch(error => {
      alert(error);
    });
}

function getQueuedFilms() {
  const queuedFilmsListRef = ref(database, 'users/' + userUid);
  onValue(queuedFilmsListRef, snapshot => {
    const data = snapshot.val();
    filmsInQueue = data.queuedFilms;
    localStorage.setItem('queueMovies', filmsInQueue);
  });
}

function removeQueuedFilm(filmId) {
  getQueuedFilms();
  let queuedFilms = JSON.parse(filmsInQueue);
  queuedFilms.splice(queuedFilms.indexOf(filmId), 1);
  let strQueuedFilms = JSON.stringify(queuedFilms);
  const newQueuedFilmRef = ref(database, 'users/' + userUid);
  update(newQueuedFilmRef, {
    queuedFilms: strQueuedFilms,
  })
    .then(() => {
      alert('success');
    })
    .catch(error => {
      alert(error);
    });
}

// firstBtn.addEventListener("click", (e) => {
//     e.preventDefault();
//     setQueuedFilm(122313);
//     setQueuedFilm(442313);
//     setQueuedFilm(333);
//     console.log(filmsInQueue);
// })

// secondBtn.addEventListener("click", (e) => {
//     e.preventDefault();
//     removeQueuedFilm(122313);
// })

// thirdBtn.addEventListener("click", (e) => {
//     e.preventDefault();
//     getQueuedFilms();
//     console.log(filmsInQueue);
// })

function setWatchedFilm(filmId) {
  getWatchedFilms();
  let watchedFilms = JSON.parse(filmsInWatched);

  watchedFilms.push(filmId);
  let strWatchedFilms = JSON.stringify(watchedFilms);

  const newWatchedFilmRef = ref(database, 'users/' + userUid);
  update(newWatchedFilmRef, {
    watchedFilms: strWatchedFilms,
  })
    .then(() => {
      alert('success');
    })
    .catch(error => {
      alert(error);
    });
}

function getWatchedFilms() {
  const watchedFilmsListRef = ref(database, 'users/' + userUid);
  onValue(watchedFilmsListRef, snapshot => {
    const data = snapshot.val();
    filmsInWatched = data.watchedFilms;
    localStorage.setItem('watchedMovies', filmsInWatched);
  });
}

function removeWatchedFilm(filmId) {
  getWatchedFilms();
  let watchedFilms = JSON.parse(filmsInWatched);
  watchedFilms.splice(watchedFilms.indexOf(filmId), 1);
  let strWatchedFilms = JSON.stringify(watchedFilms);
  const newWatchedFilmRef = ref(database, 'users/' + userUid);
  update(newWatchedFilmRef, {
    watchedFilms: strWatchedFilms,
  })
    .then(() => {
      alert('success');
    })
    .catch(error => {
      alert(error);
    });
}
