<template>
  <Button  @click="getapibody">调用api</Button>
</template>

<script>
export default {

  name: 'koaapiget',

  data() {
    return {

    };
  },
  methods:{
    getapibody(){
      console.log('获取apibody');
      this.$http('http://localhost:3000/string/data1').then((data)=>{
        console.log(data)
      })
    }
  }
};
</script>

<style lang="css" scoped>
</style>
