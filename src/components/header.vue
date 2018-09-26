<template>
  <div class="header">
    <div class="user-info">
      <span>{{ info.username }}，</span><a @click="logout">退出登录</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: ['info'],
  methods: {
    logout() {
      this.$store.dispatch('logout');
    }
  }
}
</script>


<style lang="scss" scoped>
@import '@/styles/mixins.scss';
  .header {
    width: 100%;
    height: 100px;
    background: #545c64;
    @include Flex(row nowrap, flex-end, flex-start);
    @include links();
    a {
       font-size: 14px;
       cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
    .user-info {
      color: #fff;
      width: 300px;
      height: 50px;
      line-height: 50px;
    }
  }
</style>
