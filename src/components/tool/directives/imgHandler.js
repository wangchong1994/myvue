const imgHandler = function imgHandler(el, binding, vNode) {
  const self = vNode.context;
  const callback = binding.value;
  const oImgs = el.getElementsByTagName('img');

  /* eslint-disable no-restricted-syntax */
  for (const oImg of oImgs) {
    const clickImg = () => {
      self.$Modal.confirm({
        width: '1024px',
        render: h => h('img', {
          attrs: {
            src: oImg.src,
          },
          on: {
            click: () => {
              self.$Modal.remove();
            },
          },
          style: {
            width: '100%',
          },
        }),
      });
      if (callback) {
        callback(oImg.src);
      }
    };
    oImg.addEventListener('click', clickImg);
  }
};

export default {
  bind: imgHandler,
  update: imgHandler,
  componentUpdated: imgHandler,
};
