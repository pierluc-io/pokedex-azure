'use strict'

const request = require('request-promise')

module.exports = function (context, input) {
  const headers = {
    'x-functions-key': process.env.AZURE_FUNCTIONS_KEY
  }

  const json = true

  context.log('Requesting list of PokeAPI endpoints...')

  request({
    uri: 'https://pierluc-io.azurewebsites.net/api/pokeapi-endpoints', headers, json
  }).then((body) => {
    context.log(`Requesting resource list for ${body.results.length} endpoints...`)

    return Promise.all(body.results.map((endpoint) => request({
      uri: 'https://pierluc-io.azurewebsites.net/api/pokeapi-resource-list',
      headers,
      json,
      qs: {
        endpoint: endpoint.name
      }
    })))
  }).then((data) => {
    const resources = []

    context.log(`Aggregating resources from ${data.length} lists...`)

    data.forEach((resource) => resource.results.forEach((result) => resources.push(Object.assign(result, {
      endpoint: resource.endpoint
    }))))

    return Promise.resolve(resources)
  }).then((resources) => {
    context.log(`Aggregated ${resources.length} resources!`)

    return resources.reduce((promise, resource, i, resources) => {
      context.log(`Requesting ${resource.endpoint} ${resource.id || resource.name} (${i + 1} / ${resources.length})`)

      return request({
        uri: 'https://pierluc-io.azurewebsites.net/api/pokeapi-resource',
        headers,
        json,
        qs: {
          endpoint: resource.endpoint,
          id: resource.id || resource.name
        }
      }).then((body) => {
        context.log(`Upserting ${resource.endpoint} ${resource.id || resource.name} (${i + 1} / ${resources.length})`)

        return request({
          uri: 'https://pierluc-io.azurewebsites.net/api/pokedex-upsert',
          headers,
          json,
          method: 'POST',
          qs: {
            endpoint: resource.endpoint
          },
          data: body
        })
      })
    }, Promise.resolve())
  }).then(() => {
    context.log('Done!')

    context.done()
  }).catch((err) => {
    context.log(`An error occured: ${err.stack}`)
  })
}
