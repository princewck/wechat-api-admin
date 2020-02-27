<template>
  <div class="nav-menu">
    <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group> -->

    <!-- <div @click="toggleCollapse"><i :class="isCollapse ? 'el-icon-arrow-right' : 'el-icon-arrow-left'"/></div> -->
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      @select="onMenuSelect"
      :collapse="isCollapse"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="/users">
        <i class="el-icon-setting"></i>
        <span slot="title">用户列表</span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>祝福语小程序</span>
        </template>
        <el-menu-item index="/wish/categroy">分组管理</el-menu-item>        
        <el-menu-item index="/wish/thread">文章管理</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>文件管理</span>
        </template>
        <el-menu-item index="/assets">文件列表</el-menu-item>        
      </el-submenu>      
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>积分商品管理</span>
        </template>
        <el-menu-item index="/work_product/categroy">分类列表</el-menu-item>        
        <el-menu-item index="/work_product/product">商品列表</el-menu-item>        
      </el-submenu>      
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>阿里妈妈</span>
        </template>
        <el-menu-item index="/tbk/categories">商品列表</el-menu-item>
        <el-menu-item index="/alimama/xpk">选品列表</el-menu-item>
      </el-submenu>      
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>自媒体</span>
        </template>
        <el-menu-item index="/selfmedia/list">文章列表</el-menu-item>
        <el-menu-item index="/alimama/xpk">任务列表</el-menu-item>
      </el-submenu>      
    </el-menu>
  </div>
</template>


<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>

<script>
  export default {
    data() {
      return {
        isCollapse: false
      };
    },
    methods: {
      toggleCollapse() {
        this.isCollapse = !this.isCollapse;
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      onMenuSelect(index) {
        this.$router.push(index);
      }
    }
  }
</script>


<style lang="scss" scoped>
@import '../styles/mixins.scss';
.nav-menu {
  @include Flex(column nowrap, center, stretch);
  position: relative;
  > ul {
    flex: auto;
    overflow: hidden;
  }
  > div {
    @include Flex(column nowrap, center, center);
    color: #fff;
    cursor: pointer;
    background: #444;
    border-right: solid 1px #e6e6e6;
    height: 25px;
  }
}
</style>
