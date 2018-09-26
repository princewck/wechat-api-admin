<template>
  <div>
    <div v-if="!authorized">请稍后...</div>
    <slot v-if="authorized"></slot>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState({
      token: state => state.user.token,
    }),
    authorized() {
      return !!this.token;
    },
  },
  created() {
    console.log('ssss');
  },
  beforeMount() {
    if (!this.token) {
      this.$router.push('/user/login');
    }    
  },
  watch: {
    token(val) {
      if (!val) {
        this.$router.push('/user/login');
      }
    }
  }
}
</script>

