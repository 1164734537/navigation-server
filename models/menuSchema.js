const mongoose = require('mongoose');
const menuSchema = mongoose.Schema({
    "name": String,
    "en_name": String,
    "icon": String,
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