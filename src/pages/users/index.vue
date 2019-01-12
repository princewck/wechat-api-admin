<template>
  <div>
    <h2>微信用户列表 </h2>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>  
    <div class="ope-panel">
      小程序：<el-select style="width: 250px;" :value="filters.appName" @change="changeApp" placeholder="请选择">
        <el-option
          v-for="item in appNames"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select> 
    </div>  
    <div>     
    </div>
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
            <el-tag v-if="isRecent(scope.row.last_login)"  type="success">3天内登录过</el-tag>
          </template>
        </el-table-column>                
      </el-table>     
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="pagination.current"
        :page-size="20"
        layout="total, prev, pager, next"
        :total="pagination.count">
      </el-pagination>      
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
    return {
      filter: '',
      appNames: [
        {
          label: '工时助手[新版]',
          value: 'workshop_new',          
        },
        {
          label: '工时助手',
          value: 'workshop',          
        },
        {
          label: '送福语',
          value: 'wish',          
        },
      ]
    };
  },
  computed: {
    ...mapState({
      list: state => state.customers.list,
      pagination: state => state.customers.pagination,
      filters: state => state.customers.filters,
    }),
    total() {
      return this.pagination.count;
    }
  },
  created() {
    this.$store.dispatch("customer/fetch", { page: 1, appName: 'workshop_new'}).catch(e => this.$message.error(e));
  },
  methods: {
    format(t) {
      return moment(t).format('YYYY-MM-DD HH:mm:ss');
    },
    isRecent(time) {
      return moment().startOf('day') - moment(time).startOf('day') <= 86400000 * 3;
    },
    async changeApp(app) {
      await this.$store.dispatch('customer/changeApp', app);
      await this.$store.dispatch('customer/fetch', {});
    },
    async handleCurrentChange(current) {
      await this.$store.dispatch('customer/fetch', {page: current});
    }
  }
};
</script>

<style lang="scss" scoped>
h2 { 
  text-align: left; 
  border-bottom: 1px solid #ddd;
  margin-bottom: 30px;
  line-height: 45px;
  display: flex;
  align-items: center;
  .m-l {
    margin-left: 15px;
  }
}

.ope-panel {
  height: 45px;
  line-height: 45px;
  margin-top: 15px;
}
</style>
