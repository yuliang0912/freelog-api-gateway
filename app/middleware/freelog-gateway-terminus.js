'use strict'

/**
 * http管道最末端的环节,消除其他中间件需要考虑自己是否是最后一个的顾虑,此处不再调用next函数
 */

module.exports = (option, app) => {

    return async function (ctx, next) {

    }
}