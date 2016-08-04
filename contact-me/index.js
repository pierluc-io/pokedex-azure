'use strict'

const request = require('request')

module.exports = function (context, req) {
  context.log(`Node.js HTTP trigger function processed a request. RequestUri=${req.originalUrl}`)

  if (!req.body || !req.body.name || !req.body.email || !req.body.message) {
    context.res = {
      status: 400,
      body: "Veuillez spécifier votre nom, adresse courriel ainsi qu'un message."
    }

    return context.done()
  }

  // const { name, email, message } = req.body

  const name = req.body.name
  const email = req.body.email
  const message = req.body.message

  request.post({
    uri: 'https://api.sendgrid.com/v3/mail/send',
    headers: {
      Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`
    },
    json: {
      personalizations: [{
        to: [{
          email: 'info@pierluc.io'
        }],
        subject: 'Contactez-moi, pierluc.io'
      }],
      from: { email, name },
      content: [{
        type: 'text/plain',
        value: message
      }]
    }
  }, (error, response, body) => {
    if (error) {
      context.log(`Email not sent: ${error.message}`)
    }

    context.res = { body }

    context.done()
  })
}
