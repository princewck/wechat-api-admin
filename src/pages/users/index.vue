<template>
  <div>
    <h2>微信用户列表</h2>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>    
    <el-table
        :data="list"
        stripe
        style="width: 100%"
        :header-cell-style="{'text-align': 'center'}"
      >
        <el-table-column
          prop="avatar"
          label="头像">
          <template slot-scope="scope">
            <img width="35px" :src="scope.row.avatar" />
          </template>
        </el-table-column>        
        <el-table-column
          prop="id"
          label="id">
        </el-table-column>
        <el-table-column
          prop="nick"
          label="昵称">
        </el-table-column>
        <el-table-column
          prop="gender"
          label="性别">
        </el-table-column>    
        <el-table-column
          prop="province"
          label="省份">
        </el-table-column>            
        <el-table-column
          prop="city"
          label="城市">
        </el-table-column>        
        <el-table-column
          prop="first_login"
          label="首次登录"
          width="170"
        >
          <template slot-scope="scope">
            {{ format(scope.row.first_login) }}
          </template>          
        </el-table-column>        
        <el-table-column
          prop="last_login"
          label="最近登录"
          width="170"
        >
          <template slot-scope="scope">
            {{ format(scope.row.last_login) }}
          </template>          
        </el-table-column>        
      </el-table>     
  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from 'moment';
export default {
  name: "Users",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      list: state => state.customers.list
    })
  },
  created() {
    this.$store.dispatch("customer/fetch").catch(e => this.$message.error(e));
  },
  methods: {
    format(t) {
      return moment(t).format('YYYY-MM-DD HH:mm:ss');
    }
  }
};
</script>

<style lang="scss" scoped>
h2 { 
  text-align: left; 
  border-bottom: 1px solid #ddd;
  margin-bottom: 30px;
}
</style>
