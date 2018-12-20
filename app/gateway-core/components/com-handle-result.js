"use strict"

module.exports = class ComponentHandleResult {

    constructor(comName, comType, handleResult, attachData) {
        this.comName = comName
        this.comType = comType
        this.handleResult = Boolean(handleResult)
        this.attachData = attachData
        this.error = null
        this.tips = ""
    }
}