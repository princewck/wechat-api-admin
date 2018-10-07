<template>
<div>
    <h2>送祝福.分类管理</h2>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>送祝福小程序</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
    </el-breadcrumb>   
    <el-table
        :data="list"
        stripe
        style="width: 100%"
        :header-cell-style="{'text-align': 'center'}"
      >
      <el-table-column width="30px" prop="id" label="ID"/>
      <el-table-column prop="title" label="标题"/>
      <el-table-column prop="background" label="背景图片"/>
      <el-table-column prop="cid" label="所属分类"/>
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
      <el-table-column prop="description" label="描述"/>
      <el-table-column prop="status" label="状态"/>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="update(scope.row)">修改</el-button>
          <el-button type="danger" @click="deleteThread(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>    
</div>
</template>

<script>
import { mapState } from 'vuex';
import moment from 'moment';
export default {
  name: 'WishThread',
  computed: {
    ...mapState({
      list: state => state.wish.thread.list,
    })
  },
  created() {
    this.$store.dispatch('wish/fetchThreads');
  },
  methods: {
    update(row) {
      this.$router.push({path: `/wish/category/${row.id}/edit`});
    },
    async deleteThread(row) {
      await this.$confirm('次操作将彻底删除这篇文章', '提示', {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      });
      try {
        await this.$store.dispatch('wish/deleteThread', row);
        await this.$store.dispatch('wish/fetchThreads');        
      } catch (e) {
        console.error(e);
        this.$message.error(e.message);
      }
    },
    add() {
      this.$router.push({path: '/wish/category/new/edit'});
    },
    format(m) {
      return moment(m).format('YYYY-MM-DD HH:mm:ss');
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

