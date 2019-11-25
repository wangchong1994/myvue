/* eslint-disable no-param-reassign */
const hideFixed = function hideFixed(el, binding) {
  const { value } = binding;
  let { id } = value;
  id = id.replace(/^#(\w+)/, '$1');
  const { hideTop, top } = value;
  const parent = document.getElementById(id);
  parent.addEventListener('scroll', () => {
    if (parent.scrollTop > hideTop) {
      el.style.position = 'fixed';
      el.style.top = `${top}px`;
    } else {
      el.style.position = 'relative';
      el.style.top = 0;
    }
  });
};
/* eslint-enable */
export default {
  componentUpdated: hideFixed,
};
