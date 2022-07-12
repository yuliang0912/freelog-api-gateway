import {EggAppInfo} from 'midway';

export default (appInfo: EggAppInfo) => {

    const config: any = {};

    config.keys = '20ab72d9397ff78c5058a106c635f018';

    config.mongoose = {
        url: 'mongodb://127.0.0.1:27017/api-gateway'
    };

    // config.mongoose = {
    //     url: 'mongodb://39.108.77.211:30772/api-gateway'
    // };

    // config.mongoose = {
    //     url: decodeURIComponent(`mongodb%3A%2F%2Fgateway_service%3AQzA4Qzg3QTA3NDRCQTA0NDU1RUQxMjI3MTA4ODQ1MTk%3D%40freelog-prod-public.mongodb.rds.aliyuncs.com%3A3717%2Cfreelog-prod-public-secondary.mongodb.rds.aliyuncs.com%3A3717%2Ffreelog-api-gateway%3FreplicaSet%3Dmgset-58730021`)
    // };

    return config;
}
