export default {
  // function debounce(fn, wait) {
  //   let timeout = null;
  //   return function callback(...args) {
  //     if (timeout) {
  //       clearTimeout(timeout);
  //     }
  //     timeout = setTimeout(() => {
  //       fn.apply(this, args); // this 指向vue
  //     }, wait);
  //   };
  // }
  // 防抖
  debounce(fn, delay = 300) {   //默认300毫秒
      var timer;
      return function() {
          var args = arguments;
          if(timer) {
              clearTimeout(timer);
          }
          timer = setTimeout(() => {
              fn.apply(this, args);   // this 指向vue
          }, delay);
      };
  }
}