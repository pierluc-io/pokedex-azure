'use strict'

const DocumentDBClient = require('documentdb').DocumentClient
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

function updateOne (client, document, data) {
  return new Promise((resolve, reject) => {
    client.replaceDocument(document._self, Object.assign(document, data), (err, doc) => {
      if (err) {
        return reject(err)
      }

      resolve(doc)
    })
  })
}

function upsertOne (client, collectionLink, data) {
  return findOneByUri(client, collectionLink, data.resource_uri).then((document) => {
    return document ? updateOne(client, document, data) : insertOne(client, collectionLink, data)
  })
}

module.exports = function (context, req) {
  const endpoint = req.query ? req.query.endpoint : null

  if (!endpoint) {
    context.res = {
      status: 400,
      message: '"endpoint" must be specified'
    }

    return context.done()
  }

  const client = new DocumentDBClient('https://pierluc-io.documents.azure.com:443/', {
    masterKey: process.env.DOCUMENTDB_MASTER_KEY
  })

  const databaseId = 'pokedex'
  const collectionId = 'resources'
  const collectionLink = `dbs/${databaseId}/colls/${collectionId}`

  context.log(`Upserting ${req.body} data in ${collectionLink}...`)

  const data = Object.assign(req.body, {
    isDeleted: false,
    resource: endpoint,
    resource_id: req.body.id,
    resource_uri: `https://pokeapi.co/api/v2/${endpoint}/${req.body.id}/`
  })

  delete data.id

  upsertOne(client, collectionLink, data).then(() => {
    context.log(`Done upserting ${data.resource} ${data.resource_id} data in ${collectionLink}!`)

    context.done()
  }).catch((err) => {
    context.log(`An error occured: ${JSON.stringify(serialize(err), null, 2)}`)

    context.done()
  })
}
