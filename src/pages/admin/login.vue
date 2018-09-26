<template>
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span class="title">用户登录</span>
  </div>
  <div class="text item">
    <el-form
      :model="registerForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      label-position="top"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="registerForm.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="registerForm.password"></el-input>
      </el-form-item>
      <el-form-item class="submit-opera">
        <el-button type="primary" @click="submitForm('ruleForm2')">登陆</el-button>
      </el-form-item>
      <p class="info-link"><router-link to="/user/register">没有账号？注册一个</router-link></p>
    </el-form>
  </div>
</el-card>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      registerForm: {
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
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
