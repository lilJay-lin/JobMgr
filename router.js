const Router = require('koa-router')
const router = new Router()
const util = require('./util')
router.get('/:date', (ctx) => {
    let ret = util.checkBanChi(ctx.params.date)
    ctx.body = '<i style="font-size: 2rem;font-style: normal">' + ret.message +'</i>'
});

module.exports = router