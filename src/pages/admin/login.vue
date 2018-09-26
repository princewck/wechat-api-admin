<template>
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span class="title">用户登录</span>
  </div>
  <div class="text item">
    <el-form
      :model="loginForm"
      :rules="rules"
      ref="loginForm"
      label-width="100px"
      class="demo-ruleForm"
      label-position="top"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-form-item class="submit-opera">
        <el-button type="primary" @click="submitForm('loginForm')">登陆</el-button>
      </el-form-item>
      <p class="info-link"><router-link to="/user/register">没有账号？注册一个</router-link></p>
    </el-form>
  </div>
</el-card>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'Register',
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        confirm: '',
      },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, message: '用户名长度至少3个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, message: '密码长度至少6个字符', trigger: 'blur' }
          ],
        }
    };
  },
  computed: {
    ...mapState({
      errors: state => state.user.login.errors,
      token: state => state.user.token,
    })
  },
  beforeMount() {
    if (this.token) {
      this.$router.push('/home');
    }
  },  
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch({
            type: 'login',
            data: this.loginForm,
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  watch: {
    errors(err) {
      if (err) {
        this.$message.error(err);
      }
    },
    token(nV, oV) {
      if (nV) {
        this.$router.push('/home');
      }
    }    
  }
}
</script>

<style lang="scss">
@import '@/styles/mixins.scss';
.box-card {
  .title {
    font-weight: bold;
  }
  .text {
    text-align: left;
  }
  .submit-opera {
    text-align: center;
    border-top: 1px solid #f5f5f5;
    padding-top: 25px;
  }
  .info-link {
    text-align: right;
    font-size: 12px;
    @include links();
  }
}
</style>
