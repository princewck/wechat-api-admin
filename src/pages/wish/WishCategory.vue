<template>
<div>
    <h2>送祝福.分类管理<el-button @click="add" type="success" class="pull-right">添加</el-button></h2>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>送祝福小程序</el-breadcrumb-item>
      <el-breadcrumb-item>分类管理</el-breadcrumb-item>
    </el-breadcrumb>   
    <el-table
        :data="list"
        stripe
        style="width: 100%"
        :header-cell-style="{'text-align': 'center'}"
      >
      <el-table-column prop="id" label="ID"/>
      <el-table-column prop="name" label="分类"/>
      <el-table-column prop="description" label="描述"/>
      <el-table-column prop="status" label="状态"/>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="update(scope.row)">修改</el-button>
          <el-button type="danger" @click="del(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table> 


    <el-dialog width="400px" :title="form.id ? '修改分类' : '添加分类'" :visible.sync="edit">
      <el-form :model="form">
        <el-form-item label="名称" label-width="100px">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" label-width="100px">
          <el-input v-model="form.description" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" label-width="100px">
          <el-select v-model="form.status" placeholder="请选择状态">
            <el-option label="可用" :value="1"></el-option>
            <el-option label="禁用" :value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="edit = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>

</div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "WishCategory",
  data() {
    return {
      edit: false,
      form: {}
    };
  },
  computed: {
    ...mapState({
      list: state => state.wish.category.list
    })
  },
  created() {
    this.$store.dispatch("wish/fetchCategories");
  },
  methods: {
    update(row) {
      this.edit = true;
      this.form = { ...row };
    },
    async del(row) {
      await this.$confirm("此操作将永久删除该分类, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      });
      try {
        await this.$store.dispatch("wish/deleteCategory", row);
        await this.$store.dispatch("wish/fetchCategories");
      } catch (e) {
        this.$message.error(e.message);
      }
    },
    add() {
      this.edit = true;
      this.form = {};
    },
    async onSubmit() {
      try {
        await this.$store.dispatch("wish/editCategory", this.form);
        this.edit = false;
        await this.$store.dispatch("wish/fetchCategories");
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
  height: 50px;
}
</style>

