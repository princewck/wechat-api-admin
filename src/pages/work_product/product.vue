<template>
<div>
    <h2>积分兑换.商品管理<el-button @click="add" type="success" class="pull-right">添加</el-button></h2>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>积分兑换</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
    </el-breadcrumb>   
    <el-table
        :data="list"
        stripe
        style="width: 100%"
      >
      <el-table-column width="50px" prop="id" label="ID"/>
      <el-table-column prop="title" label="标题"/>
      <el-table-column prop="price" label="价格"/>
      <el-table-column prop="origin_price" label="原价"/>
      <el-table-column prop="require_bp" label="所需积分"/>
      <el-table-column prop="background" label="封面图片">
        <template slot-scope="scope">
          <img v-if="scope.row.cover" :src="scope.row.cover" style="width: 100px" />
        </template>
      </el-table-column>
      <el-table-column prop="cid" label="所属分类">
        <template slot-scope="scope">
          <el-tag>{{ getCate(scope.row) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="created_at" label="创建时间">
        <template slot-scope="scope">
          {{ format(scope.row.created_at) }}
        </template>
      </el-table-column>
      <el-table-column prop="updated_at" label="修改时间">
        <template slot-scope="scope">
          {{ format(scope.row.updated_at) }}
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == 1" type="success">可用</el-tag>
          <el-tag v-if="scope.row.status == 0" type="warning">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column width="150px" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="update(scope.row)">修改</el-button>
          <el-button type="danger" @click="deleteProduct(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>    
</div>
</template>

<script>
import { mapState } from 'vuex';
import moment from 'moment';
export default {
  name: 'workProduct',
  computed: {
    ...mapState({
      list: state => state.workProduct.product.list,
      categories: state => state.workProduct.category.list.reduce((map, item) => {
        map[item.id] = item;
        return map;
      }, {}),
    })
  },
  created() {
    this.$store.dispatch('workProduct/fetchProducts');
    this.$store.dispatch('workProduct/fetchCategories');
  },
  methods: {
    update(row) {
      this.$router.push({path: `/work_product/product/${row.id}/edit`});
    },
    async deleteProduct(row) {
      await this.$confirm('次操作将彻底删除这篇文章', '提示', {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      });
      try {
        await this.$store.dispatch('workProduct/deleteProduct', row);
        await this.$store.dispatch('workProduct/fetchProducts');        
      } catch (e) {
        console.error(e);
        this.$message.error(e.message);
      }
    },
    add() {
      this.$router.push({path: '/work_product/product/new/edit'});
    },
    format(m) {
      return moment(m).format('YYYY-MM-DD HH:mm:ss');
    },
    getCate(row) {
      const _row = this.categories[row.cid];
      console.log('_row', _row, this.categories, row);
      return _row && _row.name;
    }
  },
}
</script>

<style lang="scss" scoped>
h2 { 
  text-align: left; 
  border-bottom: 1px solid #ddd;
  margin-bottom: 30px;
}
</style>

