import {EggAppInfo} from 'midway';

export default (appInfo: EggAppInfo) => {

    const config: any = {};

    // config.mongoose = {
    //     url: decodeURIComponent('mongodb%3A%2F%2Froot%3AQzA4Qzg3QTA3NDRCQTA0NDU1RUQxMjI3MTA4ODQ1MTk%3D%40freelog-prod-private.mongodb.rds.aliyuncs.com%3A3717%2Cfreelog-prod-private-secondary.mongodb.rds.aliyuncs.com%3A3717%2Ffreelog-api-gateway%3FreplicaSet%3Dmgset-58730021')
    // };

    config.mongoose = {
        url: decodeURIComponent(`mongodb%3A%2F%2Fgateway_service%3AQzA4Qzg3QTA3NDRCQTA0NDU1RUQxMjI3MTA4ODQ1MTk%3D%40freelog-prod-private.mongodb.rds.aliyuncs.com%3A3717%2Cfreelog-prod-private-secondary.mongodb.rds.aliyuncs.com%3A3717%2Ffreelog-api-gateway%3FreplicaSet%3Dmgset-58730021`)
    };

    return config;
}
