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
app.use(cors())

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
