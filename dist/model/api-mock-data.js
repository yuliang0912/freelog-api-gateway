"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var ApiMockDataModel_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiMockDataModel = void 0;
const lodash_1 = require("lodash");
const midway_1 = require("midway");
const egg_freelog_base_1 = require("egg-freelog-base");
let ApiMockDataModel = ApiMockDataModel_1 = class ApiMockDataModel extends egg_freelog_base_1.MongooseModelBase {
    constructor(mongoose) {
        super(mongoose);
    }
    buildMongooseModel() {
        const ApiMockDataSchema = new this.mongoose.Schema({
            routeId: { type: String, unique: true, required: true },
            contentType: { type: String, required: true },
            mockData: { type: this.mongoose.Schema.Types.Mixed, required: true },
            status: { type: Number, default: 1, enum: [0, 1], required: true }
        }, {
            versionKey: false,
            timestamps: { createdAt: 'createDate', updatedAt: 'updateDate' },
            toJSON: ApiMockDataModel_1.toObjectOptions
        });
        ApiMockDataSchema.index({ routeId: 1 }, { unique: true });
        return this.mongoose.model('api-mock-datas', ApiMockDataSchema);
    }
    static get toObjectOptions() {
        return {
            transform(doc, ret, options) {
                return lodash_1.omit(ret, ['_id']);
            }
        };
    }
};
ApiMockDataModel = ApiMockDataModel_1 = __decorate([
    midway_1.scope(midway_1.ScopeEnum.Singleton),
    midway_1.provide('model.MockData'),
    __param(0, midway_1.plugin('mongoose')),
    __metadata("design:paramtypes", [Object])
], ApiMockDataModel);
exports.ApiMockDataModel = ApiMockDataModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLW1vY2stZGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC9hcGktbW9jay1kYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtQ0FBNEI7QUFDNUIsbUNBQXlEO0FBQ3pELHVEQUF1RTtBQUl2RSxJQUFhLGdCQUFnQix3QkFBN0IsTUFBYSxnQkFBaUIsU0FBUSxvQ0FBaUI7SUFFbkQsWUFBZ0MsUUFBUTtRQUNwQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDcEIsQ0FBQztJQUVELGtCQUFrQjtRQUVkLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztZQUMvQyxPQUFPLEVBQUUsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBQztZQUNyRCxXQUFXLEVBQUUsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUM7WUFDM0MsUUFBUSxFQUFFLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBQztZQUNsRSxNQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUM7U0FDbkUsRUFBRTtZQUNDLFVBQVUsRUFBRSxLQUFLO1lBQ2pCLFVBQVUsRUFBRSxFQUFDLFNBQVMsRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBQztZQUM5RCxNQUFNLEVBQUUsa0JBQWdCLENBQUMsZUFBZTtTQUMzQyxDQUFDLENBQUM7UUFFSCxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsRUFBQyxPQUFPLEVBQUUsQ0FBQyxFQUFDLEVBQUUsRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztRQUV0RCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLGdCQUFnQixFQUFFLGlCQUFpQixDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUVELE1BQU0sS0FBSyxlQUFlO1FBQ3RCLE9BQU87WUFDSCxTQUFTLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxPQUFPO2dCQUN2QixPQUFPLGFBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzlCLENBQUM7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKLENBQUE7QUEvQlksZ0JBQWdCO0lBRjVCLGNBQUssQ0FBQyxrQkFBUyxDQUFDLFNBQVMsQ0FBQztJQUMxQixnQkFBTyxDQUFDLGdCQUFnQixDQUFDO0lBR1QsV0FBQSxlQUFNLENBQUMsVUFBVSxDQUFDLENBQUE7O0dBRnRCLGdCQUFnQixDQStCNUI7QUEvQlksNENBQWdCIn0=