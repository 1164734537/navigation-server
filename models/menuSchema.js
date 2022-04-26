const mongoose = require('mongoose');
const menuSchema = mongoose.Schema({
    name: String, //菜单名称
    en_name: String, // 菜单英文名称
    icon: String, //菜单图标
    "web": {
        type: Array,
        default: null
    },
    "createTime" : { // 创建时间
        type: Date,
        default: Date.now()
    },
    "lastEditTime": {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('menus',menuSchema,'menus')