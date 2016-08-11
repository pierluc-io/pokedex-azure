'use strict'

const http = require('http')
const request = require('request')

module.exports = function (context, req) {
  const resource = req.query ? req.query.resource : null
  const id = req.query ? req.query.id : null

  if (!resource) {
    context.res = {
      status: 400,
      message: '"resource" must be specified'
    }
  }

  if (!id) {
    context.res = {
      status: 400,
      message: '"id" must be specified'
    }
  }

  const uri = `https://pokeapi.co/api/v2/${resource}/${id}`
  const json = true

  request({ uri, json }, (err, response, body) => {
    if (err) {
      context.res = {
        status: 500,
        message: err.message
      }
    } else if (response.statusCode !== 200) {
      context.res = {
        status: response.statusCode,
        message: http.STATUS_CODES[response.statusCode]
      }
    } else {
      context.res = {
        result: body
      }
    }

    context.done()
  })
}
