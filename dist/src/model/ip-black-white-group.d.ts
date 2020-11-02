import { MongooseModelBase, IMongooseModelBase } from './mongoose-model-base';
export declare class IpBlackWhiteGroup extends MongooseModelBase implements IMongooseModelBase {
    buildMongooseModel(): any;
    static get toObjectOptions(): {
        transform(doc: any, ret: any, options: any): {
            groupId: any;
        } & Pick<any, string | number | symbol>;
    };
}
