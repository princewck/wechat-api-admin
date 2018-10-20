<template>
  <div>
    <h2>微信用户列表 
      <el-tag type="success" class="m-l">总计： {{ total }}人</el-tag>
      <el-tag type="danger" class="m-l">3日活跃比例：{{ activeRatio }}%</el-tag>
    </h2>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>  
    <div class="ope-panel">
      <el-button type="primary" @click="filter=''">全部</el-button>
      <el-button type="success" @click="filter='today'">只看今日</el-button>
      <el-button type="warning" @click="filter='3days'">最近三天</el-button>
    </div>  
    <el-table
        :data="shown"
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
    };
  },
  computed: {
    ...mapState({
      list: state => state.customers.list,
    }),
    shown() {
      return this.list.filter(item => {
        if (!this.filter) return item;
        const m = moment(item.last_login);
        if (this.filter === 'today') {
          return m.isAfter(
            moment()
            .startOf('day')
            .subtract(1, 'seconds')
          );
        }
        if (this.filter === '3days') {
          return m.isAfter(
            moment()
            .startOf('day')
            .subtract(3, 'days')
            .subtract(1, 'seconds')
          );
        }
      });
    },
    activeRatio() {
      if (!this.list.length) return 0;
      const activeList = this.list.filter(item => this.isRecent(item.last_login));
      return Math.floor(activeList.length / this.list.length * 100);
    },
    total() {
      return this.shown.length;
    }
  },
  created() {
    this.$store.dispatch("customer/fetch").catch(e => this.$message.error(e));
  },
  methods: {
    format(t) {
      return moment(t).format('YYYY-MM-DD HH:mm:ss');
    },
    isRecent(time) {
      return moment().startOf('day') - moment(time).startOf('day') <= 86400000 * 3;
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
