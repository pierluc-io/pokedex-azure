'use strict'

const DocumentDBClient = require('documentdb').DocumentClient
const request = require('request')
const serialize = require('serialize-error')

function findOneByUri (client, collectionLink, resourceUri) {
  return new Promise((resolve, reject) => {
    client.queryDocuments(collectionLink, {
      query: 'SELECT * FROM r WHERE r.resource_uri = @resource_uri',
      parameters: [{
        name: '@resource_uri',
        value: resourceUri
      }]
    }).toArray((err, docs) => {
      if (err) {
        return reject(err)
      }

      resolve(docs[0])
    })
  })
}

function insertOne (client, collectionLink, data) {
  return new Promise((resolve, reject) => {
    client.createDocument(collectionLink, data, (err, document) => {
      if (err) {
        return reject(err)
      }

      resolve(document)
    })
  })
}

/* function updateOne (client, document, data) {
  return new Promise((resolve, reject) => {
    client.replaceDocument(document._self, Object.assign(document, data), (err, doc) => {
      if (err) {
        return reject(err)
      }

      resolve(doc)
    })
  })
}*/

/* function upsertOne (client, collectionLink, data) {
  return findOneByUri(client, collectionLink, data.resource_uri).then((document) => {
    return document ? updateOne(client, document, data) : insertOne(client, collectionLink, data)
  })
}*/

function getPokeResourceUriList (resource) {
  return new Promise((resolve, reject) => {
    (function find (uri, results) {
      request({ uri,
                json: true
            }, (err, response, body) => {
        if (err) {
          return reject(err)
        }

        results = results.concat(body.results.map((r) => r.url))

        if (body.next) {
          return find(body.next, results)
        }

        resolve(results)
      })
    })(`https://pokeapi.co/api/v2/${resource}/`, [])
  })
}

function getPokeResourceFromUri (uri) {
  return new Promise((resolve, reject) => {
    request({ uri,
            json: true
        }, (err, response, body) => {
      if (err) {
        return reject(err)
      }

      resolve(body)
    })
  })
}

module.exports = function (context, myTimer) {
  context.log(`Timer Trigger - ${Date.now()}`)

  function updateData (client, collection, resource) {
    context.log(`Getting ${resource} list...`)

    return getPokeResourceUriList(resource).then((uriList) => {
      context.log(`Found ${resource} list! Getting ${resource} data...`)

      return uriList.reduce((promise, uri) => {
        return promise.then(() => {
          context.log(`Finding ${resource} by uri ${uri}...`)

          return findOneByUri(client, collection, uri).then((document) => {
            if (document) {
              context.log(`Found ${resource} ${document.name}!`)

              return Promise.resolve()
            }

            context.log(`Requesting ${resource} at ${uri}...`)

            return getPokeResourceFromUri(uri).then((data) => {
              context.log(`Inserting ${resource} ${data.name}...`)

              data.isDeleted = false
              data.resource = resource
              data.resource_id = data.id
              data.resource_uri = uri

              delete data.id

              return insertOne(client, collection, data)
            })
          })
        })
      }, Promise.resolve())
    })
  }

  if (!myTimer.isPastDue) {
    const client = new DocumentDBClient('https://pierluc-io.documents.azure.com:443/', {
      masterKey: process.env.DOCUMENTDB_MASTER_KEY
    })

    const databaseId = 'pokedex'
    const collectionId = 'resources'
    const resource = 'type'

    const collectionLink = `dbs/${databaseId}/colls/${collectionId}`

    context.log(`Updating ${resource} data in ${collectionLink}...`)

    updateData(client, collectionLink, resource).then(() => {
      context.log(`Done updating ${resource} data in ${collectionLink}!`)

      context.done()
    }).catch((err) => {
      context.log(`An error occured: ${JSON.stringify(serialize(err), null, 2)}`)
    })
  } else {
    context.log('Timer is not past due yet!')

    context.done()
  }
}
