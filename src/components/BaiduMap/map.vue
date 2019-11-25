<template>
  <div style="background: #fff;">
    <div class="input-wrapper">
      <input
        type="text"
        id="suggestId"
        placeholder="请输入地址"
        v-model="addressDetail"
        :style="inputStyleObj"
        :focus="focus=true"
        class="search-input">
      <x-button type="primary" mini @click.native="searchMap" style="vertical-align: top;">搜索</x-button>
      <icon type="clear" v-show="showClearIcon" class="icon-clear" @click.native="clearInput"></icon>
    </div>
    <div id="map" :style="{height: computedHeight,width: '100%'}"></div>
    <ul class="surrounding-wrapper">
      <!-- item.address一定是空字符串，百度的坑 -->
      <li
        class="surrounding-item"
        v-for="(item, index) in surrounding"
        :key="index"
        :data-value="item.address === ' ' ? item.title : item.address"
        @click="selectItem">
        <span><span v-if="index===0" style="color: #999;">[当前位置]</span>{{item.title}}</span>
        <span style="font-size: .6rem;color: #999;">{{item.address}}</span>
      </li>
    </ul>
    <x-button type="primary" @click.native="confirm">确定</x-button>
  </div>
</template>
<script>
import BaiduMap from './map';
import {mapActions} from 'vuex';
import { Icon, XButton } from 'vux';

export default {
  name: 'baidu-map',
  components: {
    Icon,
    XButton,
  },
  props: {
    customWidth: {
      type: Number,
      default: 0,
    },
  },
  watch: {
    point: {
      handler(v) {
        this.bMap.setPoint(v);
      },
      // immediate: true,
      deep: true,
    }
  },
  created() {
    this.getCurrentPoint();
  },
  data() {
    return {
      point: {},
      addressDetail: '', // 详细地址
      userLocation: { lng: '', lat: '' },
      focus: false,
      bMap: null,
      outerText: '',
      surrounding: null,
      addressObj: null,
    };
  },
  computed: {
    computedHeight() {
      return `${document.body.clientHeight - 92 - 260 - this.customWidth}px`;
    },
    inputStyleObj() {
      if (this.focus && this.showClearIcon) {
        return {
          paddingRight: '30px',
        };
      }
      return {};
    },
    showClearIcon() {
      return this.addressDetail !== '';
    },
  },
  mounted() {
    this.bMap = new BaiduMap('map', 'suggestId', this);
    this.$nextTick(() => {
      setTimeout(() => {
        if (this.$store.state.map.curretPoint.x) {
          this.point = this.$store.state.map.curretPoint;
        }
      }, 1000);
    })
    this.$on('address-change', (e) => {
      this.addressDetail = e;
    });
    this.$on('surrounding-change', (e) => {
      this.addressObj = e;
      this.surrounding = e.surroundingPois.slice(0, 5);
    });
  },
  methods: {
    ...mapActions([
      'webBMapConvertor',
      'getCurrentGeoLocation',
      'setCurrentPoint',
      ]),
    getCurrentPoint() {
      console.log('mapgetCurrentPoint', );
      // const res = { latitude:'22.5338' , longitude:'113.949' };
      this.getCurrentGeoLocation().then((res = { latitude:'22.5338' , longitude:'113.949' }) => {
        console.log('res======>', res);
        this.webBMapConvertor({
          pos: res,
          from: 1,
          to: 5,
        }).then((data) => {
          this.point = data;
          this.setCurrentPoint(data);
          console.log('webBMapConvertorData', data);
        })
      });
    },
    searchMap() {
      if(!this.addressDetail) {
        return;
      }
      this.bMap.setPlace(this.addressDetail);
    },
    clearInput() {
      this.addressDetail = '';
    },
    confirm() {
      const { province, city, district } = this.addressObj.addressComponents;
      const emitAddress = {
        province,
        city,
        district,
        address: this.addressDetail,
        point: this.addressObj.point,
        outerText: this.outerText,
      };
      this.$emit('on-ready', emitAddress);
    },
    selectItem(e) {
      this.addressDetail = e.currentTarget.dataset.value;
      this.outerText = e.srcElement.outerText.replace('[当前位置]', '');
      console.log('this.addressObj.point', this.addressObj.point);
      this.searchMap();
    },
  },
};
</script>

<style lang="stylus" scoped>
.no-wrap
  overflow: hidden
  text-overflow: ellipsis
  white-space: nowrap

.input-wrapper
  display: flex
  position: relative
  padding: 10px
  height: 30px
  .search-input
    flex: auto
    margin-right 10px
    height: 30px
    padding: 3px 7px
    border: 1px solid #d9d9d9
    border-radius: 4px
    box-sizing: border-box
    &:focus
      border-color: #f5bc34
    &::placeholder
      color: #999
  .weui-btn
    flex: 0 0 70px
    width: 70px
  .icon-clear
    position: absolute
    right: 95px
    bottom: 18px

.surrounding-wrapper
  padding: 10px
  height: 240px
  font-size: .8rem
  text-align: left
  .surrounding-item
    display: flex
    flex-direction: column
    padding: 5px
    border-bottom: 1px solid #ddd
    span
      @extend .no-wrap
</style>
