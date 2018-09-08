<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style>
  @import './assets/css/login&sign.css';
</style>
<style>
  html,body{
    margin: 0px;
    padding: 0px;
    height: 100%;
    width: 100%;
  }
  #app{
    height: 100%;
    width: 100%
  }
</style>