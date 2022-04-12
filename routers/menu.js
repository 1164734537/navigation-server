const router = require('koa-router')()

const routers = router
.get('/list', async (ctx)=>{
    ctx.body ='menulist'
})

module.exports = routers