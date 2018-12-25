'use strict'

const Patrun = require('patrun')
const {ApplicationError} = require('egg-freelog-base/error')
const {GatewayInfoUpdateEvent} = require('../enum/app-event-emitter-enum')
const RouterDataUpdateEventHandler = require('./router-data-update-event-handler')

module.exports = class AppEventsListener {

    constructor(app) {
        this.app = app
        this.patrun = Patrun()
        this.registerEventHandler()
        this.registerEventListener()
    }

    /**
     * 注册事件侦听者
     */
    registerEventListener() {
        this.registerAppMessengerEventAndHandler(GatewayInfoUpdateEvent)
    }

    /**
     * 注册事件以及事件处理者
     */
    registerAppMessengerEventAndHandler(eventName) {

        const eventHandler = this.patrun.find({event: eventName.toString()})
        if (!eventHandler) {
            throw new ApplicationError(`尚未注册事件${eventName}的处理者`)
        }
        this.app.messenger.on(GatewayInfoUpdateEvent, eventHandler.handle.bind(eventHandler))
    }

    /**
     * 注册事件处理者
     */
    registerEventHandler() {

        const {app, patrun} = this

        patrun.add({event: GatewayInfoUpdateEvent}, new RouterDataUpdateEventHandler(app))
    }
}