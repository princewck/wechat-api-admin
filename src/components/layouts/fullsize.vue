<template>
  <div class="wrapper" :style="{'background-image': `url(${bg})`}">
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
import bg from '@/assets/bg.jpg';
export default {
  data() {
    return {
      bg,
    };
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixins.scss';
.wrapper {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: bottom;
  @include Flex(row nowrap, center, center);

  .content {
    width: 380px;
    height: auto;
    position: absolute;
    > div {
      background: rgba(255, 255, 255, .8);
    }
  }
}
</style>

