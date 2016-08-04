'use strict'

const request = require('request')

module.exports = function (context, req) {
  const baseUrl = 'https://pokeapi.co/api/v2'

  function getPokeAPIResourceList (uri, results, cb) {
    request({
      uri,
      json: true
    }, (err, response, body) => {
      if (err) {
        return cb(err)
      }

      results = results.concat(body.results.map((r) => r.url))

      if (body.next) {
        return getPokeAPIResourceList(body.next, results, cb)
      }

      cb(undefined, results, body.count)
    })
  }

  const resource = req.query && req.query.resource ? req.query.resource : null

  if (!resource) {
    context.res = {
      status: 400,
      message: '"resource" must be specified'
    }
  }

  getPokeAPIResourceList(`${baseUrl}/${resource}`, (err, results, count) => {
    if (err) {
      context.res = {
        status: 500,
        message: err.message
      }
    } else {
      context.res = { count, results }
    }

    context.done()
  })
}
