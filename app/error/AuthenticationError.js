"use strict"

module.exports = class AuthenticationError extends Error {
    constructor(message, data) {
        super()
        this.name = 'AuthenticationError'
        this.message = message
        this.data = data
    }
}