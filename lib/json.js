/*!
 * body-parser
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */

"use strict"

const bytes = require('bytes')
const contentType = require('content-type')
const createError = require('http-errors')
const read = require('./read')

function hasbody(req) {
    return req.headers['transfer-encoding'] !== undefined ||
        !isNaN(req.headers['content-length'])
}

/**
 * Create a middleware to parse JSON bodies.
 *
 * @param {object} [options]
 * @return {function}
 * @public
 */
module.exports = function json(options) {
    const opts = options || {}

    const limit = typeof opts.limit !== 'number'
        ? bytes.parse(opts.limit || '100kb')
        : opts.limit
    const inflate = opts.inflate !== false
    const reviver = opts.reviver
    const verify = opts.verify || false

    if (verify !== false && typeof verify !== 'function') {
        throw new TypeError('option verify must be function')
    }

    function parse(body) {
        if (body.length === 0) {
            // special-case empty json body, as it's a common client-side mistake
            return {}
        }

        try {
            return JSON.parse(body, reviver)
        } catch (e) {
            throw normalizeJsonSyntaxError(e, {
                message: e.message,
                stack: e.stack
            })
        }
    }

    return function jsonParser(req, res, next) {
        if (req._body) {
            next()
            return
        }

        req.body = req.body || {}

        // skip requests without bodies
        if (!hasbody(req)) {
            next()
            return
        }

        // assert charset per RFC 7159 sec 8.1
        const charset = getCharset(req) || 'utf-8'
        if (charset.substr(0, 4) !== 'utf-') {
            next(createError(415, 'unsupported charset "' + charset.toUpperCase() + '"', {
                charset: charset,
                type: 'charset.unsupported'
            }))
            return
        }

        // read
        read(req, res, next, parse, {
            encoding: charset,
            inflate: inflate,
            limit: limit,
            verify: verify
        })
    }
}

function getCharset(req) {
    try {
        return (contentType.parse(req).parameters.charset || '').toLowerCase()
    } catch (e) {
        return undefined
    }
}

function normalizeJsonSyntaxError(error, obj) {
    const keys = Object.getOwnPropertyNames(error)

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        if (key !== 'stack' && key !== 'message') {
            delete error[key]
        }
    }

    error.stack = obj.stack
    error.message = obj.message

    return error
}
