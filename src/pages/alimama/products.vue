<template>
  <div class="wrapper">
    <div class="header" style="height: 80px">
      <h2>
        阿里妈妈.商品列表
      </h2>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/alimama/categories">商品分类</a></el-breadcrumb-item>
        <el-breadcrumb-item><a href="">{{ $route.params.category }}</a></el-breadcrumb-item>
      </el-breadcrumb>         
    </div>
    <el-table
        v-loading="products.loading"
        class="table"
        :data="products.list"
        stripe
        style="width: 100%"
      >
      <el-table-column label="详情" width="700">
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
            {{ format(scope.row.event_start_time) }} - {{ format(scope.row.event_end_time) }}
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
      :current-page.sync="products.page"
      :page-size="20"
      layout="total, prev, pager, next"
      :total="products.total">
    </el-pagination>            
  </div>
</template>

<script>
import { mapState } from 'vuex';
import PDetail from './detail';
import moment from 'moment';
export default {
  name: 'xpkList',
  components: {
    PDetail,
  },
  data() {
    return {};
  },
  computed: mapState({
    products: state => state.alimama.products,
  }),
  mounted() {
    const { category } = this.$route.params;
    this.$store.dispatch('alimama/getProducts', { category });
  },
  methods: {
    view(row) {
      console.log('row', row);
    },
    format(t) {
      return moment(t).format('YYYY-MM-DD HH:mm');
    },
    handleCurrentChange(page) {
      const { category } = this.$route.params;
      this.$store.dispatch('alimama/getProducts', { category, page, });
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