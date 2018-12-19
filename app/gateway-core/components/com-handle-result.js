"use strict"

module.exports = class ComponentHandleResult {

    constructor(comName, handleResult, attachData) {
        this.comName = comName
        this.handleResult = Boolean(handleResult)
        this.attachData = attachData
        this.error = null
        this.tips = ""
    }
}