'use strict'

module.exports = app => {

    const mongoose = app.mongoose;

    const ServerSchema = new mongoose.Schema({
        serverName: {type: String, required: true},
        serverIp: {type: String, required: true},
        weightCoefficient: {type: Number, default: 100, required: true},
        status: {type: Number, default: 1, enum: [0, 1], required: true}, //状态 1:启用 0:禁用
    }, {_id: false, versionKey: false})


    const ServerGroupSchema = new mongoose.Schema({
        groupName: {type: String, unique: true, required: true},
        servers: [ServerSchema],
        status: {type: Number, default: 1, enum: [0, 1], required: true}, //状态 1:启用 0:禁用
    }, {
        versionKey: false,
        timestamps: {createdAt: 'createDate', updatedAt: 'updateDate'}
    })

    return mongoose.model('server-group', ServerGroupSchema)
}