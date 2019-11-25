<template>
  <div class="UploadImage">
    <div class="images">
      <div class="image-item image-preview" v-for="(item, index) in images" :key="index">
        <img :src="item.url" alt="">
        <i v-if="item.progress == 100||item.progress < 0" class="iconfont icon-cross btn-remove"
           @click="remove(index)"></i>
        <div class="image-progress" v-if="item.progress < 100">
          <div class="image-progress-indicater"
               :class="{
              error: item.progress < 0
            }">
            <div class="progress-indicater-inner"
                 :style="{
                width: `${item.progress}%`
              }"></div>
            <div class="progress-error-tips">{{item.progress | progressErrorTips}}</div>
          </div>
        </div>
      </div>
      <div class="image-item image-add" v-if="size>images.length">
        <i class="iconfont icon-plus"></i>
        <input v-if="!isCamera" type="file" accept="image/*" name="upload" @change="onFileChange($event)">
        <input v-else type="file" accept="image/*" capture="camera" name="upload" @change="onFileChange($event)">
      </div>
    </div>
  </div>
</template>

<script>
export default {

  name: 'UploadImage',

  props: {
    maxSize: {
      type: Number,
      default: 1024 * 1024 * 2,
    },
    isCamera: {
      type: Boolean,
      default: false,
    },
    quality: {
      type: Number,
      default: .7,
    },

    size: {
      type: Number,
      default: 1,
    },

    resizeWidth: {
      type: Number,
      default: 1080,
    },

    onChange: {
      type: Function,
      default: () => { 
      },
    },
    onFailed: {
      type: Function,
      default: () => {
      },
    },
    onStart: {
      type: Function,
      default: () => {
      },
    },

    onCompleted: {
      type: Function,
      default: () => {
      },
    },
  },

  data() {
    return {
      /**
       * [images 上传图片数组]
       * @type {Array}
       */
      images: [],
    };
  },

  filters: {
    progressErrorTips(value) {
      switch (value) {
        case -99:
          return '上传失败';
        case -98:
          return '文件太大';
      }
    },
  },

  methods: {
    remove(index) {
      this.images.splice(index, 1);
      this.$emit('on-remove', index);
    },

    onFileChange(e) {
      if (e) {
        this.onStart();
        this.previewFile(e.target.files[0]);
      }
    },

    previewFile(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.images.push({
          url: e.target.result,
          progress: 1,
          type: file.type,
        });
        let tmpFile = this.images[this.images.length - 1];
        if (this.quality == 1) {
          tmpFile.nFile = file;
          this.uploadFile(tmpFile);
        } else {
          this.resizeImage(tmpFile);
        }
      };
      reader.onerror = (e) => {
      };
      reader.readAsDataURL(file);
    },

    async resizeImage(fileObject) {
      const loader = () => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => {
            resolve(img);
          };
          img.src = fileObject.url;
        });
      };
      const image = await loader();
      let tmpW, tmpH;
      let ratio = image.width / image.height;
      if (image.width > this.resizeWidth) {
        tmpW = this.resizeWidth;
        tmpH = tmpW / ratio;
      } else {
        tmpW = image.width;
        tmpH = image.height;
      }

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = tmpW;
      canvas.height = tmpH;
      ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, tmpW, tmpH);
      const dataURL = canvas.toDataURL(fileObject.type, this.quality);
      const nFile = this.convertToBlob(dataURL);
      fileObject.nFile = nFile;
      this.uploadFile(fileObject);
    },
    uploadFile(file) {
      // 文件尺寸判断
      if (file.nFile.size > this.maxSize) {
        file.progress = -98;
        return;
      }
      this.$yphttp.upload({
        method: 'operators.resource.upload.supplement',
        UploadFile: [file.nFile, file.type.replace('/', '.')],
      }, {
        type: 'form-data',
        options: {
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            // 预留10%的进度作为服务器响应时间
            file.progress = Math.ceil(loaded / total * 100 - 10);

          },
        },
      }).then((resp) => {
        const { error_code, error_msg, data } = resp.data;
        if (error_code == 0) {
          file.progress = 100;
          file.remoteURL = data;
          let tmp = [];
          this.images.map(el => {
            tmp.push(el.remoteURL);
          });
          this.onCompleted(tmp);
        } else {
          file.progress = -99;
          this.onFailed();
        }
      }).catch(err => {
        file.progress = -99;
      });

    },
    convertToBlob(data) {
      let tmp = data.split(';base64,');
      let tmpBlob = atob(tmp[1]);

      const buffer = new ArrayBuffer(tmpBlob.length);
      const unit8Arr = new Uint8ClampedArray(buffer);

      Array.from(tmpBlob).forEach((str, idx) => unit8Arr[idx] = str.codePointAt(0));

      const blob = new Blob([unit8Arr], { type: tmp[0].split(':')[1] });
      return blob;
    },
  },
};
</script>

<style lang="stylus" scoped>
.images
  &:before, &:after
    content ''
    display block
    clear both

.image-item
  width 22%
  height auto
  display inline-block
  float left
  margin 0 1.5%
  // border-radius 6px
  position relative
  box-sizing border-box
  &:before
    content ''
    display block
    padding-top 100%

.image-preview
  border 1px solid #e2e2e2
  background-color #f3f3f4
  img
    position absolute
    width 100%
    height 100%
    left 0
    top 0
    object-fit contain
    object-position center
    background-color #f1f1f1
  .btn-remove
    width 20px
    height 20px
    line-height 20px
    text-align center
    color #fff
    font-size 12px
    background-color rgba(0, 0, 0, .35)
    position absolute
    right 0px
    top 0px
    border-bottom-left-radius 2px
    z-index 100

// border-radius 100%
.image-add
  border 1px dashed #e2e2e2
  position relative
  i
    position absolute
    font-size 40px
    color #929292
    position absolute
    top 50%
    left 50%
    transform translate3d(-50%, -50%, 0)
    &:before
      position relative
      top -2px
  input
    -webkit-appearence none
    position absolute
    width 100%
    height 100%
    top 0
    left 0
    opacity 0

.image-progress
  position absolute
  width 100%
  height 100%
  top 0
  left 0
  background-color rgba(0, 0, 0, .5)
  .image-progress-indicater
    position absolute
    width 50%
    height 4px
    border 2px solid rgba(256, 256, 256, .8)
    border-radius 10px
    left 50%
    top 50%
    transform translate3d(-50%, -50%, 0)
    .progress-indicater-inner
      width 0
      height 100%
      background-color rgba(256, 256, 256, .8)
    &.error
      border-color rgba(255, 41, 41, 0.8)
      .progress-indicater-inner
        background-color rgba(255, 41, 41, 0.8)
        width 29% !important
      .progress-error-tips
        font-size 12px
        color #fff
        white-space nowrap
        position absolute
        left 50%
        top 5px
        transform translate3d(-50%, 0, 0) scale(.8)
</style>
