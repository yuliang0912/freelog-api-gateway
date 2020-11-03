import {scope, provide, ScopeEnum} from 'midway';
import {isArray, isEmpty, trim, trimEnd} from 'lodash';
import {IGatewayMatchService, RouterInfo} from "../../interface";

@provide()
@scope(ScopeEnum.Singleton)
export class GatewayMatchService implements IGatewayMatchService {

    readonly customParamRegExp = /^:[a-zA-Z0-9_]{1,100}$/;

    /**
     * 从路由分组中匹配出最佳路由信息
     * @param routerList
     * @param urlPath
     * @param httpMethod
     */
    matchRouter(routerList: RouterInfo[], urlPath: string, httpMethod: string): RouterInfo {

        if (!isArray(routerList) || isEmpty(routerList)) {
            return null;
        }

        const maxSatisfyingRouter = {routerId: null, score: 0};
        const urlPathSchemes = trim(urlPath, '/').split('/');

        for (const router of routerList) {
            const routerSchemes = trim(router.routerUrlRule, '/').split('/');
            if (urlPathSchemes.length < routerSchemes.length) {
                continue;
            }
            let matchScore = 0;
            router.routerSchemes = [""];
            router.customParamsMap = new Map();
            for (let i = 0, j = routerSchemes.length; i < j; i++) {
                if (routerSchemes[i].toLowerCase() === urlPathSchemes[i].toLowerCase()) {
                    matchScore += 10;
                    router.routerSchemes.push(routerSchemes[i]);
                } else if (this.customParamRegExp.test(routerSchemes[i])) {
                    matchScore += 8;
                    router.routerSchemes.push(urlPathSchemes[i]);
                    router.customParamsMap.set(routerSchemes[i].substring(1), urlPathSchemes[i]);
                } else {
                    matchScore = 0;
                    break
                }
            }
            //method完全匹配比ALL匹配分值更高
            if (matchScore > 0 && router.httpMethod.includes(httpMethod)) {
                matchScore += 1
            }
            if (matchScore > maxSatisfyingRouter.score) {
                maxSatisfyingRouter.routerId = router.routerId;
                maxSatisfyingRouter.score = matchScore;
            }
        }

        return maxSatisfyingRouter.routerId ? routerList.find(x => x.routerId === maxSatisfyingRouter.routerId) : null;
    }

    /**
     * 生成上游URL地址
     * @param routerInfo
     * @param url
     */
    generateUpstreamRouterUrl(routerInfo: RouterInfo, url: string): string {

        const {forwardUriScheme} = routerInfo.upstream
        const upstreamRouterUrl = forwardUriScheme.split('/').map(segment => {
            if (!this.customParamRegExp.test(segment)) {
                return segment;
            }
            const paramName = segment.substring(1);
            return routerInfo?.customParamsMap.get(paramName) ?? '';
        }).join("/");

        return url.replace(new RegExp(trimEnd(routerInfo?.routerSchemes.join('/'), '/'), "i"), trimEnd(upstreamRouterUrl, '/'));
    }
}