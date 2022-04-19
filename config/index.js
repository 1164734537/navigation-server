/* 
 * 配置文件
*/
const key = 'czh:123456' // 数据库账号密码
const url = `mongodb://${key}@159.75.248.80` //设置链接
const host = '27017' // 设置端口号（默认）
const dbName = 'navigation' // 连接的数据库
module.exports = {
    URL: `${url}:${host}/${dbName}`
}