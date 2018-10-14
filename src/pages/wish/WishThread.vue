<template>
<div>
    <h2>送祝福.分类管理<el-button @click="add" type="success" class="pull-right">添加</el-button></h2>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>送祝福小程序</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
    </el-breadcrumb>   
    <el-table
        :data="list"
        stripe
        style="width: 100%"
      >
      <el-table-column width="50px" prop="id" label="ID"/>
      <el-table-column prop="title" label="标题"/>
      <el-table-column prop="background" label="背景图片">
        <template slot-scope="scope">
          <img v-if="scope.row.background" :src="scope.row.background" style="width: 100px" />
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
      <el-table-column prop="description" label="描述"/>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == 1" type="success">可用</el-tag>
          <el-tag v-if="scope.row.status == 0" type="warning">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column width="150px" label="操作">
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
      categories: state => state.wish.category.list.reduce((map, item) => {
        map[item.id] = item;
        return map;
      }, {}),
    })
  },
  created() {
    this.$store.dispatch('wish/fetchThreads');
    this.$store.dispatch('wish/fetchCategories');
  },
  methods: {
    update(row) {
      this.$router.push({path: `/wish/thread/${row.id}/edit`});
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
      this.$router.push({path: '/wish/thread/new/edit'});
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

