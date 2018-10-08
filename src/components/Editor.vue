<template>
<div :id="eid"></div>
</template>

<script>
// 引用
var E = require('wangeditor')  // 使用 npm 安装
export default {
  name: 'editor',
  props: ['eid', 'value', 'model'],
  data() {
    return {
      editor: null,
    };
  },
  mounted() {
    // 创建编辑器
    var editor = new E(`#${this.eid}`)
    editor.customConfig.onchange = (html) => {
      this.$emit('input', html);
    }
    editor.customConfig.colors = [
        '#000000',
        '#eeece0',
        '#1c487f',
        '#4d80bf',
        '#c24f4a',
        '#8baa4a',
        '#7b5ba1',
        '#46acc8',
        '#f9963b',
        '#ffffff',
    ];
    editor.create();
    editor.txt.html(this.value || '');
    this.editor = editor;
  },
  watch: {
    value(newVal, oldVal) {
      if (newVal && newVal !== oldVal) {
        console.log('set content');
        this.editor.txt.html(newVal);
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

