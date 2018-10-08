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
          <template slot-scope="scope">
            <el-tag v-if="scope.row.gender == 1" type="primary">♂男</el-tag>
            <el-tag v-if="scope.row.gender == 2" type="warning">♀女</el-tag>
          </template>
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
        <el-table-column
          prop="avatar"
          label="备注">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.today"  type="success">今天登录过</el-tag>
          </template>
        </el-table-column>                
      </el-table>     
  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from 'moment';

function isToday(d) {
  return moment(d).format('YYYY-MM-DD') == moment().format('YYYY-MM-DD');
}

export default {
  name: "Users",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      list: state => state.customers.list.map(item => ({...item, today: isToday(item.last_login)}))
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
