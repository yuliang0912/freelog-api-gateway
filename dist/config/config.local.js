"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (appInfo) => {
    const config = {};
    config.keys = '20ab72d9397ff78c5058a106c635f018';
    config.mongoose = {
        url: 'mongodb://127.0.0.1:27017/api-gateway'
    };
    // config.mongoose = {
    //     url: 'mongodb://39.108.77.211:30772/api-gateway'
    // };
    config.mongoose = {
        url: decodeURIComponent(`mongodb%3A%2F%2Fgateway_service%3AQzA4Qzg3QTA3NDRCQTA0NDU1RUQxMjI3MTA4ODQ1MTk%3D%40freelog-prod-public.mongodb.rds.aliyuncs.com%3A3717%2Cfreelog-prod-public-secondary.mongodb.rds.aliyuncs.com%3A3717%2Ffreelog-api-gateway%3FreplicaSet%3Dmgset-58730021`)
    };
    return config;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmxvY2FsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbmZpZy9jb25maWcubG9jYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxrQkFBZSxDQUFDLE9BQW1CLEVBQUUsRUFBRTtJQUVuQyxNQUFNLE1BQU0sR0FBUSxFQUFFLENBQUM7SUFFdkIsTUFBTSxDQUFDLElBQUksR0FBRyxrQ0FBa0MsQ0FBQztJQUVqRCxNQUFNLENBQUMsUUFBUSxHQUFHO1FBQ2QsR0FBRyxFQUFFLHVDQUF1QztLQUMvQyxDQUFDO0lBRUYsc0JBQXNCO0lBQ3RCLHVEQUF1RDtJQUN2RCxLQUFLO0lBRUwsTUFBTSxDQUFDLFFBQVEsR0FBRztRQUNkLEdBQUcsRUFBRSxrQkFBa0IsQ0FBQyw0UEFBNFAsQ0FBQztLQUN4UixDQUFDO0lBRUYsT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQyxDQUFBIn0=