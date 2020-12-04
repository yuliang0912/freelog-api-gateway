import { MongooseModelBase, IMongooseModelBase } from 'egg-freelog-base';
export declare class ApiRouter extends MongooseModelBase implements IMongooseModelBase {
    constructor(mongoose: any);
    buildMongooseModel(): any;
    static get toObjectOptions(): {
        getters: boolean;
        virtuals: boolean;
        transform(doc: any, ret: any, options: any): {
            routerId: any;
        } & Pick<any, string | number | symbol>;
    };
}
