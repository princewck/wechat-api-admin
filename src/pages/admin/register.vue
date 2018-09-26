<template>
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span class="title">用户注册</span>
  </div>
  <div class="text item">
    <el-form
      :model="registerForm"
      :rules="rules"
      ref="registerForm"
      label-width="100px"
      class="demo-ruleForm"
      label-position="top"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="registerForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="registerForm.password"></el-input>
      </el-form-item>
      <el-form-item label="重复密码" prop="confirm">
        <el-input v-model="registerForm.confirm"></el-input>
      </el-form-item>
      <el-form-item class="submit-opera">
        <el-button type="primary" @click="submitForm('registerForm')">注册</el-button>
        <el-button @click="resetForm('ruleForm2')">重置</el-button>
      </el-form-item>
      <p class="info-link"><router-link to="/user/login">已有账号？直接登陆</router-link></p>
    </el-form>
  </div>
</el-card>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'Register',
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      registerForm: {
        username: '',
        password: '',
        confirm: '',
      },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, message: '用户名长度至少3个字符', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请设置密码', trigger: 'blur' },
            { min: 6, message: '密码长度至少6个字符', trigger: 'blur' }
          ],
          confirm: [
            { required: true, message: '请确认密码', trigger: 'blur' },
            { validator: validatePass2, trigger: 'blur' },
          ]
        }
    };
  },
  computed: {
    ...mapState({
      registerError: state => state.user.register.errors,
      token: state => state.user.token,
    })
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch({
            type: 'register',
            data: this.registerForm,
          });
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
  beforeMount() {
    if (this.token) {
      this.$router.push('/home');
    }
  },
  watch: {
    registerForm() {
      console.log('reset form');
      this.$store.dispatch('user/resetRegister')
    },
    registerError(error) {
      if (error) {
        this.$message.error(error);
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


