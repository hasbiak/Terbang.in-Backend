const helper = require('../helper/response')
const redis = require('redis')
const client = redis.createClient()

module.exports = {
  getFlightByIdRedis: (request, response, next) => {
    const { id } = request.params
    client.get(`getFlightById:${id}`, (error, result) => {
      if (!error && result != null) {
        return helper.response(
          response,
          200,
          'Success Get Flight By Id',
          JSON.parse(result)
        )
      } else {
        next()
      }
    })
  }
}
