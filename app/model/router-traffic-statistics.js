'use strict'

module.exports = app => {

    const mongoose = app.mongoose;

    const RouterTrafficStatisticsSchema = new mongoose.Schema({
        routerId: {type: String, required: true},
        routerUrlRule: {type: String, required: true},
        totalCount: {type: Number, default: 1, required: true},
    }, {
        versionKey: false,
        timestamps: {createdAt: 'createDate', updatedAt: 'updateDate'}
    })

    return mongoose.model('router-traffic-statistics', RouterTrafficStatisticsSchema)
}