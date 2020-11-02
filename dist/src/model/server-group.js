"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ServerGroup_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerGroup = void 0;
const midway_1 = require("midway");
const mongoose_model_base_1 = require("./mongoose-model-base");
const lodash_1 = require("lodash");
let ServerGroup = ServerGroup_1 = class ServerGroup extends mongoose_model_base_1.MongooseModelBase {
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
    midway_1.provide('model.ServerGroup')
], ServerGroup);
exports.ServerGroup = ServerGroup;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLWdyb3VwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZGVsL3NlcnZlci1ncm91cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsbUNBQWlEO0FBQ2pELCtEQUE0RTtBQUM1RSxtQ0FBNEI7QUFJNUIsSUFBYSxXQUFXLG1CQUF4QixNQUFhLFdBQVksU0FBUSx1Q0FBaUI7SUFFOUMsa0JBQWtCO1FBRWQsTUFBTSxZQUFZLEdBQUcsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztZQUMxQyxVQUFVLEVBQUUsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUM7WUFDMUMsUUFBUSxFQUFFLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFDO1lBQ3hDLGlCQUFpQixFQUFFLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUM7WUFDL0QsTUFBTSxFQUFFLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFDO1NBQ25FLEVBQUUsRUFBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO1FBRXBDLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztZQUMvQyxTQUFTLEVBQUUsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBQztZQUN2RCxPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7WUFDdkIsTUFBTSxFQUFFLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFDO1NBQ25FLEVBQUU7WUFDQyxVQUFVLEVBQUUsS0FBSztZQUNqQixVQUFVLEVBQUUsRUFBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUM7WUFDOUQsTUFBTSxFQUFFLGFBQVcsQ0FBQyxlQUFlO1lBQ25DLFFBQVEsRUFBRSxhQUFXLENBQUMsZUFBZTtTQUN4QyxDQUFDLENBQUM7UUFFSCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLGVBQWUsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFFRCxNQUFNLEtBQUssZUFBZTtRQUN0QixPQUFPO1lBQ0gsU0FBUyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsT0FBTztnQkFDdkIsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUMsRUFBRSxhQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hFLENBQUM7U0FDSixDQUFBO0lBQ0wsQ0FBQztDQUNKLENBQUE7QUFoQ1ksV0FBVztJQUZ2QixjQUFLLENBQUMsa0JBQVMsQ0FBQyxTQUFTLENBQUM7SUFDMUIsZ0JBQU8sQ0FBQyxtQkFBbUIsQ0FBQztHQUNoQixXQUFXLENBZ0N2QjtBQWhDWSxrQ0FBVyJ9