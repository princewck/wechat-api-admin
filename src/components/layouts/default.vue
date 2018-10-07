<template>
<div class="wrapper">
  <authorized>
    <Header :info="info"/>
    <div class="content-wrapper">
      <nav-menu class="side-bar"/>
      <div class="content">
        <router-view/>
      </div>
    </div>
  </authorized>
</div>
</template>

<script>
import { mapState } from 'vuex';
import Authorized from '../Authorized';
import NavMenu from '../NavMenu';
import Header from '../header';
export default {
  components: { Authorized, NavMenu, Header },
  computed: {
    ...mapState({
      info: state => state.user.info,
    })
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixins.scss';
  .wrapper {
    height: 100vh;
    @include Flex(column nowrap, center, stretch);
    > div {
      flex: auto;
      align-items: stretch;
      @include Flex(column nowrap, center, stretch);
    }
  }
  .content-wrapper {
    height: 100%;
    flex: auto;
    @include Flex(row nowrap, flex-start, stretch);
    >.side-bar {
      background: #ddd;
      padding-top: 1px;
    }
    > .content {
      padding: 5px;
      background: #ddd;
      flex: auto;
      @include Flex(column nowrap, flex-start, stretch);
      > div {
        background: #fff;
        height: 100%;
        overflow: auto;
        padding: 15px 25px;
        box-sizing: border-box;
      }
    }
  }
</style>


