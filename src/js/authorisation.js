import Notiflix from 'notiflix';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getDatabase, set, ref, update, push, onValue, DataSnapshot } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyANvf5DboogtJf9gd318qK6ilPZ01xrlU8",
  authDomain: "js-project-team10.firebaseapp.com",
  projectId: "js-project-team10",
  storageBucket: "js-project-team10.appspot.com",
  messagingSenderId: "385026279680",
  appId: "1:385026279680:web:184d90dda8d043ce558be5",
  measurementId: "G-TVCY6RM8XF",
  databaseURL: "https://js-project-team10-default-rtdb.europe-west1.firebasedatabase.app/"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);


const logInForm = document.querySelector(".log-in__form");
const registrationForm = document.querySelector('.registration__form');
const signOutBtn = document.querySelector(".sign-out-button");
const logInBtn = document.querySelector(".log-in-button");
const signUpBtn = document.querySelector(".sign-up-btn");
const authModal = document.querySelector("#auth");
const authCloseBtn = document.querySelector(".authorisation__closeBtn");
const watchedBtn = document.querySelector(".movie__watched");
const queueBtn = document.querySelector(".movie__queue");

let userUid = localStorage.getItem("uid");
if (userUid != null  && signOutBtn.classList.contains("is-hidden")) {
    signOutBtn.classList.remove("is-hidden");
    logInBtn.classList.add("is-hidden");
}

registrationForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const {
        elements: { email, password }
    } = e.currentTarget;

    await createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
        // Signed in 
            user = userCredential.user;
            userUid = user.uid;
            localStorage.setItem("uid", userUid);
            set(ref(database, 'users/' + user.uid), {
            email: email.value,
            password: password.value
            })
            signOutBtn.classList.remove("is-hidden");
            logInBtn.classList.add("is-hidden");
            logInForm.classList.remove("is-hidden");
            registrationForm.classList.add("is-hidden");
            authModal.classList.add("is-hidden");
            let lgDate = new Date();
            update(ref(database, 'users/' + user.uid), {
                last_login: lgDate
            })
                .then(() => {
                    Notiflix.Notify.info('User successfully created');
                // Data saved successfully!
                })
                .catch((error) => {
                // The write failed...
                    Notiflix.Notify.warning(error);
                });
        // ...
        
        })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
            Notiflix.Notify.warning(errorMessage);
            
        // ..
        });
});

logInForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const {
        elements: { email, password }
    } = e.currentTarget;

    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            // Signed in 
            signOutBtn.classList.remove("is-hidden");
            logInBtn.classList.add("is-hidden");
            authModal.classList.add("is-hidden");
            user = userCredential.user;
            userUid = user.uid;
            localStorage.setItem("uid", userUid);
            let lgDate = new Date();
            update(ref(database, 'users/' + user.uid), {
                last_login: lgDate
            })
                .then(() => {
                    Notiflix.Notify.info('User successfully logged in');
                // Data saved successfully!
                })
                .catch((error) => {
                // The write failed...
                    Notiflix.Notify.warning(error);
                });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            Notiflix.Notify.warning(errorMessage);
        });
});

signOutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    signOut(auth).then(() => {
        Notiflix.Notify.info('User successfully signed out');
        signOutBtn.classList.add("is-hidden");
        logInBtn.classList.remove("is-hidden");
        localStorage.removeItem("uid", userUid);
    // Sign-out successful.
    }).catch((error) => {
        const errorMessage = error.message;
        Notiflix.Notify.warning(errorMessage);
    // An error happened.
    });

});

signUpBtn.addEventListener("click", (e) => {
    e.preventDefault();
    logInForm.classList.add("is-hidden");
    registrationForm.classList.remove("is-hidden");
});

logInBtn.addEventListener("click", (e) => {
    e.preventDefault();
    authModal.classList.remove("is-hidden");
});

authCloseBtn.addEventListener("click", (e) => {
    e.preventDefault();
    authModal.classList.add("is-hidden");

    if (logInForm.classList.contains("is-hidden")) {
        logInForm.classList.remove("is-hidden");
        registrationForm.classList.add("is-hidden");
    }
});

export function setQueuedFilm(filmId){
    const queuedFilmsListRef = ref(database, 'users/' + user.uid + '/queuedFilms');
    const newQueuedFilmRef = push(queuedFilmsListRef);
    set(newQueuedFilmRef, {
        filmId
    }).then(() => {
        alert("success");
    }).catch((error) => {
        alert(error);
    })
}

export function getQueuedFilms(){
    const queuedFilmsListRef = ref(database, 'users/' + user.uid + '/queuedFilms');
    onValue(queuedFilmsListRef, (DataSnapshot) => {
        const data = DataSnapshot.val();
        return data;
    }).then(() => {
        alert("success");
    }).catch((error) => {
        alert(error);
    })
}

export function setWatchededFilm(filmId){
    const watchedFilmsListRef = ref(database, 'users/' + user.uid + '/watchedFilms');
    const newWatchedFilmRef = push(watchedFilmsListRef);
    set(newWatchedFilmRef, {
        filmId
    }).then(() => {
        alert("success");
    }).catch((error) => {
        alert(error);
    })
}