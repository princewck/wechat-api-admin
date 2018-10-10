<template>
<div class="wrapper">
  <el-breadcrumb separator="/">
    <el-breadcrumb-item>首页</el-breadcrumb-item>
    <el-breadcrumb-item>送祝福小程序</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: '/wish/thread' }">文章管理</el-breadcrumb-item>
    <el-breadcrumb-item>编辑</el-breadcrumb-item>
  </el-breadcrumb>
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
        <el-form-item label-width="100%" label="正文">
          <div class="main-content">
            <editor v-model="form.content" eid="wish_content"/>
          </div>
        </el-form-item>
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
        <el-form-item label-width="100%" label="背景图片：">
        <el-input type="textarea" v-model="form.background"></el-input>
        </el-form-item> 
        <el-form-item label-width="100%" label="背景音乐：">
          <el-input type="textarea" v-model="form.bgm"></el-input>
        </el-form-item>                 
      </el-form>      
    </div>
  </div>
</div>   
</template>

<script>
import Editor from '@/components/Editor';
import { mapState } from 'vuex';
import { findThread } from '@/service/wish';
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
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixins.scss';
.wrapper {
  width: 100%;
  @include Flex(column nowrap, flex-start, stretch);
  position: relative;
  > .content {
    flex: auto;
    @include Flex(row nowrap, flex-start, stretch);
    padding-bottom: 50px;
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

      .main-content {
        width: 100%;
        height: 300px;
      }
    }
    .aside {
      flex: 0 0 320px;
      width: 320px;
      border-left: 1px solid #c5c5c5;
      padding: 15px;
    }
  }
}
</style>

