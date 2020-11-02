"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var RequestRecord_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestRecord = void 0;
const lodash_1 = require("lodash");
const midway_1 = require("midway");
const mongoose_model_base_1 = require("./mongoose-model-base");
let RequestRecord = RequestRecord_1 = class RequestRecord extends mongoose_model_base_1.MongooseModelBase {
    buildMongooseModel() {
        const RequestRecordSchema = new this.mongoose.Schema({
            requestId: { type: String, unique: true, required: true },
            traceId: { type: String, required: true },
            routerId: { type: String, required: true },
            serverGroupName: { type: String, required: true },
            method: { type: String, required: true },
            requestUrl: { type: String, required: true },
            forwardUrl: { type: String, required: true },
            serviceResponseTime: { type: Number, required: true },
            userId: { type: Number, required: false, default: 0 },
            reqContentLength: { type: Number, required: false, default: 0 },
            resContentLength: { type: Number, required: false, default: 0 },
            createDate: { type: Date, default: Date.now, required: true },
        }, {
            toJSON: RequestRecord_1.toObjectOptions,
            toObject: RequestRecord_1.toObjectOptions,
            versionKey: false,
            timestamps: false
        });
        RequestRecordSchema.index({ traceId: 1, serverGroupName: 1 });
        return this.mongoose.model('request-record', RequestRecordSchema);
    }
    static get toObjectOptions() {
        return {
            transform(doc, ret, options) {
                return lodash_1.omit(ret, ['_id']);
            }
        };
    }
};
RequestRecord = RequestRecord_1 = __decorate([
    midway_1.scope(midway_1.ScopeEnum.Singleton),
    midway_1.provide('model.RequestRecord')
], RequestRecord);
exports.RequestRecord = RequestRecord;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC1yZWNvcmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9kZWwvcmVxdWVzdC1yZWNvcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLG1DQUE0QjtBQUM1QixtQ0FBaUQ7QUFDakQsK0RBQTRFO0FBSTVFLElBQWEsYUFBYSxxQkFBMUIsTUFBYSxhQUFjLFNBQVEsdUNBQWlCO0lBRWhELGtCQUFrQjtRQUVkLE1BQU0sbUJBQW1CLEdBQUcsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztZQUNqRCxTQUFTLEVBQUUsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBQztZQUN2RCxPQUFPLEVBQUUsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUM7WUFDdkMsUUFBUSxFQUFFLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFDO1lBQ3hDLGVBQWUsRUFBRSxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBQztZQUMvQyxNQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUM7WUFDdEMsVUFBVSxFQUFFLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFDO1lBQzFDLFVBQVUsRUFBRSxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBQztZQUMxQyxtQkFBbUIsRUFBRSxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBQztZQUNuRCxNQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBQztZQUNuRCxnQkFBZ0IsRUFBRSxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFDO1lBQzdELGdCQUFnQixFQUFFLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUM7WUFDN0QsVUFBVSxFQUFFLEVBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFDO1NBQzlELEVBQUU7WUFDQyxNQUFNLEVBQUUsZUFBYSxDQUFDLGVBQWU7WUFDckMsUUFBUSxFQUFFLGVBQWEsQ0FBQyxlQUFlO1lBQ3ZDLFVBQVUsRUFBRSxLQUFLO1lBQ2pCLFVBQVUsRUFBRSxLQUFLO1NBQ3BCLENBQUMsQ0FBQztRQUVILG1CQUFtQixDQUFDLEtBQUssQ0FBQyxFQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsZUFBZSxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUM7UUFFNUQsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUFFRCxNQUFNLEtBQUssZUFBZTtRQUN0QixPQUFPO1lBQ0gsU0FBUyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsT0FBTztnQkFDdkIsT0FBTyxhQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUM5QixDQUFDO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSixDQUFBO0FBcENZLGFBQWE7SUFGekIsY0FBSyxDQUFDLGtCQUFTLENBQUMsU0FBUyxDQUFDO0lBQzFCLGdCQUFPLENBQUMscUJBQXFCLENBQUM7R0FDbEIsYUFBYSxDQW9DekI7QUFwQ1ksc0NBQWEifQ==