import { refs } from './library-refs';

const activateWatchedBtn = () => {
  refs.headerWatchedBtn.classList.add('library-header__btn--active');
};
const activateQueueBtn = () => {
  refs.headerQueueBtn.classList.add('library-header__btn--active');
};

const deactivateWatchedBtn = () => {
  refs.headerWatchedBtn.classList.remove('library-header__btn--active');
};

const deactivateQueueBtn = () => {
  refs.headerQueueBtn.classList.remove('library-header__btn--active');
};

export { activateWatchedBtn, activateQueueBtn, deactivateWatchedBtn, deactivateQueueBtn };