import { MongodbOperation } from 'egg-freelog-base';
import { ClientInfo } from "../../interface";
export default class ClientInfoProvider extends MongodbOperation<ClientInfo> {
    constructor(model: any);
}
