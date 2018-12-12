<template>
  <div class="yp-table">
    <div class="tp-table-header">
        <div>
          <slot name="header-left" ></slot>
        </div>
        <div v-if="showSearch" class="header-right">
          <template v-if="showInput">
            <Input class="search-box" @keyup.enter.native="$emit('on-enter')" @on-change="changeSearch" v-model="value" :placeholder="searchPlaceholder"></Input>
            <Button @click="searchClick" >搜索</Button>
          </template>
          <slot name="header-right"></slot>
        </div>
      </Row>
    </div>
    <Table ref="table" highlight-row v-on="$listeners" v-bind="$attrs" :columns="localColumns2" :border="border" ></Table>
    <div class="yp-table-bottom">
      <div class="bottom-left">
        <slot name="bottom-left"></slot>
      </div>
      <Page class="yp-page-table-page-class" :page-size-opts="[10, 25, 50, 100]" v-on="$listeners" v-bind="$attrs" placement="top"></Page>
    </div>
  </div>
</template>

<script>
export default {
  name: 'YpTable',
  data() {
    return {
      value: '',
      localColumns: [],
      localColumns2: [],
      form: {
        page: 1,
        per_page: 10,
        total: 1,
        filter: '',
      },
    };
  },
  inheritAttrs: false,
  props: {
    columns: {
      type: Array,
      default: function defaultColumn() {
        return [];
      },
    },
    url: {
      type: String,
      default: '',
    },
    auto: {
      type: Boolean,
      default: false,
    },
    'show-search': {
      type: Boolean,
      default: true,
    },
    'show-input': {
      type: Boolean,
      default: true,
    },
    searchPlaceholder: {
      type: String,
      default: '请输入搜索条件',
    },
    border: {
      type: Boolean,
      default: true,
    },
  },
  mounted() {
    this.setLocalColumns(this.columns);
  },
  watch: {
    columns(columns) {
      this.setLocalColumns(columns);
    },
  },
  methods: {
    setLocalColumns(columns) {
      const list = columns.map((obj) => {
        const newObj = this.$lodash.cloneDeep(obj);
        if (newObj.checkbox === undefined) {
          newObj.checkbox = true;
        }
        return newObj;
      });
      this.localColumns = list;
      this.localColumns2 = list;
    },
    changeSearch() {
      this.$emit('change-search', this.value);
    },
    getData() {
      if (!this.auto || this.url !== '') {
        return;
      }
      const params = {
        ...this.form,
      };
      this.$http.get(this.url, { params })
        .then((res) => {
          this.total = res.data.total;
          this.$emit('get-data', res);
        });
    },
    searchClick() {
      this.$emit('search-click', this.value);
    },
    clearSearch() {
      this.value = '';
    },
    changeCheck() {
      const list = this.localColumns.filter(obj => obj.checkbox);
      this.localColumns2 = list;
    },
  },
};
</script>
<style lang="less">
// 修正ivew组件page显示BUG
.yp-page-table-page-class {
  .ivu-select-dropdown {
    top: 189px;
  }
}
</style>

<style lang='less' scoped >
  .yp-table{
    position: relative;
    .tp-table-header{
      justify-content: flex-start;
      >div{
        flex: 1;
      }
    }
    .tp-table-header {
      position: relative;
      margin: 10px 0;
      display: flex;
      justify-content: flex-end;
      .search-box{
        width: 240px;
        margin-right: 5px;
      }
      .header-right{
        display: flex;
        justify-content: flex-end;
      }
    }
    .yp-table-bottom {
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-between;
      margin: 10px 0 0 0;
    }
  }
</style>