const Router = require('koa-router')
const router = new Router()

router.get('/login', (ctx, next) => {
  ctx.body = {
    code: 200,
    data: {username: 'torres', age: 28},
    message: '成功'
  }
})

module.exports = router
