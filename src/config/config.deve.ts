import {EggAppInfo} from "midway";

export default (appInfo: EggAppInfo) => {

    const config: any = {};

    config.mongoose = {
        url: "mongodb://192.168.2.24:27017/api-gateway"
    };

    return config;
}