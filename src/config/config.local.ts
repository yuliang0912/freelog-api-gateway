import {EggAppInfo} from 'midway';

export default (appInfo: EggAppInfo) => {

    const config: any = {};

    config.keys = '20ab72d9397ff78c5058a106c635f018';

    config.mongoose = {
        url: 'mongodb://127.0.0.1:27017/api-gateway'
    };
    //
    // config.mongoose = {
    //     url: 'mongodb://39.108.77.211:30772/api-gateway'
    // };

    config.mongoose = {
        url: `mongodb://gateway_service:QzA4Qzg3QTA3NDRCQTA0NDU1RUQxMjI3MTA4ODQ1MTk=@freelog-prod-public.mongodb.rds.aliyuncs.com:3717,freelog-prod-public-secondary.mongodb.rds.aliyuncs.com:3717/freelog-api-gateway?replicaSet=mgset-58730021`
    };

    return config;
}
