<template>
  <Select :value="value" ref="select" v-on="$listeners" v-bind="$attrs" >
      <slot name="before"></slot>
      <Option  v-for="(item, index) in optList" :value="item.value" :key="index" >{{ item.label }}</Option>
      <slot name="after"></slot>
      <div>测试gitadd</div>
  </Select>
</template>

<script>

export default {
  data() {
    return {
      optList: [],
      nowData: '',
      allList: [],
    };
  },
  inheritAttrs: false,
  props: {
    // 因后台api换版本，之前的$http方式不能用于新api
    ver: {
      type: Number,
      default: 1,
    },
    url: {
      type: String,
    },
    value: {
      type: [String, Number, Array],
    },
    params: {
      type: Object,
      default: function defaults() {
        return {};
      },
    },
    'created-run': {
      type: Boolean,
      default: true,
    },
    ajaxType: {
      type: String,
      default: 'get',
    },
    prop: {
      type: Object,
      default: () => ({
        label: 'text',
        value: 'id',
      }),
    },
    // 过滤数据
    filter: {
      type: Function,
    },
  },
  created() {
    if (this.createdRun) {
      this.getData();
    }
  },
  methods: {
    clearSingleSelect() {
      this.$refs.select.clearSingleSelect();
    },
    getData() {
      const { url, params, ajaxType } = this;
      if (this.ver === 1) {
        const newParams = this.parseParams(params, ajaxType);
        this.$http[ajaxType](url, newParams)
          .then(({ data: { data } }) => {
            this.afterRequest(data);
          });
      } else {
        this.$request({
          method: url,
          params,
        }).then(({ data }) => {
          this.afterRequest(data);
        }).catch();
      }
    },
    afterRequest(data) {
      this.allList = data;
      this.reFilter();
      this.$emit('on-finished', data);
    },
    // axios post, get传参结构不一样，需要对情况进行结构转换
    parseParams(params, type) {
      let newParams = {};
      switch (type) {
        case 'get':
          newParams = { params };
          break;
        case 'post':
          newParams = params;
          break;
        default:
          break;
      }
      return newParams;
    },
    clearSelectList() {
      this.optList = [];
    },
    setOptList(data) {
      const { label, value, disabled } = this.prop;
      this.optList = data.map((obj) => {
        const newObj = {
          label: typeof label === 'function' ? label(obj) : obj[this.prop.label],
          value: typeof value === 'function' ? value(obj) : obj[this.prop.value],
          disabled: typeof disabled === 'function' ? disabled(obj) : obj[this.prop.disabled],
        };
        return newObj;
      });
    },
    reFilter() {
      let tmpData = this.allList;
      // 自定义过滤
      if (this.filter) {
        tmpData = this.filter(this.allList);
      }
      this.setOptList(tmpData);
    },
  },
};

</script>

<style  scoped >
  .filter-item {
  margin-bottom: 15px;
  label {
    margin-bottom: 5px;
  }
}
</style>
