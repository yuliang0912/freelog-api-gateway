'use strict'

module.exports = app => {

    const mongoose = app.mongoose;

    const ApiMockSchema = new mongoose.Schema({
        apiRouteId: {type: String, unique: true, required: true},
        mockData: {} //自定义mock数据
    }, {
        versionKey: false,
        timestamps: {createdAt: 'createDate', updatedAt: 'updateDate'}
    })

    return mongoose.model('api-mock-settings', ApiMockSchema)
}