"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ApiRouter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiRouter = void 0;
const lodash_1 = require("lodash");
const midway_1 = require("midway");
const mongoose_model_base_1 = require("./mongoose-model-base");
let ApiRouter = ApiRouter_1 = class ApiRouter extends mongoose_model_base_1.MongooseModelBase {
    buildMongooseModel() {
        const ApiRouterConfigSchema = new this.mongoose.Schema({
            routerPrefix: { type: String, required: true },
            routerUrlRule: { type: String, required: true },
            upstream: {
                serverGroupName: { type: String, required: true },
                protocol: { type: String, default: 'http', required: true },
                port: { type: Number, required: true },
                forwardUriScheme: { type: String, required: true },
                method: { type: String, default: null } //为空,则与请求的method相同
            },
            httpMethod: {
                type: [String],
                required: true
            },
            httpComponentRuleIds: [],
            mockStatus: { type: Number, default: 0, enum: [0, 1], required: true },
            status: { type: Number, default: 1, enum: [0, 1], required: true },
        }, {
            versionKey: false,
            toJSON: ApiRouter_1.toObjectOptions,
            toObject: ApiRouter_1.toObjectOptions,
            timestamps: { createdAt: 'createDate', updatedAt: 'updateDate' }
        });
        ApiRouterConfigSchema.index({ routerPrefix: 1, httpMethod: 1, status: 1 });
        ApiRouterConfigSchema.virtual('routerId').get(function () {
            return this.id;
        });
        return this.mongoose.model('api-router-config', ApiRouterConfigSchema);
    }
    static get toObjectOptions() {
        return {
            getters: true,
            virtuals: true,
            transform(doc, ret, options) {
                return Object.assign({ routerId: doc.id }, lodash_1.omit(ret, ['_id']));
            }
        };
    }
};
ApiRouter = ApiRouter_1 = __decorate([
    midway_1.scope(midway_1.ScopeEnum.Singleton),
    midway_1.provide('model.ApiRouter')
], ApiRouter);
exports.ApiRouter = ApiRouter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLXJvdXRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2RlbC9hcGktcm91dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxtQ0FBNEI7QUFDNUIsbUNBQWlEO0FBQ2pELCtEQUE0RTtBQUk1RSxJQUFhLFNBQVMsaUJBQXRCLE1BQWEsU0FBVSxTQUFRLHVDQUFpQjtJQUU1QyxrQkFBa0I7UUFFZCxNQUFNLHFCQUFxQixHQUFHLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7WUFDbkQsWUFBWSxFQUFFLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFDO1lBQzVDLGFBQWEsRUFBRSxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBQztZQUM3QyxRQUFRLEVBQUU7Z0JBQ04sZUFBZSxFQUFFLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFDO2dCQUMvQyxRQUFRLEVBQUUsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBQztnQkFDekQsSUFBSSxFQUFFLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFDO2dCQUNwQyxnQkFBZ0IsRUFBRSxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBQztnQkFDaEQsTUFBTSxFQUFFLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFDLENBQUMsa0JBQWtCO2FBQzNEO1lBQ0QsVUFBVSxFQUFFO2dCQUNSLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQztnQkFDZCxRQUFRLEVBQUUsSUFBSTthQUNqQjtZQUNELG9CQUFvQixFQUFFLEVBQUU7WUFDeEIsVUFBVSxFQUFFLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFDO1lBQ3BFLE1BQU0sRUFBRSxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBQztTQUNuRSxFQUFFO1lBQ0MsVUFBVSxFQUFFLEtBQUs7WUFDakIsTUFBTSxFQUFFLFdBQVMsQ0FBQyxlQUFlO1lBQ2pDLFFBQVEsRUFBRSxXQUFTLENBQUMsZUFBZTtZQUNuQyxVQUFVLEVBQUUsRUFBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUM7U0FDakUsQ0FBQyxDQUFDO1FBRUgscUJBQXFCLENBQUMsS0FBSyxDQUFDLEVBQUMsWUFBWSxFQUFFLENBQUMsRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDO1FBQ3pFLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDMUMsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQ25CLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUFFRCxNQUFNLEtBQUssZUFBZTtRQUN0QixPQUFPO1lBQ0gsT0FBTyxFQUFFLElBQUk7WUFDYixRQUFRLEVBQUUsSUFBSTtZQUNkLFNBQVMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLE9BQU87Z0JBQ3ZCLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFDLEVBQUUsYUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUNoRSxDQUFDO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSixDQUFBO0FBN0NZLFNBQVM7SUFGckIsY0FBSyxDQUFDLGtCQUFTLENBQUMsU0FBUyxDQUFDO0lBQzFCLGdCQUFPLENBQUMsaUJBQWlCLENBQUM7R0FDZCxTQUFTLENBNkNyQjtBQTdDWSw4QkFBUyJ9