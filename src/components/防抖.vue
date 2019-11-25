防抖<input v-model="searchText" @input='search' placeholder="搜索电影" class="search-placeholder">
在公共的js文件utils.js中添加防抖函数如下：

export default {
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
调用：

import utils from "@/js/utils";
 
export default {
 
    methods: {
        search: utils.debounce(function() {
            let v = this;
            let serchURL = `/movie/search?q=${v.searchText}&start=0&count=10`;
            v.$axios
             .get(serchURL)
             .then(response => {
                  v.processSearchData(response.data);
             })
             .catch(error => {
                 console.log(error)
             })
             .finally()
         })
    }
 
}
