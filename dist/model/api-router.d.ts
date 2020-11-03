import { MongooseModelBase, IMongooseModelBase } from './mongoose-model-base';
export declare class ApiRouter extends MongooseModelBase implements IMongooseModelBase {
    buildMongooseModel(): any;
    static get toObjectOptions(): {
        getters: boolean;
        virtuals: boolean;
        transform(doc: any, ret: any, options: any): {
            routerId: any;
        } & Pick<any, string | number | symbol>;
    };
}
