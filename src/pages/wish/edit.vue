<template>
<div class="wrapper">
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>送祝福小程序</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/wish/thread' }">文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>编辑</el-breadcrumb-item>
    </el-breadcrumb>    
  </div>
  <div class="content">
    <div class="op-panel">
      <el-button @click="onSubmit" type="primary">发布</el-button>
    </div>
    <div class="main">
      <el-form 
        :style="{'width': '100%'}" 
        label-position="top" 
        size="small" 
        :model="form"
        label-width="150px"
      >
        <el-form-item label="标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item> 
        <el-form-item label="描述">
          <el-input type="textarea" v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item class="form-item-content" label-width="100%" label="正文">
        </el-form-item>
        <div class="main-content">
          <editor 
            :value="form.content" 
            eid="wish_content"
            @onContentChange="onContentChange" 
          />
        </div>        
      </el-form> 
    </div>
    <div class="aside">
      <el-form 
        :style="{'width': '100%'}" 
        label-position="top" 
        size="small" 
        :model="form"
        label-width="150px"
      >
        <el-form-item label-width="100%" label="封面图片：">
          <FileSelect type="image" @onSubmit="onSelectCover">
            <el-button type="success" plain>选择</el-button>
          </FileSelect>
          <div class="bg-preview" v-if="form.cover">
            <img :src="form.cover"/>
            <div>
              <i @click="removeCover" class="el-icon-delete"></i>
            </div>
          </div>
          <!-- <el-input type="textarea" v-model="form.background"></el-input> -->
        </el-form-item>   
        <el-form-item label-width="100%" label="背景图片：">
          <FileSelect type="image" @onSubmit="onSelectBg">
            <el-button type="success" plain>选择</el-button>
          </FileSelect>
          <div class="bg-preview" v-if="form.background">
            <img :src="form.background"/>
            <div>
              <i @click="removeBackground" class="el-icon-delete"></i>
            </div>
          </div>
          <!-- <el-input type="textarea" v-model="form.background"></el-input> -->
        </el-form-item> 
        <el-form-item label-width="100%" label="背景音乐：">
          <FileSelect type="audio" @onSubmit="onSelectBgm">
            <el-button type="success" plain>选择</el-button>
          </FileSelect>          
          <el-button type="danger" plain @click="deleteBgm">删除</el-button>
          <div v-if="form.bgm" class="bgm-preview">
            <audio :src="form.bgm" controls="controls">
              您的浏览器不支持默认音频控件
            </audio>
          </div>
          <!-- <el-input type="textarea" v-model="form.bgm"></el-input> -->
        </el-form-item>               
        <el-form-item label-width="100%" label="所属分类：">
          <el-select v-model="form.cid" placeholder="选择所属分类">
            <el-option 
              v-for="category in categories"
              :key="category.id"
              :label="category.name"
              :value="category.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label-width="100%" label="状态：">
          <el-select v-model="form.status" placeholder="状态">
            <el-option label="可用" :value="1" />
            <el-option label="禁用" :value="0" />
          </el-select>
        </el-form-item>    
        <el-form-item label-width="100%" label="自动滚动：">
          <el-select v-model="form.auto_scroll" placeholder="是否滚动">
            <el-option label="滚动" :value="1" />
            <el-option label="不滚动" :value="0" />
          </el-select>
        </el-form-item>                              
      </el-form>      
    </div>
  </div>
</div>   
</template>

<script>
import Editor from '@/components/Editor/index';
import { mapState } from 'vuex';
import { findThread } from '@/service/wish';
import FileSelect from '@/components/FileSelect';
export default {
  data() {
    return {
      form: {},
    };
  },
  computed: {
    ...mapState({
      categories: state => state.wish.category.list,
    })
  },
  components: {
    editor: Editor,
    FileSelect,
  },
  created() {
    const { id } = this.$route.params;
    this.$store.dispatch('wish/fetchCategories');
    if (id && id !== 'new') {
      findThread(id).then(res => {
        this.form = res;
      })
    }
  },
  mounted() {
    window.getContent = () => {
      console.log(this.form);
    }
  },
  methods: {
    async onSubmit() {
      try {
        await this.$store.dispatch('wish/publish', this.form);
        await this.$router.push('/wish/thread');
      } catch (e) {
        this.$message.error(e.message);
      }
    },
    onContentChange(content) {
      this.form.content = content;
    },
    removeBackground() {
      this.form.background = null;
    },
    onSelectBg(url) {
      this.$set(this.form, 'background', url);
    },
    onSelectBgm(url) {
      this.$set(this.form, 'bgm', url);
    },
    onSelectCover(url) {
      this.$set(this.form, 'cover', url);
    },
    removeCover() {
      this.form.cover = null;
    },
    deleteBgm() {
      this.form.bgm = null;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixins.scss';

.breadcrumb {
  background: #fff;
  padding-bottom: 15px;
}
.wrapper {
  width: 100%;
  @include Flex(column nowrap, flex-start, stretch);
  position: relative;
  > .content {
    flex: auto;
    @include Flex(row nowrap, flex-start, stretch);
    padding-bottom: 60px;
    .op-panel {
      position: absolute;
      height: 60px;
      background: rgba(0, 0, 0, .2);
      line-height: 60px;
      bottom: 0;
      left: 0;
      width: 100%;
      padding: 0 25px;
    }

    .main {
      flex: auto;
      padding: 15px;
      box-sizing: border-box;
      overflow: auto;
      @include Flex(column nowrap, flex-start, flex-start);
      > form {
        flex: auto;
        @include Flex(column nowrap, flex-start, stretch);
      }
    }

    #wish_content {
      @include Flex(column nowrap, flex-start, stretch);
    }
    .aside {
      flex: 0 0 320px;
      width: 320px;
      border-left: 1px solid #c5c5c5;
      padding: 15px;
      overflow: auto;

      .bg-preview {
        width: 100%;
        position: relative;
        margin-top: 10px;
        &:hover {
          > div {
            color: #fff;
            font-size: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            > i {
              cursor: pointer;
            }
          }
        }
        img {
          width: 100%;
        }
        > div {
          display: none;
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          right: 0;
          background: rgba(0, 0, 0, .5);
        }
      }

      .bgm-preview {
        margin-top: 10px;
      }
    }
  }
}
</style>

