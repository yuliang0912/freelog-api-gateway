import {EggAppInfo} from "midway";

export default (appInfo: EggAppInfo) => {

    const config: any = {};

    config.mongoose = {
        url: "mongodb://mongo-prod.common:27017/api-gateway"
    };

    return config;
}