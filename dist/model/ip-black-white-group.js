"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var IpBlackWhiteGroup_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.IpBlackWhiteGroup = void 0;
const lodash_1 = require("lodash");
const midway_1 = require("midway");
const mongoose_model_base_1 = require("./mongoose-model-base");
let IpBlackWhiteGroup = IpBlackWhiteGroup_1 = class IpBlackWhiteGroup extends mongoose_model_base_1.MongooseModelBase {
    buildMongooseModel() {
        const IpSchema = new this.mongoose.Schema({
            ip: { type: String, unique: true, required: true },
            remark: { type: String, default: '', required: false },
            status: { type: Number, default: 1, enum: [0, 1], required: true },
        }, { _id: false, versionKey: false });
        const IpWhiteListGroupSchema = new this.mongoose.Schema({
            groupName: { type: String, required: true },
            IpSettings: [IpSchema],
            groupType: { type: String, enum: ['black', 'white'], required: true },
            status: { type: Number, default: 1, enum: [0, 1], required: true },
        }, {
            versionKey: false,
            timestamps: { createdAt: 'createDate', updatedAt: 'updateDate' },
            toJSON: IpBlackWhiteGroup_1.toObjectOptions,
            toObject: IpBlackWhiteGroup_1.toObjectOptions
        });
        return this.mongoose.model('ip-black-white-list-group', IpWhiteListGroupSchema);
    }
    static get toObjectOptions() {
        return {
            transform(doc, ret, options) {
                return Object.assign({ groupId: doc.id }, lodash_1.omit(ret, ['_id']));
            }
        };
    }
};
IpBlackWhiteGroup = IpBlackWhiteGroup_1 = __decorate([
    midway_1.scope(midway_1.ScopeEnum.Singleton),
    midway_1.provide('model.IpBlackWhiteGroup')
], IpBlackWhiteGroup);
exports.IpBlackWhiteGroup = IpBlackWhiteGroup;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXAtYmxhY2std2hpdGUtZ3JvdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWwvaXAtYmxhY2std2hpdGUtZ3JvdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLG1DQUE0QjtBQUM1QixtQ0FBaUQ7QUFDakQsK0RBQTRFO0FBSTVFLElBQWEsaUJBQWlCLHlCQUE5QixNQUFhLGlCQUFrQixTQUFRLHVDQUFpQjtJQUVwRCxrQkFBa0I7UUFDZCxNQUFNLFFBQVEsR0FBRyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO1lBQ3RDLEVBQUUsRUFBRSxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFDO1lBQ2hELE1BQU0sRUFBRSxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFDO1lBQ3BELE1BQU0sRUFBRSxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBQztTQUNuRSxFQUFFLEVBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztRQUVwQyxNQUFNLHNCQUFzQixHQUFHLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7WUFDcEQsU0FBUyxFQUFFLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFDO1lBQ3pDLFVBQVUsRUFBRSxDQUFDLFFBQVEsQ0FBQztZQUN0QixTQUFTLEVBQUUsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFDO1lBQ25FLE1BQU0sRUFBRSxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBQztTQUNuRSxFQUFFO1lBQ0MsVUFBVSxFQUFFLEtBQUs7WUFDakIsVUFBVSxFQUFFLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFDO1lBQzlELE1BQU0sRUFBRSxtQkFBaUIsQ0FBQyxlQUFlO1lBQ3pDLFFBQVEsRUFBRSxtQkFBaUIsQ0FBQyxlQUFlO1NBQzlDLENBQUMsQ0FBQztRQUVILE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsMkJBQTJCLEVBQUUsc0JBQXNCLENBQUMsQ0FBQztJQUNwRixDQUFDO0lBRUQsTUFBTSxLQUFLLGVBQWU7UUFDdEIsT0FBTztZQUNILFNBQVMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLE9BQU87Z0JBQ3ZCLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFDLEVBQUUsYUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoRSxDQUFDO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSixDQUFBO0FBL0JZLGlCQUFpQjtJQUY3QixjQUFLLENBQUMsa0JBQVMsQ0FBQyxTQUFTLENBQUM7SUFDMUIsZ0JBQU8sQ0FBQyx5QkFBeUIsQ0FBQztHQUN0QixpQkFBaUIsQ0ErQjdCO0FBL0JZLDhDQUFpQiJ9