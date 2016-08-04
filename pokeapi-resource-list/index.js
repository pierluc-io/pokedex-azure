'use strict'

const request = require('request')
const whilst = require('async/whilst')

module.exports = function (context, req) {
  const resource = req.query && req.query.resource ? req.query.resource : null
  const json = true

  let uri = `https://pokeapi.co/api/v2/${resource}/`
  let results = []

  if (!resource) {
    context.res = {
      status: 400,
      message: '"resource" must be specified'
    }
  }

  whilst(() => !!uri, (cb) => {
    request({ uri, json }, (err, response, body) => {
      if (err) {
        return cb(err)
      }

      uri = body.next

      cb(null, results.concat(body.results))
    })
  }, (err, results) => {
    if (err) {
      context.res = {
        status: 500,
        message: err.message
      }
    } else {
      const count = results.length

      context.res = { count, results }
    }

    context.done()
  })
}