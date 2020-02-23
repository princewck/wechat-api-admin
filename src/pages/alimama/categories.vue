<template>
  <div>
    <h2>阿里妈妈.商品管理</h2>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/alimama/categories">商品分类</a></el-breadcrumb-item>
    </el-breadcrumb>     
    <el-table
        :data="list"
        stripe
        style="width: 100%"
      >
      <el-table-column label="分类名">
        <template slot-scope="scope">
          {{ scope.row.xpk_name }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="view(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>     
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'xpkList',
  data() {
    return {};
  },
  computed: mapState({
    list: state => state.alimama.categories,
  }),
  mounted() {
    this.$store.dispatch('alimama/getCategories');
  },
  methods: {
    view(row) {
      console.log('row', row);
      this.$router.push(`/tbk/products/${row.xpk_name}`);
    }
  }
}
</script>

<style lang="scss">
  
</style>