<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <Button>Default</Button>
    <Button type="primary">Primary</Button>
    <Button type="dashed">Dashed</Button>
    <Button type="text">Text</Button>
    <br><br>
    <Button type="info">Info</Button>
    <Button type="success">Success</Button>
    <Button type="warning">Warning</Button>
    <Button type="error">Error</Button>
    <datapicker style="width: 20%;"
                              :value.sync="filters.DateRange"
                              placeholder="请选择"
                              :presets="['前7天', '前30天', '本月', '上月']">
   </datapicker>
      <br/>
        <Row>
        <Col span="8">  
          <Select  style="width:200px">
            <Option v-for="item in statusList" :value="item.value" :key="item.label">{{ item.label }}</Option>
          </Select>
        </Col>
        <Col span="8" :offset="8"><Select clearable v-model="filters.ShipmentsStatus">
          <Option v-for="(status, index) in statusList"
                  :key="index"
                  :value="status.value"
                  :label="status.label">
          </Option>
        </Select></Col>
     </Row>
    <br/>
    <Row>
      <linebox></linebox>
    </Row>
    <div id="showdiv" ><span id="showspan" >事件流</span></div>
  </div>
</template>

<script>
import  linebox from './linebox';
import  datapicker from './datapicker';
import select from './select'
export default {
  name: 'HelloWorld',
  data () {
    return {
      filters: {
        TID: '',
        ProductFilter: '',
        ShipmentsStatus: '',
        PayType: '',
        DateRange: '',
        filter: '',
      },
      statusList: [
        {
          label: '等待出货',
          value: '0',
        },
        {
          label: '出货成功',
          value: '1',
        },
        {
          label: '出货失败',
          value: '-1',
        },
      ],
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created() {
    console.log("RESPONSE_MSG", this.$t(`RESPONSE_MSG.DATA_NOT_EXIST`));
    document.getElementById("showdiv").addEventListener("click",function(){console.log("div")},false);
    document.getElementById("showspan").addEventListener("click",function(){console.log("span")},false);
  },
  methods: {
    // showdiv(){
    //   console.log("div")
    // },
    // showspan() {
    //   console.log("span")
    // }
  },
  components: {
    datapicker,select,linebox
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  
  
}
a {
  color: #42b983;
}
.ivu-select-item-selected, .ivu-select-item-selected:hover {
    color: #fff;
    background: rgba(45,140,240,.9);
}
.filter-item {
  margin-bottom: 15px;
  label {
    margin-bottom: 5px;
  }
}
</style>
