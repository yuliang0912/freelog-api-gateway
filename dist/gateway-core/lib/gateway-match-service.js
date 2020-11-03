"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GatewayMatchService = void 0;
const midway_1 = require("midway");
const lodash_1 = require("lodash");
let GatewayMatchService = class GatewayMatchService {
    constructor() {
        this.customParamRegExp = /^:[a-zA-Z0-9_]{1,100}$/;
    }
    /**
     * 从路由分组中匹配出最佳路由信息
     * @param routerList
     * @param urlPath
     * @param httpMethod
     */
    matchRouter(routerList, urlPath, httpMethod) {
        if (!lodash_1.isArray(routerList) || lodash_1.isEmpty(routerList)) {
            return null;
        }
        const maxSatisfyingRouter = { routerId: null, score: 0 };
        const urlPathSchemes = lodash_1.trim(urlPath, '/').split('/');
        for (const router of routerList) {
            const routerSchemes = lodash_1.trim(router.routerUrlRule, '/').split('/');
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
                }
                else if (this.customParamRegExp.test(routerSchemes[i])) {
                    matchScore += 8;
                    router.routerSchemes.push(urlPathSchemes[i]);
                    router.customParamsMap.set(routerSchemes[i].substring(1), urlPathSchemes[i]);
                }
                else {
                    matchScore = 0;
                    break;
                }
            }
            //method完全匹配比ALL匹配分值更高
            if (matchScore > 0 && router.httpMethod.includes(httpMethod)) {
                matchScore += 1;
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
    generateUpstreamRouterUrl(routerInfo, url) {
        const { forwardUriScheme } = routerInfo.upstream;
        const upstreamRouterUrl = forwardUriScheme.split('/').map(segment => {
            if (!this.customParamRegExp.test(segment)) {
                return segment;
            }
            const paramName = segment.substring(1);
            return routerInfo?.customParamsMap.get(paramName) ?? '';
        }).join("/");
        return url.replace(new RegExp(lodash_1.trimEnd(routerInfo?.routerSchemes.join('/'), '/'), "i"), lodash_1.trimEnd(upstreamRouterUrl, '/'));
    }
};
GatewayMatchService = __decorate([
    midway_1.provide(),
    midway_1.scope(midway_1.ScopeEnum.Singleton)
], GatewayMatchService);
exports.GatewayMatchService = GatewayMatchService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2F0ZXdheS1tYXRjaC1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2dhdGV3YXktY29yZS9saWIvZ2F0ZXdheS1tYXRjaC1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLG1DQUFpRDtBQUNqRCxtQ0FBdUQ7QUFLdkQsSUFBYSxtQkFBbUIsR0FBaEMsTUFBYSxtQkFBbUI7SUFBaEM7UUFFYSxzQkFBaUIsR0FBRyx3QkFBd0IsQ0FBQztJQXFFMUQsQ0FBQztJQW5FRzs7Ozs7T0FLRztJQUNILFdBQVcsQ0FBQyxVQUF3QixFQUFFLE9BQWUsRUFBRSxVQUFrQjtRQUVyRSxJQUFJLENBQUMsZ0JBQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxnQkFBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQzdDLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFFRCxNQUFNLG1CQUFtQixHQUFHLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFDLENBQUM7UUFDdkQsTUFBTSxjQUFjLEdBQUcsYUFBSSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFckQsS0FBSyxNQUFNLE1BQU0sSUFBSSxVQUFVLEVBQUU7WUFDN0IsTUFBTSxhQUFhLEdBQUcsYUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2pFLElBQUksY0FBYyxDQUFDLE1BQU0sR0FBRyxhQUFhLENBQUMsTUFBTSxFQUFFO2dCQUM5QyxTQUFTO2FBQ1o7WUFDRCxJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUM7WUFDbkIsTUFBTSxDQUFDLGFBQWEsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzVCLE1BQU0sQ0FBQyxlQUFlLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUNuQyxL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