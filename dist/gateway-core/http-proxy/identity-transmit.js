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
let identityTransmit = class identityTransmit {
    transmit(ctx) {
        const identityInfo = ctx.gatewayInfo.identityInfo ?? {};
        if (!lodash_1.isEqual(identityInfo, {}) && lodash_1.isObject(identityInfo)) {
            ctx.headers['auth-token'] = Buffer.from(JSON.stringify(identityInfo)).toString("base64");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWRlbnRpdHktdHJhbnNtaXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZ2F0ZXdheS1jb3JlL2h0dHAtcHJveHkvaWRlbnRpdHktdHJhbnNtaXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsbUNBQTBEO0FBQzFELG1DQUF5QztBQUt6QyxJQUFhLGdCQUFnQixHQUE3QixNQUFhLGdCQUFnQjtJQUV6QixRQUFRLENBQUMsR0FBWTtRQUNqQixNQUFNLFlBQVksR0FBRyxHQUFHLENBQUMsV0FBVyxDQUFDLFlBQVksSUFBSSxFQUFFLENBQUM7UUFDeEQsSUFBSSxDQUFDLGdCQUFPLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxJQUFJLGlCQUFRLENBQUMsWUFBWSxDQUFDLEVBQUU7WUFDdEQsR0FBRyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUE7U0FDM0Y7YUFBTTtZQUNILE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUNwQztJQUVMLENBQUM7Q0FDSixDQUFBO0FBWFksZ0JBQWdCO0lBRjVCLGNBQUssQ0FBQyxrQkFBUyxDQUFDLFNBQVMsQ0FBQztJQUMxQixnQkFBTyxFQUFFO0dBQ0csZ0JBQWdCLENBVzVCO0FBWFksNENBQWdCIn0=