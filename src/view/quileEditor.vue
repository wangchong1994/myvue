<template>
  <div class="">
    创建工单，富文本
    <div style="width: 100vw;font-size: 26px">
      <quill-editor ref="myTextEditor"
                v-model="content"
                :options="editorOption"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @ready="onEditorReady($event)"
                @change="onEditorChange($event)">
      </quill-editor>
    </div>
  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
export default {
  name: '',
  data() {
    return {
      content: '',
      editorOption: {
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              [{ 'header': 1 }, { 'header': 2 }],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              [{ 'script': 'sub' }, { 'script': 'super' }],
              [{ 'indent': '-1' }, { 'indent': '+1' }],
              [{ 'direction': 'rtl' }],
              [{ 'size': ['small', false, 'large', 'huge'] }],
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              [{ 'font': [] }],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'align': [] }],
              ['clean'],
              ['link', 'image', 'video']
            ],
            syntax: {
              highlight: text => hljs.highlightAuto(text).value
            }
          }
      },
    };
  },
  components: {
    quillEditor,
  },
  mounted() {
    this.initshowTooltip();
  },
  methods: {
    initshowTooltip(){
      let showTooltip = (el) => {
      let tool = el.className.replace('ql-', '');
          if (tooltips[tool]) {
            console.log(tooltips[tool]);
            $(el).attr("title",tooltips[tool]);
          }
        };
      let tooltips = {
          'bold': 'Bold (ctrl+B)',
          'italic': 'Italic (ctrl+I)',
          'underline': 'Underline (ctrl+U)',
          'strike': 'Strike'
        };

        let toolbarElement = document.querySelector('.ql-toolbar');
        if (toolbarElement) {
          let matches = toolbarElement.querySelectorAll('button');
          for (let el of matches) {
            showTooltip(el);
          }
        }
    },
    onEditorBlur(editor) {
      console.log('editor blur!', editor)
    },
    onEditorFocus(editor) {
      console.log('editor focus!', editor)
    },
    onEditorReady(editor) {
      console.log('editor ready!', editor)
    },
    onEditorChange({ editor, html, text }) {
      console.log('editor change!', editor, html, text)
      // this.content = html
    }
  },
};
</script>
