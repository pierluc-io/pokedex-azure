'use strict'

const request = require('request-promise')

module.exports = function (context, input) {
  context.log(`Manual Trigger - ${input}`)

  const headers = {
    'x-functions-key': process.env.AZURE_FUNCTIONS_KEY
  }

  const json = true

  request({
    uri: 'https://pierluc-io.azurewebsites.net/api/pokeapi-endpoints', headers, json
  }).then((body) => {
    return Promise.all(body.results.map((endpoint) => request({
      uri: 'https://pierluc-io.azurewebsites.net/api/pokeapi-resource-list', headers, json,
      qs: {
        endpoint: endpoint.name
      }
    })))
  }).then((data) => {
    const resourceList = []

    context.log(`Aggregating resource lists from ${data.length} endpoints...`)

    data.map((resources) => resources.map((resource) => resource.results.map((result) => {
      resourceList.push(Object.assign(result, {
        endpoint: resource.endpoint
      }))
    })))

    return Promise.resolve(resourceList)
  }).then((resources) => {
    context.log(`Aggregated ${resources.length} resource lists!`)

    return resources.reduce((promise, resource, i, resources) => {
      context.log(`Requesting ${resource.endpoint} ${resource.id || resource.name} (${i + 1} / ${resources.length})`)

      return request({
        uri: 'https://pierluc-io.azurewebsites.net/api/pokeapi-resource', headers, json,
        qs: {
          endpoint: resource.endpoint,
          id: resource.id || resource.name
        }
      }).then((body) => {
        context.log(`Upserting ${resource.endpoint} ${resource.id || resource.name} (${i + 1} / ${resources.length})`)

        return request({
          uri: 'https://pierluc-io.azurewebsites.net/api/pokedex-upsert', headers, json,
          method: 'POST',
          qs: {
            endpoint: resource.endpoint
          },
          data: body
        })
      })
    }, Promise.resolve())
  }).then(() => {

  }).catch((err) => {
    context.log(`An error occured: ${err.stack}`)
  })
}
