import teamList from './teamList';
const body = document.body;
const list = document.querySelector('.team__list');
const modal = document.querySelector('.goit-students');
const backdrop = document.querySelector('.team-backdrop');
const closeModal = document.querySelector('.close-modal');
const teamBuild = ({ teamate, photo, role, git, ln }) => {
  return `<li class="team__item">
    <img src=${photo} alt="" class="team__item-img" />
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
const onCloseModal = () => {
  body.classList.remove('modal-open');
  backdrop.classList.add('visually-hidden');
  backdrop.classList.add('is-hidden');
  return closeModal.removeEventListener('click', onCloseModal);
};
const onClick = e => {
  e.preventDefault();
  body.classList.add('modal-open');
  backdrop.classList.remove('visually-hidden');
  backdrop.classList.remove('is-hidden');
  closeModal.addEventListener('click', onCloseModal);
};
modal.addEventListener('click', onClick);

// import teamList from "./teamList";
// import teamTpl from "../../templates/team.hbs";
// import markup from "./teamModalMarkup";

// import * as basicLightbox from "basiclightbox";

// const modalTeamRef = document.querySelector(".footer__btn");

// modalTeamRef.addEventListener("click", onOpenModalTeam);

// function onOpenModalTeam() {
//   console.log("Hello");
//   const modalTeam = basicLightbox.create(markup, {
//     onShow: modalTeam => {
//       window.addEventListener("keydown", escapeKeyCloseModal);
//       window.addEventListener("click", clickForCloseModal);
//       modalTeam.element().querySelector(".modal__close").onclick =
//         modalTeam.close;
//     },
//     onClose: modalTeam => {
//       window.removeEventListener("keydown", escapeKeyCloseModal);
//       window.removeEventListener("click", clickForCloseModal);
//     },
//   });
//   function escapeKeyCloseModal(event) {
//     if (event.code === "Escape") {
//       modalTeam.close();
//     }
//   }
//   function clickForCloseModal(event) {
//     console.log(event.target.classList.value);
//     if (event.target.classList.value === "basicLightbox__placeholder") {
//       modalTeam.close();
//     }
//   }

//   modalTeam.show();
// }
