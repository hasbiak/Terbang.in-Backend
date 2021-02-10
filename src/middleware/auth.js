const jwt = require('jsonwebtoken')
const helper = require('../helper/response')

module.exports = {
  authUser: (request, response, next) => {
    let token = request.headers.authorization
    // console.log(request.headers)
    // console.log(token)
    if (token) {
      token = token.split(' ')[1]
      jwt.verify(token, 'TERBANGIN', (error, result) => {
        if (
          (error && error.name === 'JsonWebTokenError') ||
          (error && error.name === 'TokenExpiredError')
        ) {
          // console.log(error)
          return helper.response(response, 400, error.message)
        } else {
          // console.log(result)
          request.token = result
          next()
        }
      })
    } else {
      return helper.response(response, 400, 'Please Login First !')
    }
  },
  authrole1: (request, response, next) => {
    console.log(request.token.role)
    if (request.token.role === 0) {
      return helper.response(
        response,
        400,
        'Not Allowed ! Page accessible by admin only'
      )
    } else {
      next()
    }
  }
}
