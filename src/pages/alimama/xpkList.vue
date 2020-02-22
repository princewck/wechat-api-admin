<template>
  <div>
    <h2>阿里妈妈.选品管理</h2>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/alimama/xpk">选品库列表</a></el-breadcrumb-item>
    </el-breadcrumb>     
    <el-table
        :data="list"
        stripe
        style="width: 100%"
        :header-cell-style="{'text-align': 'center'}"
      >
      <el-table-column prop="favorites_id" label="ID"/>
      <el-table-column prop="favorites_title" label="选品库名"/>
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
    list: state => state.alimama.xpkList,
  }),
  mounted() {
    this.$store.dispatch('alimama/getXPKList');
  },
  methods: {
    view(row) {
      console.log('row', row);
    }
  }
}
</script>

<style lang="scss">
  
</style>