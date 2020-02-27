<template>
<div> 
  <textarea ref="editor" cols="30" rows="10"></textarea>
  <FileSelect 
    type="image"
    @onSubmit="onSelectFile"
    ref="imageSelector"
  ></FileSelect> 
  <FileSelect 
    accept="video/*"
    @onSubmit="onSelectVideo"
    ref="videoSelector"
  ></FileSelect>     
</div>
</template>

<script>
import FileSelect from '../FileSelect';
import conf from './tinymce';
export default {
  name: 'Editor',
  props: ['eid', 'value', 'config'],
  components: {
    FileSelect,
  },
  data() {
    return {
      editor: null,
    };
  },
  mounted() {
    const { value = '', config = {} } = this;

    tinymce.init({
      // selector: `#${this.eid}`,
      target: this.$refs.editor,
      ...conf,
      ...config,
      setup: (editor) => {
        console.log('初始化');
        this.editor = editor;
        conf.setup(editor);
        if (value) {
          editor.setContent(value);
        }
        editor.on('change', (e) => {
          console.log('内容变化了');
          this.$emit('onContentChange', editor.getContent());
        });
        editor.on('upload_image', () => {
          this.$refs.imageSelector.select();
        });
        editor.on('upload_video', () => {
          this.$refs.videoSelector.select();
        });
      },
    });
  },
  methods: {
    onSelectFile(file) {
      const { editor } = this;
      editor.insertContent(editor.dom.createHTML('img', { src: file }));
      editor.fire('change');
    },
    onSelectVideo(file) {
      const { editor } = this;
      editor.insertContent(`<span class="video-url" data-url="${file}">[视频]</span>`);
      editor.fire('change');
    }
  },
  watch: {
    value(val, oldVal) {
      if (!this.editor) return;
      const content = this.editor.getContent();
      if (val && val !== content) {
        this.editor.setContent(val);
      }
    }
  }
}
</script>

<style>

</style>
