import {EggAppInfo} from 'midway';

export default (appInfo: EggAppInfo) => {

    const config: any = {};

    config.mongoose = {
        url: 'mongodb%3A%2F%2Froot%3AQzA4Qzg3QTA3NDRCQTA0NDU1RUQxMjI3MTA4ODQ1MTk%3D%40freelog-prod-private.mongodb.rds.aliyuncs.com%3A3717%2Cfreelog-prod-private-secondary.mongodb.rds.aliyuncs.com%3A3717%2Ffreelog-api-gateway%3FreplicaSet%3Dmgset-58730021'
    };

    return config;
}
