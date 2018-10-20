<template>
<div> 
  <textarea ref="editor" cols="30" rows="10"></textarea>
  <FileSelect 
    type="image"
    @onSubmit="onSelectFile"
    ref="selector"
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
        editor.on('keyup', (e) => {
          this.$emit('onContentChange', editor.getContent());
        });
        editor.on('upload_image', () => {
          this.$refs.selector.select();
        });
      },
    });
  },
  methods: {
    onSelectFile(file) {
      const { editor } = this;
      editor.insertContent(editor.dom.createHTML('img', { src: file }));
      this.$emit('onContentChange', editor.getContent());
    },
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
