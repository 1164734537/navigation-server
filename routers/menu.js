const router = require('koa-router')()
const Menu = require('./../models/menuSchema')
const util = require('./../utils/util')
const routers = router
.get('/list', async (ctx)=>{
    // ctx.set("Content-Type", "application/json")
    try {
       const menulist =  await Menu.find()
        // 后端处理数据
       ctx.body = util.success(menulist)
    } catch (error) {
        ctx.body = util.fail(error.msg)
    }
    // ctx.body ='menulist'
})

module.exports = routers