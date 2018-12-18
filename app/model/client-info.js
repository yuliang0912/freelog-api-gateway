'use strict'

module.exports = app => {

    const mongoose = app.mongoose;

    const ClientInfoSchema = new mongoose.Schema({
        clientId: {type: Number, unique: true, required: true},
        clientName: {type: String, unique: true, required: true},
        publicKey: {type: String, unique: true, required: true},
        privateKey: {type: String, unique: true, required: true},
        status: {type: Number, default: 1, enum: [0, 1], required: true}, //状态 1:启用 0:禁用
    }, {
        versionKey: false,
        timestamps: {createdAt: 'createDate', updatedAt: 'updateDate'}
    })

    return mongoose.model('client-info', ClientInfoSchema)
}