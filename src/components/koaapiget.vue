<template>
  <div>
  <Button  @click="getapibody">调用api</Button>
  <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="Name" prop="username">
            <Input v-model="formValidate.username" placeholder="Enter your name"></Input>
        </FormItem>
        <FormItem label="E-mail" prop="mail">
            <Input v-model="formValidate.mail" placeholder="Enter your e-mail"></Input>
        </FormItem>
        <FormItem label="password" prop="password">
            <Input v-model="formValidate.password" placeholder="Enter your password"></Input>
        </FormItem>
      </Form>
  <Button  @click="setcookie">设置cookie</Button>
  <Button  @click="login">登录账号</Button>
  <Button  @click="creatuser">创建账号</Button>
  <Button  @click="getuserlist">获取所有账号</Button>
</div>
</template>

<script>
export default {

  name: 'koaapiget',

  data() {
    return {
      formValidate: {
        password: '',
        username: '',
        mail: '',
      },
      ruleValidate: {
        username: [
            { required: true, message: 'The name cannot be empty', trigger: 'blur' }
        ],
        mail: [
            { required: false, message: 'Mailbox cannot be empty', trigger: 'blur' },
            { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
        ],
        password: [
        { required: true, message: 'Please enter a personal introduction', trigger: 'blur' },
        { type: 'string', min: 6, message: 'Introduce no less than 6 words', trigger: 'blur' }]
      }
    };
  },
  methods:{
    getapibody(){
      console.log('获取apibody');
      this.$http('http://localhost:3000/mongo').then((data)=>{
        console.log(data)
      })
    },
    creatuser(){
      this.$refs.formValidate.validate((valid) => {
        if (valid) {
            let data = this.formValidate;
            this.$http.post('http://localhost:3000/creatuser', data).then(({data})=>{
            console.log(data);
            if(data.err_code === 0) {
              this.$Message.success('Success!');
            } else {
              this.$Message.error(data.err_msg);
            }
            })
        } else {
            this.$Message.error('Fail!');
        }
      })
    },
    login() {
      this.$refs.formValidate.validate((valid) => {
        if (valid) {
            let data = this.formValidate;
            this.$http.post('http://localhost:3000/login', data).then(({ data })=>{
            console.log(data);
            if(data.response.err_code === 0) {
              this.$Message.success('Success!');
            } else {
              this.$Message.error(data.response.err_msg);
            }
            })
        } else {
            this.$Message.error('Fail!');
        }
      })
    },
    getuserlist() {
      this.$http.post('http://localhost:3000/getuserlist').then(({ data })=>{
            console.log(data);
            if(data.response.err_code === 0) {
              this.$Message.success('Success!');
            } else {
              this.$Message.error(data.response.err_msg);
            }
            })
    },
    setcookie() {
      document.cookie = "王冲" + "=" + escape("is_the_best");
    }
  }
};
</script>

<style lang="css" scoped>
</style>
