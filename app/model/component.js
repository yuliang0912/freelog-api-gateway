'use strict'

const {Schema} = require('mongoose')

const ComponentSchema = new Schema({
    name: {type: String, required: true},
    config: {},
}, {_id: false, versionKey: false})

module.exports = ComponentSchema