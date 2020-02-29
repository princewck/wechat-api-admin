<template>
  <div class="selfmedia-wrapper">
    <h2 style="margin-bottom: 15px">自媒体.素材预览</h2>
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
.selfmedia-wrapper {
  background: #f5f5f5 !important;
  padding: 50px;
  // display: flex;
  // flex-direction: column;
  // align-items: center;
}
article.post-article-content {
  margin-top: 50px;
  background-color: #fff;
  padding: 30px 45px 45px;
  min-height: 80vh;
  text-align: center;
  width: 900px;
  margin-left: auto;
  margin-right: auto;
  img {
    width: 100%;
    margin: 15px 0;
    margin-left: auto;
    margin-right: auto;
    position: relative;
  }

  video {
    max-width:100%;
    margin: 30px 0;
  }

  h1 {
    font-size: 36px;
    margin-bottom: 45px;
    text-align: center;
  }
  p {
    font-size: 18px;
    line-height: 32px;
    margin-bottom: 45px;
    text-align: left;
  }

  a {
    text-decoration: none;
    color: rgb(24, 151, 255);
    &:hover {
      color: blue;
    }
  }

  .article-info {
    font-size: 18px;
    color: #ddd;
    margin-bottom: 35px;
    text-align: center;
    label {
      margin-right: 30px;
    }
  }
}
</style>