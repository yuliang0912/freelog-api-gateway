'use strict'

module.exports = app => {

    const mongoose = app.mongoose;

    const RequestRecordSchema = new mongoose.Schema({
        requestId: {type: String, unique: true, required: true},
        traceId: {type: String, required: true},
        routerId: {type: String, required: true},
        serverGroupName: {type: String, required: true},
        method: {type: String, required: true},
        requestUrl: {type: String, required: true}, //原始请求地址
        forwardUrl: {type: String, required: true}, //实际响应地址
        serviceResponseTime: {type: Number, required: true},
        userId: {type: Number, required: false, default: 0}, //请求者的身份信息
        reqContentLength: {type: Number, required: false, default: 0},//请求内容长度
        resContentLength: {type: Number, required: false, default: 0},//响应内容长度
        createDate: {type: Date, default: Date.now, required: true},
    }, {
        versionKey: false,
        timestamps: false
    })

    RequestRecordSchema.index({traceId: 1, serverGroupName: 1})

    return mongoose.model('request-record', RequestRecordSchema)
}