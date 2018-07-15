const Router = require('koa-router')
const router = new Router()
const util = require('./util')
router.get('/check/:date', (ctx) => {
    let date = ctx.params.date
    if (date.length === 8) {
        let ret = util.checkBanChi(date.substr(0, 4) + '-' + date.substr(4, 2) + '-' + date.substr(6, 2))
        ctx.body = '<i style="font-size: 35px;font-style: normal">' + ret.message +'</i>'
    } else {
        ctx.body = '<i style="font-size: 35px;font-style: normal">参数格式错误，请检查</i>'
    }

});

module.exports = router