const jwt             = require('jsonwebtoken')
const fs              = require('fs')
const cert            = fs.readFileSync('/home/muhammadisa/Desktop/Documents/Express/stickerdojo-services/stickerdojo.key')
const Promise         = require('bluebird')

const {
  errorResponse
} = require('../response')

function authenticateUser(req, res, next) {

  const token = req.header.authorization
  
  const checkTokenIsExist = () => {
    return new Promise((resolve, reject) => {
      token
      ?
        resolve(token)
      :
        reject(errorResponse("Access Token not Provided", 401))
    })
  }

  const checkScopesToken = (token) => {

  }

}