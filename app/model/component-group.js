'use strict'

const ComponentSchema = require('./component')

module.exports = app => {

    const mongoose = app.mongoose;

    const ComponentGroupSchema = new mongoose.Schema({
        groupName: {type: String, unique: true, required: true},
        components: [ComponentSchema],
        status: {type: Number, default: 1, enum: [0, 1], required: true}, //状态 1:启用 0:禁用
    }, {
        versionKey: false,
        timestamps: {createdAt: 'createDate', updatedAt: 'updateDate'}
    })

    return mongoose.model('component-group', ComponentGroupSchema)
}