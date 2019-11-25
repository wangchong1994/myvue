<template>
  <div class="image-add">
    <i class="iconfont icon-fujian"></i>
    <input type="file" name="upload" @change="onFileChange($event)">
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      image: null,
    };
  },
  props: {
    resizeWidth: {
      type: Number,
      default: 1080,
    },
    quality: {
      type: Number,
      default: .7,
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
  components: {

  },
  methods: {
    onFileChange(e) {
      if (e) {
        const fileType = (type) => {
          const imgreg = /image/;
          const videoreg = /video/;
          if (imgreg.test(type)) {
            this.onStart();
            this.previewFile(e.target.files[0]);
            return;
          }
          if (videoreg.test(type)) {
            this.uploadVideo(e.target.files[0]);
            return;
          }
          this.uploadfile(e.target.files[0]);
        };
        fileType(e.target.files[0] && e.target.files[0].type);
      }
    },
    previewFile(file) {
      // 用 FileReader 读取input内容
      const reader = new FileReader();
      reader.onload = (e) => {
        this.image = {
          url: e.target.result,
          progress: 1,
          type: file.type,
        };
        let tmpFile = this.image;
        if (this.quality == 1) {
          tmpFile.nFile = file;
          this.uploadImage(tmpFile);
        } else {
          this.resizeImage(tmpFile);
        }
      };
      reader.onerror = (e) => {
        console.log('e', e);
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
      this.uploadImage(fileObject);
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
    uploadImage(file) {
      // 文件尺寸判断
      if (file.nFile.size > this.maxSize) {
        file.progress = -98;
        return;
      }
      this.$yphttp.upload({
        method: 'wiki.resource.upload.image',
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
          this.onCompleted(file.remoteURL, 'IMAGE');
        } else {
          file.progress = -99;
          this.onFailed();
        }
      }).catch(err => {
        file.progress = -99;
      });
    },
    uploadVideo(file) {
      this.$yphttp.upload({
        method: 'wiki.resource.upload.video',
        UploadFile: [file, file.type.replace('/', '.')],
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
          this.onCompleted(file.remoteURL, 'VIDEO');
        } else {
          file.progress = -99;
          this.onFailed();
        }
      }).catch(err => {
        file.progress = -99;
      });
    },
    uploadfile(file) {
      if (!file) {
        return;
      }
      this.onStart(file);
      this.$yphttp.upload({
        method: 'wiki.resource.upload.pdf',
        UploadFile: [file, file.type.replace('/', '.')],
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
          this.$set(file, 'remoteURL', data)
          // file.remoteURL = data;
          this.onCompleted(file);
        } else {
          file.progress = -99;
          this.onFailed();
        }
      }).catch(err => {
        file.progress = -99;
      });
    },
  },
};
</script>
<style lang="stylus" scoped>
.image-add
  width 20px
  height 20px
  position relative
  font-size .8rem
  i
  margin 0 10px
  input
    -webkit-appearence none
    position absolute
    width 100%
    height 100%
    top 0
    left 0
    opacity 0

</style>
