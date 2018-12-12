<!-- <yp-img-uploader :limit="1" :list.sync="icon"></yp-img-uploader> -->
<template>
  <div class="uploader-root-class">
    <div class="selected-imgs" style="display: inline-block;">
      <div class="selected-imgs-item" v-for="(item, index) in getList" :key="index">
        <img :src="getImgItem(item)">
        <div class="handle-mask">
          <Icon type="ios-eye" v-fancybox="getImgItem(item)"></Icon>
          <Icon type="trash-b" v-show="editable" @click.native="handleRemove(getImgItem(item), true)"></Icon>
        </div>
      </div>
    </div>
    <div class="upload-btn" @click="showImgDialog = true" v-show="editable && !hideBtn">
      <Icon type="plus" size="20"></Icon>
    </div>
    <Modal class="yp-img-uploader-control-class" v-model="showImgDialog" title="图片选择" @on-ok="handleConfirm">
      <Tabs :animated="false" @on-click="handleTabsClick">
        <TabPane label="上传" icon="upload">
          <Upload ref="uploader"
                  multiple
                  type="drag"
                  name="UploadFile"
                  :show-upload-list="false"
                  :on-success="handleUploadSuccess"
                  :on-exceeded-size="handleImgSizeError"
                  :max-size="maxSize"
                  :format="format"
                  :on-format-error="handleFormatError"
                  v-bind="$attrs"
                  v-on="$listeners"
                  :action="uploadUrl"
                  :headers="headers"
                  class="uploader-component-class">
              <div style="padding: 20px 0">
                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                <p style="color: #ccc;">点击或拖放图片文件到这里</p>
              </div>
          </Upload>
        </TabPane>
        <TabPane label="历史上传" icon="ios-clock">
          <div class="history-uploads">
            <div class="history-imgs" v-if="historyImgs.length">
              <div class="history-imgs-item"
                  v-for="(item, index) in historyImgs"
                  :key="index"
                  :class="{ 'selected-history-img': selectedList.indexOf(item.Url) > -1 }">
                <img :src="item.Url">
                <div class="img-size-mask">{{ item.width && item.height ? `${item.width}x${item.height}` : '加载中...' }}</div>
                <div class="handle-mask" @click="handleSelect(item.Url)" style="cursor: pointer;">
                  <Icon type="checkmark-round"></Icon>
                </div>
              </div>
            </div>
            <p v-else style="margin: 40px 0;color: #999;">暂无图片</p>
            <Page :current="current" :total="total" simple @on-change="handlePageChange"></Page>
          </div>
        </TabPane>
        <TabPane label="远程图片" icon="network">
          <div style="text-align: center; padding: 5px 20px;">
            <Input type="text" v-model="webImgUrl" placeholder="请输入图片地址" @keyup.enter.native="handleInputEnter">
              <Button slot="append" icon="arrow-down-c" @click="handleInputEnter">获取</Button>
            </Input>
          </div>
        </TabPane>
      </Tabs>
      <Alert type="error" v-show="showError" style="margin: 5px 0;">{{ `最多只能选择${this.limit}张图片。` }}</Alert>
      <div class="selected-imgs">
        <p>已选图片</p>
        <p v-if="selectedList.length === 0" style="text-align: center;color: #999;">未选择图片</p>
        <div class="selected-imgs-item" v-for="(url, index) in selectedList" :key="index">
          <img :src="url">
          <div class="handle-mask">
            <Icon type="ios-eye" v-fancybox="url"></Icon>
            <Icon type="trash-b" @click.native="handleRemove(url)"></Icon>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  name: 'ypImgUploader',
  props: {
    limit: {
      type: Number,
      default: 5,
    },
    list: {
      type: [Array, String],
    },
    uploadUrl: {
      type: String,
      default: '/operators/resource/upload_product',
    },
    historyUrl: {
      type: String,
      default: '/operators/resource/list',
    },
    refreshHisotryWhenOpen: {
      type: Boolean,
      default: true,
    },
    editable: {
      type: Boolean,
      default: true,
    },
    // 上传了限制数量张图片后隐藏上传按钮
    hideOnSelected: {
      type: Boolean,
      default: true,
    },
    // 默认最大1G
    maxSize: {
      type: Number,
      default: 1024 * 1024,
    },
    format: {
      type: Array,
      default: () => ([
        'png',
        'jpg',
        'jpeg',
        'gif',
        'bmp',
      ]),
    },
    formatter: {
      type: Function,
    },
    prop: {
      type: [Function, String],
    },
  },
  watch: {
    list() {
      this.assignTo();
    },
    showImgDialog(show) {
      if (show) {
        this.assignTo();
      }
    },
  },
  computed: {
    hideBtn() {
      // if (this.list && this.getList.length < this.limit) {
      //   return false;
      // }
      if (this.getList.length < this.limit) {
        return false;
      }
      return this.selectedList.length === this.limit && this.hideOnSelected;
    },
    getList() {
      if (Array.isArray(this.list)) {
        return this.list;
      }
      if (typeof this.list === 'string') {
        const url = this.list.trim();
        if (url) {
          return [this.list];
        }
      }
      return [];
    },
  },
  data() {
    return {
      showImgDialog: false,
      selectedList: [],
      showError: false,
      webImgUrl: '',
      // 历史图片
      historyImgs: [],
      current: 1,
      total: 0,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    };
  },
  methods: {
    handleTabsClick(v) {
      if (v === 1 && !this.historyImgs.length) {
        this.getHistoryImgs();
      }
    },
    getImgItem(item) {
      if (this.prop) {
        if (typeof this.prop === 'function') {
          return this.prop(item);
        }
        return item[this.prop];
      }
      return item;
    },
    assignTo() {
      this.selectedList = this.getList.map(e => this.getImgItem(e));
    },
    formatOutput() {
      const update = this.formatter ? this.formatter(this.selectedList) : this.selectedList;
      this.$emit('update:list', update);
    },
    handleImgSizeError() {
      let size = this.maxSize / 1024;
      size = Number.isInteger(size) ? size : size.toFixed(2);
      this.$Message.error({
        content: `图片大小限制为${size}MB（${this.maxSize}KB）`,
      });
    },
    handleFormatError() {
      this.$Message.error({
        content: `图片格式限制为${this.format.join('、')}`,
      });
    },
    handleConfirm() {
      this.formatOutput();
      this.$emit('on-confirm', this.selectedList);
    },
    addToSeletedImgs(item) {
      if (this.selectedList.length < this.limit) {
        this.selectedList.push(item);
      } else if (this.limit === 1) {
        this.$set(this.selectedList, 0, item);
      } else {
        this.showError = true;
      }
    },
    handleInputEnter() {
      if (this.webImgUrl) {
        this.addToSeletedImgs(this.webImgUrl);
      }
    },
    handleRemove(url, fromList) {
      const index = this.selectedList.indexOf(url);
      if (index > -1) {
        this.selectedList.splice(index, 1);
        if (fromList) {
          this.formatOutput();
          this.$emit('on-remove', url);
        }
      }
    },
    handleUploadSuccess(res) {
      this.addToSeletedImgs(res.data);
    },
    // 历史图片
    getHistoryImgs() {
      const params = {
        per_page: 10,
        page: this.current,
      };
      this.$http.get(this.historyUrl, { params })
        .then((response) => {
          const { data } = response;
          this.historyImgs = data.data.map((item) => {
            const img = new Image();
            img.src = item.Url;
            img.onload = () => {
              this.$set(item, 'width', img.width);
              this.$set(item, 'height', img.height);
            };
            return item;
          });
          this.total = data.total;
        });
    },
    handleSelect(item) {
      this.addToSeletedImgs(item);
    },
    handlePageChange(page) {
      this.current = page;
      this.getHistoryImgs();
    },
    // 网络图片
  },
  created() {
    if (this.list && this.list.length) {
      // this.selectedList = this.$lodash.cloneDeep(this.list);
      this.assignTo();
    }
    // this.getHistoryImgs();
  },
};
</script>
<style lang="less" scoped>
.basic-img-item {
  position: relative;
  width: 60px;
  height: 60px;
  line-height: 60px;
  display: inline-block;
  text-align: center;
  border-radius: 4px;
  box-sizing: border-box;
  overflow: hidden;
  margin: 3px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &:hover {
    .handle-mask {
      background: rgba(0, 0, 0, .6);
    }
    i {
      display: inline;
    }
  }
}

