<template>
  <div class="pop-checklist">
    <cell @click.native="showSelectPop = true" :title="title" :value="currentLabel">
      <span slot="title"><span style="color:red;">*</span><span>{{title}}</span></span>
    </cell>
    <div >
        <popup  v-model="showSelectPop" :name="id">
          <div class="popup-header">
            <p class="btn-popup-cancel" @click="selectCancel">取消</p>
            <p class="btn-popup-ok" @click="selectOk">确定</p>
          </div>
          <checklist label-position="left"
                      required 
                      :max="max"
                      class="checklist"
                      ref="checklist"
                      :options="selectList" 
                      v-model="currentValue"
                      @on-change="onChange"
                      >
          </checklist>
        </popup>
      </div>
  </div>
</template>

<script>
import {
  Cell,
  Popup,
  TransferDom,
  Checklist,
} from 'vux';

export default {
  name: 'PopupCheckList',
  data() {
    return {
      // id: ,
      showSelectPop: false,
      currentValue: [],
      currentLabel: '请选择',
    };
  },
  components: {
    Cell,
    Popup,
    TransferDom,
    Checklist,
  },
  props: {
    max: {
      type: Number,
    },
    // 有一定的格式要求，因为外部要用的时候的key值不是这样的，数据不一样，所以感觉可以优化
    // 数据就变成  外面的 =》 里面的  =》 外面的
    // 外面再传两个key值进来，代表需要用到的键值key和value
    // this.getsaleTypesList().then((data) => {
    //     data.forEach((item) => {
    //       const newItem = {
    //         key: item.id,
    //         value: item.text,
    //       };
    //       this.saleTypesList.push(newItem);
    //     });
    //   });
    selectList: {
      type: Array,
    },
    placeholder: { // 右侧的默认字段
      type: String,
      default: '请选择',
    },
    title: {
      type: String,
      required: true,
    },
  },
  methods: {
    selectCancel() {
      this.showSelectPop = false;
    },
    selectOk() {
      this.showSelectPop = false;
    },
    onChange() {
      this.$emit('input', this.currentValue);
    },
    getCurrentLabel() {
      const currentLabelArray = this.currentValue.map((item) => {
        // 处理的不够优雅，可以优化的写法
        let LabelArrayItem = '';
        this.selectList.forEach((listItem) => {
          if (item === listItem.key) {
            LabelArrayItem = listItem.value;
          }
        });
        return LabelArrayItem;
      });
      // 当选项为空时提示选择
      if (currentLabelArray.length === 0) {
        this.currentLabel = this.placeholder;
      } else {
        this.currentLabel = currentLabelArray.join('、');
      }
    },
  },
  watch: {
    currentValue: {
      handler() {
        this.getCurrentLabel();
      },
    },
  },
};
</script>
<style lang="stylus" scoped>
.popup-header
  display flex
  background #fff
  border-bottom 1px solid #D7D6DC
  justify-content space-between
  padding 5px 25px 
  font-size .9rem
  line-height 32px
  .btn-popup-cancel
    color #D7D6DC
  .btn-popup-ok
    color #f5bc34
// .pop-checklist   >>> .weui-cells
//   font-size .8rem
</style>
<style lang="stylus">
.pop-checklist  
  .weui-cells
    font-size .8rem !important
  .weui-cell
    text-overflow ellipsis 
    white-space nowrap 
    .weui-cell__ft
      margin-left 10px
      overflow hidden
      text-overflow ellipsis 
      white-space nowrap 
</style>


