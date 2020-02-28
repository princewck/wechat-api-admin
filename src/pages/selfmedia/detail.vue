<template>
  <div>
    <h2>自媒体.素材预览</h2>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/selfmedia/list">文章列表</a></el-breadcrumb-item>
      <el-breadcrumb-item><a>文章详情</a></el-breadcrumb-item>
    </el-breadcrumb>
    <article class="post-article-content">
      <h1>{{ detail.title }}</h1>
      <div class="article-info">
        <label>创建时间：{{ f(detail.created_at) }}</label>
        <label>类型：{{ detail.article_type === 'weibo' ? '微博' : '文章' }}</label>
      </div>
      <div>
        <video v-if="video" :src="video" controls />
      </div>
      <div ref="content" class="article-content" v-html="detail.content">
      </div>
    </article>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import moment from 'moment';
export default {
  name: 'selfMediaView',
  data() {
    return {
      video: null,
    };
  },
  async mounted() {
    await this.$store.dispatch('media/get', {id: this.$route.params.id});
    this.check();
  },
  computed: {
    ...mapState({
      detail: state => state.selfmedia.detail,
    })
  },
  methods: {
    check() {
      const $video = this.$refs.content.querySelector('.video-url');
      if (!$video) return;
      const url = $video.getAttribute('data-url');
      $video.remove();
      this.video = url;
    },
    f(d) {
      return moment(d).format('YYYY-MM-DD HH:mm');
    }
  },
  watch: {
    detail: {
      handler(val) {
        this.check();
      }
    }
  },
}
</script>

<style lang="scss">
article.post-article-content {
  padding: 30px 25px 45px;
  min-height: 80vh;
  img {
    max-width: 100%;
    margin: 15px 0;
  }

  video {
    max-width:100%;
  }

  h1 {
    font-size: 25px;
    margin-bottom: 45px;
    text-align: center;
  }
  p {
    font-size: 14px;
    line-height: 1.5;
    margin-bottom: 20px;
  }

  .article-info {
    font-size: 12px;
    color: #ddd;
    margin-bottom: 35px;
    text-align: center;
    label {
      margin-right: 30px;
    }
  }
}
</style>