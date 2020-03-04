<template>
  <div>
    <h2 style="margin-bottom: 15px">自媒体.账号管理</h2>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/selfmedia/accounts">账号列表</a>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <el-row style="margin: 30px 0;">
      <el-col :span="2" :offset="22">
        <el-button
          type="primary"
          icon="el-icon-circle-plus-outline"
          @click="dialogVisible=true,form={}"
        >添加账号</el-button>
      </el-col>
    </el-row>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <el-form
        :model="form"
        :rules="rules"
        ref="form"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone_number">
          <el-input v-model="form.phone_number" placeholder="输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" placeholder="输入密码"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select v-model="form.type">
            <el-option
              v-for="option in optipons"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEdit">确 定</el-button>
      </span>
    </el-dialog>
    <el-table
      class="table"
      :data="list"
      stripe
      style="width: 100%"
      :row-style="{cursor: 'pointer'}"
    >
      <el-table-column label="id" prop="id" width="50"></el-table-column>
      <el-table-column label="用户名" prop="username"></el-table-column>
      <el-table-column label="手机号" prop="phone_number"></el-table-column>
      <el-table-column label="类型">
        <template slot-scope="scope">
          <div v-if="scope.row.type === 'weibo'">微博</div>
          <div v-if="scope.row.type==='toutiao'">头条</div>
        </template>
      </el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">{{ format(scope.row.created_at) }}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row)">修改</el-button>
          <el-button type="danger" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="pagination.current_page"
      :page-size="20"
      layout="total, prev, pager, next"
      :total="pagination.total_count"
    ></el-pagination>
  </div>
</template>

<script>
import moment from "moment";
import { mapState } from "vuex";
export default {
  name: "accounts",
  data() {
    return {
      dialogVisible: false,
      form: {
        username: "",
        password: "",
        phone_number: "",
        type: null
      },
      optipons: [
        {
          value: "weibo",
          label: "微博"
        },
        {
          label: "头条号",
          value: "toutiao"
        },
        {
          label: "百家号",
          value: "baijia"
        }
      ],
      rules: {
        password: [{ required: true, message: "请输入密码" }],
        type: [{required: true, message: '请选择类型'}]
      }
    };
  },
  computed: {
    ...mapState({
      list: state => state.selfmedia.accounts.list,
      pagination: state => state.selfmedia.accounts.pagination
    })
  },
  mounted() {
    this.fetchList(1);
  },
  methods: {
    handleCurrentChange(page) {
      this.fetchList(page);
    },
    fetchList(page = 1) {
      this.$store.dispatch("media/fetchAccounts", { page: 1 });
    },
    format(t) {
      return moment(t).format("YYYY-MM-DD HH:mm");
    },
    submitEdit() {
      this.$refs.form.validate(async valid => {
          try {
            if (!valid) throw new Error('表单校验不通过');
            if (this.form.id) {
              const payload = {...this.form};
              delete payload.id;
              await this.$store.dispatch('media/updateAccount', { id: this.form.id, update: payload });
            } else {
              await this.$store.dispatch('media/createAccount', { payload: this.form });
            }
            this.dialogVisible = false;
            this.fetchList(this.pagination.current_page);
          } catch (e) {
            this.$message.error(e.message);
          }
      })
    },
    edit(row) {
      this.form = {...row};
      this.dialogVisible = true;
    },
    remove(row) {
      this.$confirm('确认删除吗？').then(async () => {
        try {
          await this.$store.dispatch('media/removeAccount', { id: row.id });
          await this.$store.dispatch('media/fetchAccounts');
        } catch (e) {
          this.$message.error(e.message);
        }
      });
    },  
  }
};
</script>

<style>
</style>vue