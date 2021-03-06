const request = require('request')
const qs = require('qs')
const contentType = require('content-type')

const TOKEN_ENDPOINT = 'https://tokens.indieauth.com/token'
const ME = 'https://bret.io/'

function micropub (event, context, cb) {
  const bearer = event.headers.authorization
  console.log('**********************NEW REQUEST*************************')
  console.log(event)

  if (!bearer) return cb(null, { statusCode: 401, body: 'Missing bearer token' })

  request({
    url: TOKEN_ENDPOINT,
    headers: {
      'Authorization': bearer,
      Accept: 'application/json'
    }
  }, handleVerify)

  function handleVerify (err, resp, body) {
    if (err) {
      console.error(err)
      return cb(null, { statusCode: 500, body: 'Unknown error' })
    }

    console.log('Token endpoint: ' + resp.statusCode)

    let info
    try {
      info = JSON.parse(body)
    } catch (e) {
      console.error(e)
      return cb(null, { statusCode: 500, body: 'Token endpoint error' })
    }
    console.log(info)

    if (resp.statusCode !== 200) return cb(null, { statusCode: 401, body: 'Not authorized' })

    if (info.me !== ME) return cb(null, {statusCode: 401, 'body': 'Not authorized'})

    return processRequest(info)
  }

  function processRequest (info) {
    const cType = contentType.parse(event.headers['content-type'])

    switch (cType.type) {
      case 'application/x-www-form-urlencoded': {
        return cb(null, { statusCode: 200, 'body': 'Authorized!' })
      }
      default: {
        return cb(null, {statusCode: 400, 'body': 'Unhandled content type: ' + cType.type})
      }
    }
  }
}

exports.handler = micropub
