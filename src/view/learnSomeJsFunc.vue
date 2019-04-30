<template>
  <div id="learnSomeJsFunc">
    <p @click="clickp1" id="p1">这是一个段落。</p>
    <p id="p2">这是另一个段落。</p>
    <Button @click="createP">创建一个p</Button>
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
    console.log('addEventListener');
    document.getElementById('p1').addEventListener("click", function() {
      console.log('你点击p1');
    }, false);
  }
}
</script>
