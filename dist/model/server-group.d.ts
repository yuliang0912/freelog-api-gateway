import { MongooseModelBase, IMongooseModelBase } from 'egg-freelog-base';
export declare class ServerGroup extends MongooseModelBase implements IMongooseModelBase {
    constructor(mongoose: any);
    buildMongooseModel(): any;
    static get toObjectOptions(): {
        transform(doc: any, ret: any, options: any): {
            groupId: any;
        } & Pick<any, string | number | symbol>;
    };
}
