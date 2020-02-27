!function () {

  tinymce.PluginManager.add('wlog_video', function (editor) {
    editor.addButton('wlog_video', {
      icon: 'media',
      tooltip: '插入视频',
      onclick() {
        editor.fire('upload_video');
      }
    });
  });
}();