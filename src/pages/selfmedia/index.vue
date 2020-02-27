<template>
  <div>
    <h2>自媒体.素材管理 <el-button @click="createPost">创建文章</el-button></h2>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/alimama/categories">文章列表</a></el-breadcrumb-item>
    </el-breadcrumb>         
  </div>
</template>

<script>
export default {
  name: 'selfMedia',
  data() {
    return {

    };
  },
  methods: {
    createPost() {
      this.$router.push('/selfmedia/new/edit');
    }
  },
}
</script>

<style>

</style>