<template>
  <div>
    <h2>
      文件管理
      <el-button class="pull-right" type="primary" @click="onCreate">上传文件</el-button>
    </h2>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">文件管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>文件列表</el-breadcrumb-item>
    </el-breadcrumb>    
    <el-table
        :data="list"
        stripe
        style="width: 100%"
      >   
        <el-table-column
          prop="id"
          label="id">
        </el-table-column>
        <el-table-column
          prop="name"
          label="名称">
          <template slot-scope="scope">
            <a :href="scope.row.value" target="_blank">{{ scope.row.name }}</a>
          </template>
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型">
        </el-table-column>    
        <el-table-column
          prop="description"
          label="描述">
        </el-table-column>   
        <el-table-column
          prop="created_at"
          label="创建时间"
          width="170"
        >
          <template slot-scope="scope">
            {{ format(scope.row.created_at) }}
          </template>          
        </el-table-column>        
        <el-table-column
          prop="updated_at"
          label="最近更新"
          width="170"
        >
          <template slot-scope="scope">
            {{ format(scope.row.updated_at) }}
          </template>          
        </el-table-column> 
        <el-table-column width="150px">
          <template slot-scope="scope">
            <el-button type="primary" @click="onUpdate(scope.row)" plain>编辑</el-button>
            <el-button type="danger" @click="onRemove(scope.row)" plain>删除</el-button>
          </template>
        </el-table-column>
      </el-table>     
      <Uploader 
        :visible="visible" 
        :info="info"
        @onToggle="toggleVisible"
        @onSubmit="onSubmit"
      />
  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from 'moment';
import Uploader from '@/components/uploader';

export default {
  name: "Users",
  data() {
    return {
      visible: false,
      info: {},
      uploaded: null,
    };
  },
  components: {
    Uploader,
  },
  computed: {
    ...mapState({
      list: state => state.assets.list,
    }),
  },
  created() {
    this.$store.dispatch("assets/fetch").catch(e => this.$message.error(e));
  },
  methods: {
    format(t) {
      const m = moment(t).format('YYYY-MM-DD HH:mm:ss');
      return moment(t).isValid() ? m : null;
    },
    onCreate() {
      this.visible = true;
      this.info = {};
    },
    toggleVisible(visible) {
      this.visible = !!visible;
    },
    async onSubmit (data) {
      if (data.id) {
        await this.$store.dispatch('assets/update', data);
      } else {
        await this.$store.dispatch('assets/create', data);
      }
      this.visible = false;
    },
    async onUpdate(row) {
      this.visible = true;
      this.info = {...row};
    },
    async onRemove(row) {
      await this.$confirm('确定删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      });
      try {
        this.$store.dispatch('assets/delete', row);
      } catch (e) {
        this.$message.error(e.message);
      }
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
