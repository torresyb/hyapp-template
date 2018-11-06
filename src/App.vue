<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {}
  },
  mounted () {
    // 调用jsbrige方法
    // console.log(this.$appInvoked)
  }
}
</script>
