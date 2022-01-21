"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (appInfo) => {
    const config = {};
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
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmxvY2FsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbmZpZy9jb25maWcubG9jYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxrQkFBZSxDQUFDLE9BQW1CLEVBQUUsRUFBRTtJQUVuQyxNQUFNLE1BQU0sR0FBUSxFQUFFLENBQUM7SUFFdkIsTUFBTSxDQUFDLElBQUksR0FBRyxrQ0FBa0MsQ0FBQztJQUVqRCxNQUFNLENBQUMsUUFBUSxHQUFHO1FBQ2QsR0FBRyxFQUFFLHVDQUF1QztLQUMvQyxDQUFDO0lBQ0YsRUFBRTtJQUNGLHNCQUFzQjtJQUN0Qix1REFBdUQ7SUFDdkQsS0FBSztJQUVMLE1BQU0sQ0FBQyxRQUFRLEdBQUc7UUFDZCxHQUFHLEVBQUUsb09BQW9PO0tBQzVPLENBQUM7SUFFRixPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDLENBQUEifQ==