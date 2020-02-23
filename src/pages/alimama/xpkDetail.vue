<template>
  <div class="wrapper">
    <div class="header" style="height: 80px">
      <h2>
        阿里妈妈.选品库
        <a href="https://pub.alimama.com/manage/selection/list.htm?spm=a219t.11816986.1998910419.db62784000.42bc75a5rY7ojo" target="_blank">管理选品库</a>
      </h2>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/alimama/xpk">选品库列表</a></el-breadcrumb-item>
        <el-breadcrumb-item><a href="">选品库列明细</a></el-breadcrumb-item>
      </el-breadcrumb>         
    </div>
    <el-table
        v-loading="xpkDetail.loading"
        class="table"
        :data="xpkDetail.list"
        stripe
        style="width: 100%"
      >
      <el-table-column label="详情">
        <template slot-scope="scope">
          <p-detail :data="scope.row"></p-detail>
        </template>
      </el-table-column>
      <el-table-column label="佣金比例">
        <template slot-scope="scope">
          {{ scope.row.tk_rate }} % 
        </template>
      </el-table-column>
      <el-table-column label="商品状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status > 0"  type="success">商品可推广</el-tag>
          <el-tag v-else  type="danger">商品已失效</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="活动期限">
        <template slot-scope="scope">
          <div class="activity" v-if="scope.row.status > 0">
            {{ scope.row.event_start_time }} - {{ scope.row.event_end_time }}
          </div>
        </template>
      </el-table-column>      
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="view(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>  
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="xpkDetail.page"
      :page-size="20"
      layout="total, prev, pager, next"
      :total="xpkDetail.total">
    </el-pagination>            
  </div>
</template>

<script>
import { mapState } from 'vuex';
import PDetail from './detail';
export default {
  name: 'xpkList',
  components: {
    PDetail,
  },
  data() {
    return {};
  },
  computed: mapState({
    xpkDetail: state => state.alimama.xpkDetail,
    // page: state => state.alimama.xpkDetail.page,
    // total: state => state.alimama.xpkDetail.total,
    // loading: state => state.alimama.xpkDetail.loading,
  }),
  mounted() {
    const { id } = this.$route.params;
    this.$store.dispatch('alimama/getXPKDetail', { favoritesId: id });
  },
  methods: {
    view(row) {
      console.log('row', row);
    },
    handleCurrentChange(page) {
      const { id } = this.$route.params;
      this.$store.dispatch('alimama/getXPKDetail', { favoritesId: id, page, });
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../styles/mixins.scss';
  .wrapper {
    height: 100vh;
    @include Flex(column nowrap, stretch, stretch);

    .header {
      flex: 0 0 auto;
      h2 {
        margin-bottom: 10px;
        a {
          float: right;
          margin-right: 50px;
          text-decoration: none;
          color: rgb(17, 112, 236);
          font-size: 14px;
        }
      }
    }

    .table {
      flex: auto;
      overflow: auto;
    }
  }


</style>