'use strict'

const http = require('http')
const request = require('request')
const whilst = require('async/whilst')

module.exports = function (context, req) {
  const endpoint = req.query ? req.query.endpoint : null
  const json = true

  let uri = `https://pokeapi.co/api/v2/${endpoint}/`
  let results = []

  if (!endpoint) {
    context.res = {
      status: 400,
      message: '"endpoint" must be specified'
    }
  }

  whilst(() => !!uri, (cb) => {
    request({ uri, json }, (err, response, body) => {
      if (err) {
        return cb(err)
      }

      if (response.statusCode !== 200) {
        return cb(new Error(http.STATUS_CODES[response.statusCode]))
      }

      uri = body.next
      results = results.concat(body.results)

      cb(null, results)
    })
  }, (err, results) => {
    if (err) {
      context.res = {
        status: 500,
        message: err.message
      }
    } else {
      const count = results.length

      context.res = { count, endpoint, results }
    }

    context.done()
  })
}
