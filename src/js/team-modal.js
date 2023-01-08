import teamList from './team-list';
import lnImg from '../images/ld.png';
import gitImg from '../images/git.png';
const body = document.body;
const list = document.querySelector('.team__list');
const modal = document.querySelector('.goit-students');
const backdropteam = document.querySelector('.team-backdrop');
const closeModal = document.querySelector('.close-modal-btn');
const teamBuild = ({ teamate, photo, role, git, ln }) => {
  return `<li class="team__item">

    <img src=${photo} alt="${teamate}" class="team__item-img" loading="lazy" width="250"/>
    <div class="team__item-data">
      <p class="team__item-name">${teamate}</p>
      <p class="team__item-role">${role}</p>
      <div class="team__item-wrap">
        <a href=${git} target="_blank" class="team__item-link">
          <img width="15" height="15"
            src=${gitImg}
            alt=""
            class="team__item-icon"
          />
        </a>
        <a href=${ln} target="_blank" class="team__item-link">
          <img width="15" height="15"
            src=${lnImg}
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