.handle-mask {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0);
  transition: all .5s;
  i {
    cursor: pointer;
    color: #fff;
    font-size: 1.6em;
    margin: 2px;
    display: none;
    transition: all .5s;
  }
}

.upload-btn {
  .basic-img-item;
  border: 2px dashed #eee;
  transition: all .3s;
  cursor: pointer;
  i {
    color: #eee;
    transition: all .3s;
  }
  &:hover {
    border-color: #79c4f7;
    i {
      color: #79c4f7;
    }
  }
}

.selected-imgs {
  >p:first-child {
    font-size: 14px;
    border-left: 4px solid #c0e2f9;
    margin: 10px 0;
    padding: 6px 0 6px 10px;
    background: #eff5f9;
  }
  .selected-imgs-item {
    .basic-img-item;
    img {
      display: block;
    }
    border: 1px solid #eee;
  }
}

.history-uploads {
  text-align: center;
  .history-imgs {
    width: 100%;
    text-align: left;
    .history-imgs-item {
      .basic-img-item;
      width: 85px;
      height: 85px;
      line-height: 85px;
      margin: 3px 6px;
      .img-size-mask {
        position: absolute;
        height: 20px;
        line-height: 20px;
        width: 100%;
        bottom: 0;
        left: 0;
        background: rgba(0, 0, 0, .5);
        transition: all .3s;
        color: #fff;
      }
      &:hover .img-size-mask {
        bottom: -20px;
      }
    }
    .selected-history-img {
      border: 2px solid #ed5a5a;
      &:hover {
         .handle-mask {
           background: rgba(0, 0, 0, 0);
         }
         i {
           display: none;
         }
      }
    }
  }
}
</style>
<style lang="less">
.yp-img-uploader-control-class {
  .ivu-modal-mask, .ivu-modal-wrap {
    z-index: 1001;
  }
  &:last-child {
    .ivu-modal-mask, .ivu-modal-wrap {
      z-index: 1002;
    }
  }
}
</style>
