/**
 * Created by liljay on 2018/7/15.
 */
const start = new Date('2018-07-02')
function checkBanChi (datastr) {
    // 我的班3n + 1
    let changeDate = new Date(datastr)
    let setDate = new Date(datastr)
    var dur = parseInt((changeDate - start) / 24 / 60 / 60 / 1000)
    changeDate.setDate(changeDate.getDate() - dur % 6)
    var changeDur = parseInt((setDate - changeDate) / 24 / 60 / 60 / 1000)
    // status: 0 无班， 1有班， 2 有班，交接班
    var ret = {message: '', status: 1, ban: '', date: datastr}
    if (changeDur === 3 || changeDur === 0) {
        ret.status = 2
        ret.message = '注意！！当天(' + datastr + ')是交接班 <br\> '
    } else if (changeDur > 3) {
        ret.status = 0
        ret.message = '今日无班,离上班还有：' + (6 - changeDur) + '天'
        console.log(ret.message)
        return ret
    }
    // console.log('交接班日期:' + changeDate.getFullYear() + '-' + (changeDate.getMonth() + 1) + '-' + changeDate.getDate())
    // console.log('交接班当天班次：' + getBanChi(parseInt(dur / 6) * 13))
    ret.ban = getBanChi(ret.status, parseInt(dur / 6) * 13 + changeDur * 4)
    ret.message += '当天(' + datastr + ')班次：'  + (changeDur > 3 ?  '今天无班' : ret.ban)
    console.log(ret.message)
    return ret
}

var tips = ['早班', '中班', '晚班', '夜班']
function getBanChi (status, dur) {
    // 3n + 1才是我的班次
    let r = dur % 3
    let danban = 0
    if (r === 0) {
        danban = 0
    } else if (r === 1) {
        danban = 2
    } else if (r === 2) {
        danban = 1
    }
    return tips[danban] + (danban === 0 && status !== 2 ? ' ' + tips[3] : '')
}

function padd (num) {
    num = parseInt(num)
    return num < 10 ? '0' + num : num
}
module.exports = {
    checkBanChi,
    padd
}