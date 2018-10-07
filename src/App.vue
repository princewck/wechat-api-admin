<template>
  <div id="app">
     <router-view/>
  </div>
</template>

<script>
import NavMenu from './components/NavMenu';
export default {
  name: 'App',
  components: {NavMenu},
}
</script>

<style lang="scss">
body, html {
  height: 100%;
  margin: 0;
}

.el-select {
  width: 100%;
}

.pull-right {
  float: right;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
</style>
