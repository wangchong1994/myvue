

// let date = new Date();
// console.log("newDate",new Date().getTime());

 //箭头函数
// var fn = x => x * x;  //那么fn是一个函数吧 
// var doublex = fn(3);
// console.log("doublex", typeof(doublex)); //doublex number
// console.log("fn", typeof(fn)); //fn function
// Object.assign({c: 2, a: 5}, object1);


//   Object.assign 函数
// const object1 = {
//   a: 1,
//   b: 2,
//   c: 4
// };

// const object2 = Object.assign({c: 2, a: 5}, object1);

// console.log(object2);


var arr = [23, 9, 4, 78, 3, 2];
var compare = function (x, y) {//比较函数
	console.log(x,y);
        return 1;
}
console.log(arr.sort(compare));        