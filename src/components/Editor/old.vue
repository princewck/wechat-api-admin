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
    editor.customConfig.colors = ["black","maroon","green","olive","navy","purple","teal","gray","silver","red","lime","yellow","blue","fuchsia","aqua","white","aliceblue","antiquewhite","aquamarine","azure","beige","blueviolet","brown","burlywood","cadetblue","chartreuse","chocolate","coral","cornflowerblue","cornsilk","crimson","darkblue","darkcyan","darkgoldenrod","darkgray","darkgreen","darkkhaki","darkmagenta","darkolivegreen","darkorange","darkorchid","darkred","darksalmon","darkseagreen","darkslateblue","darkslategray","darkturquoise","darkviolet","deeppink","deepskyblue","dimgray","dodgerblue","firebrick","floralwhite","forestgreen","gainsboro","ghostwhite","gold","goldenrod","greenyellow","honeydew","hotpink","indianred","indigo","ivory","khaki","lavender","lavenderblush","lawngreen","lemonchiffon","lightblue","lightcoral","lightcyan","lightgoldenrodyellow","lightgreen","lightgrey","lightpink","lightsalmon","lightseagreen","lightskyblue","lightslategray","lightsteelblue","lightyellow","limegreen","linen","mediumaquamarine","mediumblue","mediumorchid","mediumpurple","mediumseagreen","mediumslateblue","mediumspringgreen","mediumturquoise","mediumvioletred","midnightblue","mintcream","mistyrose","moccasin","navajowhite","oldlace","olivedrab","orange","orangered","orchid","palegoldenrod","palegreen","paleturquoise","palevioletred","papayawhip","peachpuff","peru","pink","plum","powderblue","rosybrown","royalblue","saddlebrown","salmon","sandybrown","seagreen","seashell","sienna","skyblue","slateblue","slategray","snow","springgreen","steelblue","tan","thistle","tomato","turquoise","violet","wheat","whitesmoke","yellowgreen"];
    editor.create();
    editor.txt.html(this.value || '');
    this.editor = editor;
  },
  watch: {
    value(newVal, oldVal) {
      if (newVal && newVal !== oldVal) {
        this.editor.txt.html(newVal);
      }
    }
  }
}
</script>

<style lang="scss">

.w-e-icon-paint-brush+div,
.w-e-icon-pencil2+div {
  width: 300px !important;
  ul {
    max-height: 250px;
    overflow: auto;
  }
}

.w-e-text-container {
  flex: auto !important;
  position: relative;
  > div {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
  }
}

</style>

