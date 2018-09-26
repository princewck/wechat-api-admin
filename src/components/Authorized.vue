<template>
  <div>
    <div v-if="!authorized">请稍后...</div>
    <slot v-if="authorized"></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      authorized: false,
    }
  },
  created() {
    console.log('ssss');
  },
  mounted() {
    setTimeout(() => {
      console.log('set auth true');
      this.authorized = true;
    }, 1000);
  }
}
</script>

