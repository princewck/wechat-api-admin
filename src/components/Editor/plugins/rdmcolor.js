!function () {

  tinymce.PluginManager.add('rdmcolor', function (editor) {
    editor.addButton('rdmcolor', {
      icon: 'emoticons',
      tooltip: '随机颜色',
      onclick() {
        const dom = editor.dom;
        const el = dom.create('body');
        el.innerHTML = editor.getContent();
        editor.$('p', el).each((_i, p) => {
          editor.$(p).css('color', '#'+Math.floor(Math.random()*16777215).toString(16));
        });
        editor.setContent(el.innerHTML);
        editor.fire('change');
      }
    });
  });
}();