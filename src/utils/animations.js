export const onAppear = (el) => {
  setTimeout(() => {
    el.classList.add('fadeIn');
    setTimeout(() => {
      // eslint-disable-next-line no-param-reassign
      el.style.opacity = '';
      el.classList.remove('fadeIn');
    }, 500);
  }, 0);
};

export const onExit = (el, _, removeElement) => {
  setTimeout(() => {
    el.classList.add('fadeOut');
    setTimeout(removeElement, 500);
  }, 0);
};
