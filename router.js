const Router = require('koa-router')
const router = new Router()
const util = require('./util')
router.get('/:date', (ctx) => {
    let ret = util.checkBanChi(ctx.params.date)
    ctx.body = ret.message
});

module.exports = router