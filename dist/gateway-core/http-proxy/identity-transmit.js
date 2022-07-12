"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.identityTransmit = void 0;
const midway_1 = require("midway");
const lodash_1 = require("lodash");
const egg_freelog_base_1 = require("egg-freelog-base");
let identityTransmit = class identityTransmit {
    transmit(ctx) {
        const identityInfo = ctx.gatewayInfo.identityInfo ?? {};
        if (identityInfo.userInfo?.status === 1) {
            throw new egg_freelog_base_1.GatewayUserFreezeError('用户已被冻结,无法访问');
        }
        if (!lodash_1.isEqual(identityInfo, {}) && lodash_1.isObject(identityInfo)) {
            ctx.headers['auth-token'] = Buffer.from(JSON.stringify(identityInfo)).toString('base64');
        }
        else {
            delete ctx.headers['auth-token'];
        }
    }
};
identityTransmit = __decorate([
    midway_1.scope(midway_1.ScopeEnum.Singleton),
    midway_1.provide()
], identityTransmit);
exports.identityTransmit = identityTransmit;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWRlbnRpdHktdHJhbnNtaXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZ2F0ZXdheS1jb3JlL2h0dHAtcHJveHkvaWRlbnRpdHktdHJhbnNtaXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsbUNBQWlEO0FBQ2pELG1DQUF5QztBQUV6Qyx1REFBd0U7QUFJeEUsSUFBYSxnQkFBZ0IsR0FBN0IsTUFBYSxnQkFBZ0I7SUFFekIsUUFBUSxDQUFDLEdBQW1CO1FBQ3hCLE1BQU0sWUFBWSxHQUFHLEdBQUcsQ0FBQyxXQUFXLENBQUMsWUFBWSxJQUFJLEVBQUUsQ0FBQztRQUN4RCxJQUFJLFlBQVksQ0FBQyxRQUFRLEVBQUUsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUNyQyxNQUFNLElBQUkseUNBQXNCLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDbkQ7UUFDRCxJQUFJLENBQUMsZ0JBQU8sQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLElBQUksaUJBQVEsQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUN0RCxHQUFHLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUM1RjthQUFNO1lBQ0gsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ3BDO0lBQ0wsQ0FBQztDQUNKLENBQUE7QUFiWSxnQkFBZ0I7SUFGNUIsY0FBSyxDQUFDLGtCQUFTLENBQUMsU0FBUyxDQUFDO0lBQzFCLGdCQUFPLEVBQUU7R0FDRyxnQkFBZ0IsQ0FhNUI7QUFiWSw0Q0FBZ0IifQ==