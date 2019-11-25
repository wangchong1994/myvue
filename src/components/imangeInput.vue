<template>
  <div class="imagine-input">
     <input-normal
        @on-change="onChange"
        @on-focus="onFocus"
        @on-clear="onClear"
        @on-blur="onBlur"
        :disabled="disabled"
        :maxlength="maxlength"
        :textAlign="textAlign"
        :label="label"
        :labelWidth="labelWidth"
        :placeholder="placeholder"
        v-bind="$attrs"
        v-on="$listeners"
        :rules="rules"
        v-model="name" />
      <transition name="slide-fade">
        <div class="select-content" v-if="showSelect" :style="selectContentStyle">
          <Scroller lock-x scrollbar-y :height="scrollerHeight" ref="scroller">
            <div>
              <div v-if="filteredSelectList.length > 0" :style="{color: item.disabled ? '#cfcfcf' : ''}" class="select-row" @click="handleSelect(item)" v-for="(item, index) in filteredSelectList">{{item.name}}</div>
              <div v-if="filteredSelectList.length === 0" class="empty">暂无数据</div>
            </div>
          </Scroller>
        </div>
      </transition>
  </div>
</template>

<script>
import { InputNormal } from '@/app/common';
import { Scroller, Popup } from 'vux';

export default {
  name: 'imagineInput',
  data() {
    return {
      name: '',
      clearing: false,
      afterSelect: false,
      filteredSelectList: [],
      showSelect: false,
    };
  },
  props: {
    label: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    maxlength: {
      type: Number,
      default: 100,
    },
    textAlign: {
      type: String,
      default: 'right',
    },
    labelWidth: {
      type: Number,
      default: 75,
    },
    selectList: {
      type: Array,
      default: () => [],
    },
    rules: { // 暂时只支持一个校验规则
      type: Object,
      default() {
        return {
          RegExp: '', // 校验正则
          required: false,
          message: '',
        };
      },
    },
    placeholder: {
      type: String,
      default: '请输入',
    },
  },
  computed: {
    selectContentStyle() {
      return {
        width: this.label ? `calc(100% - ${Number(this.labelWidth) + 7}px)` : 'calc(100% - 7px)',
        marginLeft: this.label ? `${Number(this.labelWidth) + 5}px` : '5px',
      };
    },
    scrollerHeight() {
      return '150px';
    },
  },
  components: {
    InputNormal,
    Scroller,
    Popup,
  },
  watch: {
    selectList() {
      this.filteredSelectList = this.selectList;
    },
    name() {
      this.selectList.forEach((item) => {
        if (item.name === this.name) {
          this.$emit('input', item.value);
        } else if (this.name === '') {
          this.$emit('input', '');
        }
      });
      if (!this.afterSelect) {
        this.onChange();
      }
    },
    showSelect(n) {
      if (n) {
        this.$nextTick(() => {
          if (this.showSelect) {
            this.$refs.scroller.reset({ });
          }
        });
      }
    },
  },
  methods: {
    onClear() {
      this.clearing = true;
      this.name = '';
    },
    onBlur() {
      let match = false;
      this.selectList.forEach((item) => {
        if (item.name === this.name) {
          match = true;
        }
      });
      if (!match) {
        this.name = '';
      }
      setTimeout(() => {
        this.showSelect = false;
      }, 100);
      this.$emit('on-blur');
    },
    onChange() {
      this.filteredSelectList = this.selectList.filter(filteritem => filteritem.name.toLowerCase().indexOf(this.name.toLowerCase()) > -1);
      setTimeout(() => {
        if (this.showSelect) {
          this.$refs.scroller.reset({ });
        }
      }, 500);
      if (!this.clearing) {
        this.showSelect = true;
      }
    },
    onFocus() {
      setTimeout(() => {
        if (!this.clearing) {
          this.showSelect = true;
        }
        this.clearing = false;
      }, 1);
    },
    handleSelect(item) {
      if (item.disabled) {
        return;
      }
      this.afterSelect = true;
      setTimeout(() => {
        this.afterSelect = false;
      }, 1);
      this.name = item.name;
      this.$emit('input', item.value);
      this.$emit('on-change', item);
      this.showSelect = false;
    },
  },
};
</script>
<style lang="stylus" scoped>
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
{
  transform: translateY(10px);
  opacity: 0;
}
.imagine-input
  position relative
  width 100%
  .select-content
    top 32px
    margin-left 5px
    background #fbfbfb
    border 1px solid #e3e3e3
    border-radius 4px
    width calc(100% - 97px)
    height 150px
    z-index 20
    position absolute
    .select-row
      text-align left
      font-size .85rem
      padding 12px 6px
    .empty
      font-size .85rem
      color #848484
      padding 35px 0
</style>

