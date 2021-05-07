import {EggAppInfo} from "midway";

export default (appInfo: EggAppInfo) => {

    const config: any = {};

    config.mongoose = {
        url: `mongodb://gateway_service:QzA4Qzg3QTA3NDRCQTA0NDU1RUQxMjI3MTA4ODQ1MTk=@dds-wz9ac40fee5c09441.mongodb.rds.aliyuncs.com:3717,dds-wz9ac40fee5c09442.mongodb.rds.aliyuncs.com:3717/test-api-gateway?replicaSet=mgset-44484047`
    };

    return config;
}
