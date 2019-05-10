<template>
  <div id="learnSomeJsFunc">
    <p @click="clickp1" id="p1">这是一个段落。</p>
    <p id="p2">这是另一个段落。</p>
    <Button @click="createP">创建一个p</Button>
    <p id="demo">单击按钮创建一个数组,调用 ucase（）方法, 并显示结果。</p>
    <Button @click="ucase">点我调用 ucase（）方法, 并显示结果</Button>
    <br/>
    <Button @click="addEventListener">给p1添加点击事件</Button>
    <Button @click="removeEventListener">移除p1的点击事件</Button>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {

    }
  },
  components: {

  },
  methods: {
    removeEventListener () {
      console.log('document.getElementById()', document.getElementById('p1'));
      document.getElementById('p1').removeEventListener("click", function() {
        console.log('你移除了点击p1');
      });
    },
    addEventListener () {
      document.getElementById('p1').addEventListener("click", function() {
        console.log('你点击p1');
      });
    },
    ucase () {
      var fruits = ["Banana", "Orange", "Apple", "Mango"];
      fruits.myUcase()
      console.log('fruits', fruits);
      var x = document.getElementById("demo");
      x.innerHTML = fruits;
    },
    clickp1() {
      this.console.log('你点击p1')
    },
    createP () {
      // console.log('createp');
      let parent = document.getElementById('learnSomeJsFunc')
      console.dir(parent)
      let para = document.createElement('p')
      var node = document.createTextNode('创建出来的p')
      debugger
      para.appendChild(node)
      parent.appendChild(para)
      var child = document.getElementById('p1')
      console.log('child', child)
      parent.removeChild(child)
    }
  },
  created () {
    Array.prototype.myUcase = function() {
      // for (let i=0;i < this.length; i++) {
      //   this[i] = this[i].toUpperCase();
      // }
      this.forEach((item,index) => {
        this[index] = item.toUpperCase();
      })
      // console.log('array', this);
    }
  },
  mounted () {
  }
}
</script>
