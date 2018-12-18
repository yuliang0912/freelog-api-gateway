'use strict'

const lodash = require('lodash')

module.exports = class GatewayUrlRouterMatch {

    constructor(app) {
        this.serverGroupProvider = app.dal.serverGroupProvider
    }

    /**
     * 获取上游路由信息
     * @param routerList
     */
    async matchRouterInfo(routerList, path) {

        if (!path.endsWith('/')) {
            path = path + '/'
        }

        if (!routerList.length) {
            return null
        }

        const matchRouterInfo = lodash.chain(routerList).map(router => this._getRouterMatchScore(router.toObject(), path)).orderBy('matchScore', 'desc').first().value()

        return matchRouterInfo.matchScore <= 0 ? null : matchRouterInfo
    }

    /**
     * 获取上游服务器路由信息
     */
    async getUpstreamInfo(routerInfo, url) {

        const {upstream} = routerInfo
        upstream.forwardUri = this._getUpstreamRouterUrl(routerInfo, url)
        upstream.serverGroupInfo = await this.serverGroupProvider.findById(upstream.serverGroupId)

        return routerInfo
    }

    /**
     * 计算路由匹配分值
     */
    _getRouterMatchScore(router, urlPath) {

        let matchScore = 0
        const regExp = /^\${(\d+)}$/
        const routerSchemes = router.routerUrlRule.toLowerCase().split('/')
        const urlPathSchemes = urlPath.split('/')

        if (urlPathSchemes.length < routerSchemes.length) {
            router.matchScore = 0
            return router
        }

        const routerUrl = [], regMatchValues = []
        for (let i = 0, j = routerSchemes.length; i < j; i++) {

            const isRegExpMatch = regExp.test(routerSchemes[i])
            const regIndex = isRegExpMatch ? parseInt(RegExp.$1) : -1
            const expStr = isRegExpMatch ? router.routerRegExp[regIndex] : null

            if (isRegExpMatch && new RegExp(expStr).test(urlPathSchemes[i])) {
                matchScore += 0.99
                routerUrl.push(urlPathSchemes[i])
                regMatchValues.push(urlPathSchemes[i])
                continue
            }
            else if (isRegExpMatch) {
                matchScore = 0
                break
            }
            else if (routerSchemes[i] === urlPathSchemes[i]) {
                matchScore += 1
                routerUrl.push(routerSchemes[i])
                continue
            }
            else {
                matchScore = 0
                break
            }
        }
        router.matchScore = matchScore
        router.routerUrl = routerUrl.join("/")
        router.regExpMatchValues = regMatchValues

        return router
    }

    /**
     * 获取上游路由URL
     */
    _getUpstreamRouterUrl(routerInfo, url) {
        const {forwardUriScheme} = routerInfo.upstream
        const upstreamRouterUrl = forwardUriScheme.split('/').map(segment => {
            if (/^\${{(\d+)}}$/.test(segment)) {
                return routerInfo.regExpMatchValues[parseInt(RegExp.$1)]
            } else {
                return segment
            }
        }).join("/")

        return url.replace(new RegExp(this._trimEnd(routerInfo.routerUrl, '/'), "i"), this._trimEnd(upstreamRouterUrl, '/'))
    }

    /**
     * trim字符串
     */
    _trimEnd(str, trimStr) {
        if (!trimStr) {
            return str;
        }
        var temp = str;
        while (true) {
            if (temp.substr(temp.length - trimStr.length, trimStr.length) != trimStr) {
                break;
            }
            temp = temp.substr(0, temp.length - trimStr.length);
        }
        return temp;
    }
}