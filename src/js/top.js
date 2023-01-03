
const refs ={
    scrollUp: document.querySelector('.top'),
    scrollUpSvgPath: document.querySelector('.top__svg--path'),
};
function topUp() {
    const offset = 600;
    const pathLength = refs.scrollUpSvgPath.getTotalLength();

    refs.scrollUpSvgPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
    refs.scrollUpSvgPath.style.transition = 'stroke-dashoffset 20ms';

    const getTop = () => window.pageXOffset || document.documentElement.scrollTop;

    const updateDashoffset = () => {
        const height = document.documentElement.scrollHeight - window.innerHeight;
        const dashoffset = pathLength - (getTop() * pathLength) / height;

        refs.scrollUpSvgPath.style.strokeDashoffset = dashoffset;
    };

    window.addEventListener('scroll', () => {
        updateDashoffset();
        if (getTop() > offset) {
            refs.scrollUp.classList.add('top--active');
        } else {
            refs.scrollUp.classList.remove('top--active');
        }
    });

    refs.scrollUp.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    });
}
export default topUp;