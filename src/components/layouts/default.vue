<template>
<div>
  <authorized>
    <Header/>
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
import Authorized from '../Authorized';
import NavMenu from '../NavMenu';
import Header from '../header';
export default {
  components: { Authorized, NavMenu, Header },
  beforeCreate() {
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixins.scss';
  .content-wrapper {
    position: absolute;
    top: 101px;
    left: 0;
    right: 0;
    bottom: 0;
    @include Flex(row nowrap, flex-start, stretch);
    >.side-bar {
      background: #ddd;
      padding: 5px 0;
    }
    > .content {
      flex: auto;
      padding: 5px;
      background: #ddd;
      @include Flex(column nowrap, flex-start, stretch);
      > div {
        background: #fff;
        height: 100%;
        overflow: auto;
      }
    }
  }
</style>


