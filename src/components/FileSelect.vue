<template>
  <span>
    <span @click="select">
      <slot></slot>
    </span>    
    <el-dialog custom-class="file-select-dialog" title="选择文件" :visible.sync="selectVisible">
      <el-tabs v-model="tab" @tab-click="handleClick">
        <el-tab-pane label="上传" name="upload">
          <div>
            <el-form :model="form" label-position="left">
              <el-form-item label="文件名" label-width="100px">
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-form-item>  
              <el-form-item v-if="!form.id" label="文件" label-width="100px">
                <el-upload
                  class="upload-demo"
                  ref="upload"
                  :http-request="onUpload"
                  :on-remove="handleRemove"
                  :list-type="form.type === 'image' ? 'picture' : ''"
                  action=""
                  :limit="1"
                  :accept="type==='image' ? 'image/*' : undefined"
                  >
                  <el-button v-if="!url" slot="trigger" size="small" type="primary">选取文件</el-button>
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
          </div>
        </el-tab-pane>
        <el-tab-pane label="从素材库选择" name="select">
          <el-table
              ref="singleTable"
              :data="list"
              highlight-current-row
              @current-change="handleCurrentChange"
              style="width: 100%;max-height: 500px;overflow: auto;">
              <el-table-column
                type="index"
                width="50">
              </el-table-column>
              <el-table-column
                property="name"
                label="文件名"
                width="120">
              </el-table-column>
              <el-table-column
                property="type"
                label="类型"
                width="80">
              </el-table-column>
              <el-table-column
                property="preview"
                label="预览">
                <template slot-scope="scope">
                  <audio :src="scope.row.value" loop controls v-if="scope.row.type == 'audio'" />                  
                  <el-popover
                    width="400"
                    trigger="hover"
                    placement="right"
                  >
                    <el-card class="box-card" :body-style="{'width': '350px'}">
                      <img width="100%" :src="scope.row.value" v-if="scope.row.type === 'image'" />    
                    </el-card>
                    <img slot="reference" height="50px" :src="scope.row.value" v-if="scope.row.type === 'image'" />
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column
                property="created_at"
                label="创建时间"
                width="150">
                <template slot-scope="scope">
                  {{ format(scope.row.created_at) }}
                </template>
              </el-table-column>              
            </el-table>          
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button @click="selectVisible = false">取 消</el-button>
        <el-button :disabled="!valid" type="primary" @click="onSubmit">选择</el-button>
        <el-button :disabled="!valid" v-if="type === 'image'" type="primary" plain @click="selectVisible = false">选择并裁剪</el-button>
      </div>            
    </el-dialog>    
  </span>
</template>

<script>
import upload from '@/utils/upload';
import { mapState } from 'vuex';
import moment from 'moment';

function emptyForm() {
  return {
    name: '',
    description: '',
    type: null,
    url: '',
  };
}
export default {
  name: 'fileSelect',
  props: ['type'],
  data() {
    return {
      selectVisible: false,
      tab: 'upload',
      form: emptyForm(),
      url: null,
      currentRow: null,
    };
  },
  computed: {
    ...mapState({
      assets: state => state.assets.list,
    }),
    valid() {
      if (this.tab === 'upload' && this.url) {
        return true;
      }
      if (this.tab === 'select' && this.currentRow) {
        return true;
      }
      return false;
    },
    list() {
      if(!this.type) return this.assets;
      return this.assets.filter(item => item.type === this.type);
    }
  },
  methods: {
    format(m) {
      return moment(m).format('YYYY-MM-DD HH:mm:ss');
    },    
    handleClick(tab) {
      console.log(tab);
      this.tab = tab.name;   
      console.log('tab.name', tab.name);
      if (tab.name === 'select') {
        this.$store.dispatch('assets/fetch');
      }
    },
    select() {
      this.selectVisible = true;
    },
    handleRemove(config) {
      this.url = null;
      this.form = emptyForm();
    },
    async onUpload(config) {
      const res = await upload(undefined, config.file);
      this.url = res.url;
      this.form.url = res.url;
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
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    async onSubmit() {
      try {
        let value;
        if (this.tab === 'upload') {
          value = this.url;
          await this.$store.dispatch('assets/create', this.form);
        } else {
          value = this.currentRow.value;
        }
        this.$emit('onSubmit', value);
        this.selectVisible = false;        
      } catch (e) {
        console.error(e);
        this.$message.error(e.message);
      }
    }
  }
}
</script>

<style lang="scss">
.el-dialog__wrapper {
  z-index: 99999 !important;
}
.file-select-dialog {
  label {
    float: left !important;
  }
  > .el-dialog__body {
    padding-top: 0;
  }
}

.el-popper {
  z-index: 999999 !important;
}

</style>

