'use strict'

const codeMsgMap = {
    "ETIMEDOU": "连接已经超时",
    "ESOCKETTIMEDOUT": "连接已经超时",
    "ECONNREFUSED": "不能连接到目标服务器",
    "HTTPSTATUSCODEERROR": "源服务器错误,[状态码]"
}

module.exports = (ctx, error) => {

    const {code, statusCode} = error

    var msg = "服务器错误"

    if (Reflect.has(codeMsgMap, code)) {
        msg += codeMsgMap[code]
    }
    else {
        msg += ",[状态码]:" + statusCode
    }
    if (code === "HTTPSTATUSCODEERROR") {
        msg += ":" + statusCode
    }
    msg += ",[错误详情]:" + error.toString()

    ctx.status = statusCode || 404
    ctx.error({msg, errCode: 26, retCode: 5})
}
