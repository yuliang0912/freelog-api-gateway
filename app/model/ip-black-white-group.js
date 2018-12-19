'use strict'

const lodash = require('lodash')

module.exports = app => {

    const mongoose = app.mongoose;

    const toObjectOptions = {
        transform(doc, ret, options) {
            return Object.assign({groupId: doc.id}, lodash.omit(ret, ['_id']))
        }
    }

    const IpSchema = new mongoose.Schema({
        ip: {type: String, unique: true, required: true},
        remark: {type: String, default: '', required: false},
        status: {type: Number, default: 1, enum: [0, 1], required: true}, //状态 1:启用 0:禁用
    }, {_id: false, versionKey: false})

    const IpWhiteListGroupSchema = new mongoose.Schema({
        groupName: {type: String, required: true},
        IpSettings: [IpSchema],
        groupType: {type: String, enum: ['black', 'white'], required: true},
        status: {type: Number, default: 1, enum: [0, 1], required: true}, //状态 1:启用 0:禁用
    }, {
        versionKey: false,
        timestamps: {createdAt: 'createDate', updatedAt: 'updateDate'},
        toJSON: toObjectOptions,
        toObject: toObjectOptions
    })

    return mongoose.model('ip-black-white-list-group', IpWhiteListGroupSchema)
}