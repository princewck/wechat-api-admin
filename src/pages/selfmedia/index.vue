<template>
  <div>
    <h2>自媒体.素材管理 <el-button @click="createPost" type="information" style="float: right">创建文章</el-button></h2>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/alimama/categories">文章列表</a></el-breadcrumb-item>
    </el-breadcrumb>         
    <el-table
        class="table"
        :data="list"
        stripe
        style="width: 100%"
      >
      <el-table-column label="id" prop="id" >

      </el-table-column>
      <el-table-column label="类型">
        <template slot-scope="scope">
          {{ scope.row.article_type === 'weibo' ? '微博' : '图文' }}
        </template>
      </el-table-column>
      <el-table-column label="摘要" width="700">
        <template slot-scope="scope">
          {{ getSummary(scope.row.content) }}
        </template>
      </el-table-column>      
      <el-table-column label="视频">
        <template slot-scope="scope">
          <div v-if="scope.row.video_url">有</div>
          <div v-else>无</div>
        </template>
      </el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          {{ scope.row.images.length ? scope.row.images.length + '张' : '无' }}
        </template>
      </el-table-column>      
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="view(scope.row)">查看</el-button>
          <el-button type="primary" @click="edit(scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>  
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="pagination.current_page"
      :page-size="20"
      layout="total, prev, pager, next"
      :total="pagination.total_count">
    </el-pagination>        
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'selfMedia',
  data() {
    return {

    };
  },
  computed: {
    ...mapState({
      list: state => state.selfmedia.list,
      pagination: state => state.selfmedia.pagination,
    })
  },
  beforeMount() {
    this.$store.dispatch('media/fetch', { page: 1 });
  },
  methods: {
    createPost() {
      this.$router.push('/selfmedia/new/edit');
    },
    handleCurrentChange(page) {
      const { category } = this.$route.params;
      this.$store.dispatch('media/fetch', { page, });
    },
    view(row) {
      this.$router.push(`/selfmedia/${row.id}/view`);
    },
    edit(row) {
      this.$router.push(`/selfmedia/${row.id}/edit`);
    },
    getSummary(content) {
      const div = document.createElement('div');
      div.innerHTML = content;
      return div.innerText.length > 30 ? div.innerText.substring(0, 30) + '...' : div.innerText;
    }
  },
}
</script>

<style>

</style>