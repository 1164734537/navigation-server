const router = require('koa-router')();

router.prefix("/api")

const menu = require('./menu')

router.use('/menu', menu.routes(), menu.allowedMethods())


module.exports = router