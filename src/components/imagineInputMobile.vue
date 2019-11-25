<template>
  <div class="" v-transfer-dom>
    <Popup v-model="showPop" @on-hide="onHide">
      <div style="width: 100vw; height: 400px;">
        <search ref="search" :placeholder="placeholder" @on-change="onChange" :auto-fixed="false"></search>
          <Scroller lock-x scrollbar-y :height="scrollerHeight" ref="scroller">
            <div>
              <div v-if="filteredSelectList.length > 0" :style="{color: item.disabled ? '#cfcfcf' : ''}" class="select-row" @click="handleSelect(item)" v-for="(item, index) in filteredSelectList">{{item.name}}</div>
              <div v-if="filteredSelectList.length === 0" class="empty">暂无数据,请在上方搜索</div>
              <div v-if="selectList.length === 0" class="empty">{{totalEmptyTip}}</div>
            </div>
          </Scroller>
      </div>
    </Popup>
  </div>
</template>

<script>
import { Popup, Search, Scroller } from 'vux';

export default {
  name: '',
  data() {
    return {
      selectItem: {},
      show: true,
      filteredSelectList: [],
    };
  },
  watch: {
    selectList() {
      this.$nextTick(() => {
        this.$refs.scroller.reset({ });
      });
      this.filteredSelectList = this.selectList;
    },
  },
  computed: {
    scrollerHeight() {
      return `${400 - 44}px`;
    },
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    totalEmptyTip: {
      type: String,
    },
    showPop: {
      type: Boolean,
      default: false,
    },
    selectList: {
      type: Array,
      default: () => [],
    },
    placeholder: {
      type: String,
      default: '请输入搜索',
    },
  },
  components: {
    Popup,
    Search,
    Scroller,
  },
  methods: {
    onChange(name) {
      this.filteredSelectList = this.selectList.filter(filteritem => filteritem.name.toLowerCase().indexOf(name.toLowerCase()) > -1);
      setTimeout(() => {
        this.$refs.scroller.reset({ });
      }, 200);
    },
    onHide() {
      this.handleSelect(this.selectItem);
    },
    handleSelect(item) {
      if (item.disabled) {
        return;
      }
      this.selectItem = item;
      this.name = item.name;
      this.$emit('input', item.value);
      this.$emit('on-confirm', item);
      this.showPop = false;
    },
  },
};
</script>
<style lang="stylus" scoped>
.select-row
  padding 8px 0
  font-size .85rem
  margin-bottom 1px
  background #fff
.empty
  font-size .85rem
  color #848484
  padding 35px 0
</style>

