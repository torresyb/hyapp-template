<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>这是hyapp-ui button组件</h2>
    <Button @hyClick="handleClick" style="color: #ffffff;">hyapp-utils请求</Button>

    <ul>
      <li>
        <a
          href="https://github.com/torresyb/hyapp-template"
          target="_blank"
        >
          hyapp-template
        </a>
      </li>
      <li>
        <a
          href="https://www.npmjs.com/package/hyapp-cli"
          target="_blank"
        >
          hyapp-cli
        </a>
      </li>
      <li>
        <a
          href="https://www.npmjs.com/package/hyapp-utils"
          target="_blank"
        >
          hyapp-utils
        </a>
      </li>
      <li>
        <a
          href="https://www.npmjs.com/package/hyapp-ui"
          target="_blank"
        >
          hyapp-ui
        </a>
      </li>
    </ul>
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
<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>
