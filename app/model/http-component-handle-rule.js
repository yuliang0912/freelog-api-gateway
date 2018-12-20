'use strict'

const lodash = require('lodash')

module.exports = app => {

    const mongoose = app.mongoose;

    const toObjectOptions = {
        transform(doc, ret, options) {
            return Object.assign({ruleId: doc.id}, lodash.omit(ret, ['_id']))
        }
    }

    const HttpComponentHandleRuleSchema = new mongoose.Schema({
        ruleName: {type: String, required: true},
        httpComponentRules: [],
        componentConfig: {}, //此处的配置会全部透传给组件,具体的定义需要配合组件一起使用,例如自定义白名单配置.
        status: {type: Number, default: 1, enum: [0, 1], required: true}, //状态 1:启用 0:禁用
    }, {
        versionKey: false,
        timestamps: {createdAt: 'createDate', updatedAt: 'updateDate'},
        toJSON: toObjectOptions,
        toObject: toObjectOptions
    })

    return mongoose.model('http-component-handle-rule', HttpComponentHandleRuleSchema)
}