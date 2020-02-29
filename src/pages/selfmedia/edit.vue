<template>
  <div>
    <h2>自媒体.素材编辑</h2>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/alimama/categories">编辑自媒体素材</a></el-breadcrumb-item>
    </el-breadcrumb>         
    <el-form 
        :style="{'width': '100%'}" 
        label-position="top" 
        size="small" 
        :model="form"
        label-width="150px"
      >
        <el-form-item label="标题">
          <el-input v-model="form.title" placeholder="请输入文章标题"></el-input>
        </el-form-item> 
        <el-form-item label-width="100%" label="文章类型：">
          <el-select v-model="form.article_type" placeholder="文章类型">
            <el-option label="微博" value="weibo" />
            <el-option label="文章" value="post" />
          </el-select>
        </el-form-item>
        <el-form-item label-width="100%" label="时效：">
          <el-select v-model="form.expires" placeholder="文章时效性">
            <el-option label="长期" value="never" />
            <el-option label="今天24点前" value="today" />
            <el-option label="明天24点前" value="tomorrow" />
            <el-option label="后天24点前" value="day_after_tomorrow" />
          </el-select>
        </el-form-item>                
        <el-form-item class="form-item-content" label-width="100%" label="正文">
          <div class="main-content">
            <editor 
              :value="form.content" 
              eid="selfmedia_content"
              @onContentChange="onContentChange" 
            />
          </div>            
        </el-form-item>  
        <el-form-item>
          <el-button type="success" @click="this.submit">发布</el-button>
        </el-form-item>
      </el-form>     
  </div>
</template>

<script>
import Editor from '@/components/Editor/index';
import FileSelect from '@/components/FileSelect';
import { publish, update } from '@/service/selfmedia';
import { mapState } from 'vuex';
import moment from 'moment';

export default {
  name: 'selfMediaEdit',
  components: {
    editor: Editor,
    FileSelect,
  },  
  computed: {
    ...mapState({
      detail: state => state.selfmedia.detail,
    })
  },
  data() {
    return {
      form: {
        expires: 'never',
        title: '',
        content: '',
        article_type: null,
      },
    };
  },
  async mounted() {
    if (this.$route.params.id) {
      const detail = await this.$store.dispatch('media/get', {id: this.$route.params.id});
      this.form = {...detail};
    }
  },
  methods: {
    async submit() {
      if (!this.form.title) {
        this.$notify.error({
          title: '错误',
          message: '标题不能为空',
        });  
        return;      
      }
      if (!this.form.article_type) {
        this.$notify.error({
          title: '错误',
          message: '类型不能为空',
        });  
        return;        
      }
      const id = this.$route.params.id;
      let expiresAt;
      switch(this.form.expires) {
        case 'today':
          expiresAt = moment().endOf('day');
          break;
        case 'tomorrow':
          expiresAt = moment().add(1, 'days').endOf('day');
          break;
        case 'day_after_tomorrow':
          expiresAt = moment().add(2, 'days').endOf('day');
          break;
        case 'never':          
        default:
          expiresAt = moment().add(3, 'months').endOf('day');
          break;
      }
      this.form.expires_at = expiresAt.format('YYYY-MM-DD HH:mm:ss');
      try {
        if (id === 'new') {
          await publish(this.form);
        } else {
          await update(id, this.form);
        }
        this.$notify.success({
          title: '操作成功',
          message: '发布成功！',
        });        
        this.$router.replace('/selfmedia/list');
      } catch (e) {
        this.$notify.error({
          title: '错误',
          message: '发布失败',
        });
      }
      console.log(this.form);
    },
    onContentChange(content) {
      this.form.content = content;
    },
  },
}
</script>

<style>

</style>