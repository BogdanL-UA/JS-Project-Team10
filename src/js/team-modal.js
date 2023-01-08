import teamList from './team-list';
const body = document.body;
const list = document.querySelector('.team__list');
const modal = document.querySelector('.goit-students');
const backdropteam = document.querySelector('.team-backdrop');
const closeModal = document.querySelector('.close-modal-btn');
const teamBuild = ({ teamate, photo, role, git, ln }) => {
  return `<li class="team__item">
    <img src=${photo} alt="${teamate}" class="team__item-img" />
    <div class="team__item-data">
      <p class="team__item-name">${teamate}</p>
      <p class="team__item-role">${role}</p>
      <div class="team__item-wrap">
        <a href=${git} target="_blank">
          <img width="15" height="15"
            src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-social-github-512.png"
            alt=""
            class="team__item-icon"
          />
        </a>
        <a href=${ln} target="_blank">
          <img width="15" height="15"
            src="https://cdn4.iconfinder.com/data/icons/social-media-free-13/32/Linkedin_social_media_logo-512.png"
            alt=""
            class="team__item-icon"
          />
        </a>
      </div>
    </div>
  </li>`;
};
teamList.map(person => list.insertAdjacentHTML('beforeend', teamBuild(person)));

const onClick = e => {
  e.preventDefault();
  body.classList.add('modal-open');
  backdropteam.classList.remove('visually-hidden');
};
modal.addEventListener('click', onClick);

const onClickClose = e => {
  e.preventDefault();
  body.classList.remove('modal-open');
  backdropteam.classList.add('visually-hidden');
};
closeModal.addEventListener('click', onClickClose);

window.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    body.classList.remove('modal-open');
    backdropteam.classList.add('visually-hidden');
  }
});

backdropteam.addEventListener('click', onBackdroTeampClick);
function onBackdroTeampClick(event) {
  if (event.currentTarget === event.target) {
    body.classList.remove('modal-open');
    backdropteam.classList.add('visually-hidden');
  }
}
