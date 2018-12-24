'use strict'

module.exports = app => {

    const mongoose = app.mongoose;

    const ApiRouterConfigSchema = new mongoose.Schema({
        routerPrefix: {type: String, required: true},
        routerUrlRule: {type: String, required: true},
        upstream: {
            serverGroupId: {type: String, required: true},
            protocol: {type: String, default: 'http', required: true},
            port: {type: Number, required: true},
            forwardUriScheme: {type: String, required: true},
            method: {type: String, default: null} //为空,则与请求的method相同
        },
        httpMethod: {
            type: [String], //enum: ['GET', 'PUT', 'POST', 'DELETE', 'HEAD', 'OPTIONS', 'PATCH', 'COPY', 'LINK', 'UNLINK', 'PURGE'],
            required: true
        },
        httpComponentRuleIds: [],
        mockStatus: {type: Number, default: 0, enum: [0, 1], required: true}, //状态 1:启用 0:禁用
        status: {type: Number, default: 1, enum: [0, 1], required: true}, //状态 1:启用 0:禁用
    }, {
        versionKey: false,
        timestamps: {createdAt: 'createDate', updatedAt: 'updateDate'}
    })

    ApiRouterConfigSchema.index({routerPrefix: 1, httpMethod: 1, status: 1})

    return mongoose.model('api-router-config', ApiRouterConfigSchema)
}