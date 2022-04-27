const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const routers = require('./routers/index')
const log4js = require('./utils/log4j')
const cors = require('koa2-cors');

// 跨域
app.use(cors({
  origin: function(ctx) { // 设置允许来自指定域名请求
    const whiteList = ['https://www.hangbb.cn', 'http://localhost:8080', 'http://localhost:8081']; //可跨域白名单
    let url = ctx.header.referer.substring(0,ctx.header.referer.length - 1);
    if(whiteList.includes(url)){
      return url // 注意，这里域名末尾不能带/, 否则不成功，所以我在之前把 / 干掉
    }
    return 'http://localhost:8080' // 默认允许本地请求8080端口可跨域
  }
}))

// error handler
onerror(app)

// 连接数据库
require('./config/db')
// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  log4js.info(`get params:${JSON.stringify(ctx.request)}`)
  log4js.info(`post params:${JSON.stringify(ctx.body)}`)
  await next()
  .catch((err)=>{
    console.log(err.status)
  })
})

// routes
app.use(routers.routes()).use(routers.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  // console.error('server error', err, ctx)
  log4js.error(`${err.status}`)
});

module.exports = app
