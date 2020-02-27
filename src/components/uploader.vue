<template>
  <el-dialog title="上传文件" :visible.sync="dialogVisible">
    <el-form :model="form">
      <el-form-item label="文件名" label-width="100px">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>  
      <el-form-item v-if="!form.id" label="文件" label-width="100px">
        <el-upload
          class="upload-demo"
          ref="upload"
          accept="video/*,image/*"
          :http-request="onUpload"
          :on-remove="handleRemove"
          :file-list="fileList"
          :list-type="form.type === 'image' ? 'picture' : ''"
          action=""
          :limit="1"
          >
          <el-button v-if="!uploaded" slot="trigger" size="small" type="primary">选取文件</el-button>
        </el-upload> 
      </el-form-item>     
      <el-form-item v-if="form.url" label="地址" label-width="100px">
        <a :href="form.url" target="_blank">{{ form.url }}</a>
      </el-form-item>
      <el-form-item label="文件类型" label-width="100px">
        <el-select v-model="form.type" placeholder="请选择文件类型" required>
          <el-option label="图片" value="image"></el-option>
          <el-option label="音频" value="audio"></el-option>
          <el-option label="视频" value="video"></el-option>
          <el-option label="其他" value="other"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="onToggle">取 消</el-button>
      <el-button type="primary" @click="onSubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getSTS } from '@/service/oss';
import upload from '@/utils/upload';
export default {
  name: 'uploader',
  props: [
    'visible',
    'info',
  ],
  data() {
    return {
      form: {type: null, name: '', url: ''},
      dialogVisible: this.visible,
      fileList: [],
      cred: {},
      uploaded: null,
    }
  },
  methods: {
    initData() {
      this.form = {...this.info};
    },
    updated() {
      Object.assign(this.form, this.info);
      this.dialogVisible = this.visible;
    },
    onToggle() {
      this.$emit('onToggle', !this.visible);
    },
    onSubmit() {
      this.$emit('onSubmit', this.form);
    },
    handleRemove(config) {
      this.uploaded = null;
    },
    async onUpload(config) {
      const res = await upload(undefined, config.file);
      this.uploaded = res;
      const { type: fileType } = config.file;
      this.form.name = config.file.name;
      if (fileType.includes('image')) {
        this.form.type = 'image';
      } else if (fileType.includes('audio')) {
        this.form.type = 'audio';
      } else if (fileType.includes('video')) {
        this.form.type = 'video';
      } else {
        this.form.type = 'other';
      }
    }
  },
  watch: {
    visible(value) {
      this.dialogVisible = value;
    },
    info: {
      handler(value) {
        this.form = {...value};
      },
      deep: true,
    },
    dialogVisible(value) {
      this.$emit('onToggle', !!value);
    },
    uploaded(value) {
      this.form.url = value && value.url || '';
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
