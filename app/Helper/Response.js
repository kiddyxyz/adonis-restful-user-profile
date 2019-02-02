'use strict'

function ok(values, message, response){
    let data = {
        values: values,
        message: message,
    }
    return response.status(200).json(data)
}

function badRequest(values, message, response){
    let data = {
        values: values,
        message: message,
    }
    return response.status(400).json(data)
}

module.exports = {
    ok, badRequest
}