/**
 * Created by liljay on 2018/7/15.
 */
'use strict'
const co = require('co')
const schedule = require("node-schedule")
const nodemailer = require('nodemailer');
const koa = require('koa')
const app = new koa()
const router = require('./router')
const util = require('./util')
var sendEmail = function(email, content, title, type){
    return new Promise(function(resolve){
        // 开启一个 SMTP 连接池
        var nodemailer = require('nodemailer');
        var transporter = nodemailer.createTransport({
            //https://github.com/andris9/nodemailer-wellknown#supported-services 支持列表
            service: 'qq',
            port: 465, // SMTP 端口
            secureConnection: true, // 使用 SSL
            auth: {
                user: '286096780@qq.com',
                //这里密码不是qq密码，是你设置的smtp密码
                pass: 'fmjdfaytebxkbhif'
            }
        });
// NB! No need to recreate the transporter object. You can use
// the same transporter object for all e-mails

// setup e-mail data with unicode symbols
        var mailOptions = {
            from: '286096780@qq.com', // 发件地址
            to: email, // 收件列表
            subject: title === undefined ?  '提示' : title, // 标题
            // text:content
            //text和html两者只支持一种
            //text: content, // 标题
        };
        type === 'html' ? mailOptions.html = content : mailOptions.text = content;
// send mail with defined transport object
        resolve(true)
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                mongodb.collection('email').insertOne({
                    createtime:new Date(),
                    email:email,
                    content:content,
                    error:error
                })
            }
            else{
                mongodb.collection('email').insertOne({
                    createtime:new Date(),
                    email:email,
                    content:content
                })
            }

        });
    })
}

// 提前提醒
schedule.scheduleJob('00 00 13 * * *', function () {
    var date = new Date()
    date.setDate(date.getDate() + 1)
    var ret = util.checkBanChi(date.getFullYear() + '-' + (util.padd(date.getMonth() + 1)) + '-' + util.padd(date.getDate()))
    if (ret.status !== 0) {
        sendEmail('lin_xjie@foxmail.com', '明天(' + ret.date + ')班次:' + ret.ban, '明天班次提醒')
    }
})

// 当天提醒
function checkToday () {
    let date = new Date()
    return util.checkBanChi(date.getFullYear() + '-' + (util.padd(date.getMonth() + 1)) + '-' + util.padd(date.getDate()))
}

schedule.scheduleJob('00 30 23 * * *', function () {
    let ret = checkToday()
    if (ret.ban.indexOf('早班') > -1) {
        sendEmail('lin_xjie@foxmail.com', '今天(' + ret.date + ')班次:' + ret.ban, '上班提醒')
    }
})
schedule.scheduleJob('00 00 3 * * *', function () {
    let ret = checkToday()
    if (ret.ban.indexOf('中班') > -1) {
        sendEmail('lin_xjie@foxmail.com', '今天(' + ret.date + ')班次:' + ret.ban, '上班提醒')
    }
})
schedule.scheduleJob('00 00 9 * * *', function () {
    let ret = checkToday()
    if (ret.ban.indexOf('晚班') > -1) {
        sendEmail('lin_xjie@foxmail.com', '今天(' + ret.date + ')班次:' + ret.ban, '上班提醒')
    }
})
schedule.scheduleJob('00 00 10 * * *', function () {
    let ret = checkToday()
    if (ret.ban.indexOf('夜班') > -1) {
        sendEmail('lin_xjie@foxmail.com', '今天(' + ret.date + ')班次:' + ret.ban, '上班提醒')
    }
})

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);

app.on('error', (err, ctx) => {
    ctx.body = 'server error'
    console.error('server error', err, ctx)
})