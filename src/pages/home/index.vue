<template>
  <div class="hello">
    <img src="../../assets/images/logo.png"/>
    <h1>{{ msg }}</h1>
    <h2>这是hyapp-ui button组件</h2>
    <Button @hyClick="handleClick" class="my-button">hyapp-utils请求</Button>
    <div class="tabs ignore hy-1px-b">
      <a
        href="https://github.com/torresyb/hyapp-template"
        target="_blank"
      >
        hyapp-template
      </a>
      <a
        href="https://www.npmjs.com/package/hyapp-cli"
        target="_blank"
      >
        hyapp-cli
      </a>
      <a
        href="https://www.npmjs.com/package/hyapp-utils"
        target="_blank"
      >
        hyapp-utils
      </a>
      <a
        href="https://www.npmjs.com/package/hyapp-ui"
        target="_blank"
      >
        hyapp-ui
      </a>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
  name: 'hyapp-template',
  data () {
    return {
      msg: 'Welcome to Your hyapp-template App'
    }
  },
  computed: {
    ...mapGetters(['getUserInfo'])
  },
  methods: {
    ...mapActions(['getUserInfoHandle']),
    handleClick () {
      this.getUserInfoHandle()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this components only -->
<style lang="scss" scoped>
  h1, h2 {
    font-weight: normal;
  }
  .tabs{
    display: flex;
    &.ignore{
      margin-top: 10px;
    }
    a {
      width: 187.5px;
      color: #42b983;
    }
  }
  .my-button{
    width: 100%;
  }
  .hello{
    text-align: center;
    padding: 0 30px;
  }
</style>
