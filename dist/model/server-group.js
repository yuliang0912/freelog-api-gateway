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
var ServerGroup_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerGroup = void 0;
const midway_1 = require("midway");
const egg_freelog_base_1 = require("egg-freelog-base");
const lodash_1 = require("lodash");
let ServerGroup = ServerGroup_1 = class ServerGroup extends egg_freelog_base_1.MongooseModelBase {
    constructor(mongoose) {
        super(mongoose);
    }
    buildMongooseModel() {
        const ServerSchema = new this.mongoose.Schema({
            serverName: { type: String, required: true },
            serverIp: { type: String, required: true },
            weightCoefficient: { type: Number, default: 100, required: true },
            status: { type: Number, default: 1, enum: [0, 1], required: true },
        }, { _id: false, versionKey: false });
        const ServerGroupSchema = new this.mongoose.Schema({
            groupName: { type: String, unique: true, required: true },
            servers: [ServerSchema],
            status: { type: Number, default: 1, enum: [0, 1], required: true },
        }, {
            versionKey: false,
            timestamps: { createdAt: 'createDate', updatedAt: 'updateDate' },
            toJSON: ServerGroup_1.toObjectOptions,
            toObject: ServerGroup_1.toObjectOptions
        });
        return this.mongoose.model('server-groups', ServerGroupSchema);
    }
    static get toObjectOptions() {
        return {
            transform(doc, ret, options) {
                return Object.assign({ groupId: doc.id }, lodash_1.omit(ret, ['_id']));
            }
        };
    }
};
ServerGroup = ServerGroup_1 = __decorate([
    midway_1.scope(midway_1.ScopeEnum.Singleton),
    midway_1.provide('model.ServerGroup'),
    __param(0, midway_1.plugin('mongoose')),
    __metadata("design:paramtypes", [Object])
], ServerGroup);
exports.ServerGroup = ServerGroup;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLWdyb3VwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZGVsL3NlcnZlci1ncm91cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbUNBQXlEO0FBQ3pELHVEQUF1RTtBQUN2RSxtQ0FBNEI7QUFJNUIsSUFBYSxXQUFXLG1CQUF4QixNQUFhLFdBQVksU0FBUSxvQ0FBaUI7SUFFOUMsWUFBZ0MsUUFBUTtRQUNwQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDcEIsQ0FBQztJQUVELGtCQUFrQjtRQUVkLE1BQU0sWUFBWSxHQUFHLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7WUFDMUMsVUFBVSxFQUFFLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFDO1lBQzFDLFFBQVEsRUFBRSxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBQztZQUN4QyxpQkFBaUIsRUFBRSxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFDO1lBQy9ELE1BQU0sRUFBRSxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBQztTQUNuRSxFQUFFLEVBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztRQUVwQyxNQUFNLGlCQUFpQixHQUFHLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7WUFDL0MsU0FBUyxFQUFFLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUM7WUFDdkQsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO1lBQ3ZCLE1BQU0sRUFBRSxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBQztTQUNuRSxFQUFFO1lBQ0MsVUFBVSxFQUFFLEtBQUs7WUFDakIsVUFBVSxFQUFFLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFDO1lBQzlELE1BQU0sRUFBRSxhQUFXLENBQUMsZUFBZTtZQUNuQyxRQUFRLEVBQUUsYUFBVyxDQUFDLGVBQWU7U0FDeEMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxlQUFlLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRUQsTUFBTSxLQUFLLGVBQWU7UUFDdEIsT0FBTztZQUNILFNBQVMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLE9BQU87Z0JBQ3ZCLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFDLEVBQUUsYUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoRSxDQUFDO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSixDQUFBO0FBcENZLFdBQVc7SUFGdkIsY0FBSyxDQUFDLGtCQUFTLENBQUMsU0FBUyxDQUFDO0lBQzFCLGdCQUFPLENBQUMsbUJBQW1CLENBQUM7SUFHWixXQUFBLGVBQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQTs7R0FGdEIsV0FBVyxDQW9DdkI7QUFwQ1ksa0NBQVcifQ==