const Promise         = require('bluebird')
const knex            = require('./knex')
const bcrypt          = require('bcrypt')
const jwt             = require('jsonwebtoken')
const fs              = require('fs')
const cert            = fs.readFileSync('/home/muhammadisa/Desktop/Documents/Express/stickerdojo-services/stickerdojo.key')

// Response
const { 
  errorResponse,
  successResponseWithData
} = require('../response')

// Objects
const {
  accessTokenUserJwtObject
} = require('../objects')

// Global function
const generateAccessToken = (id) => {
  return jwt.sign(
    {id, scope: "access-token-user"},
    cert, accessTokenUserJwtObject
  )
}

const generateAsync = (id) => {
  return new Promise(resolve => {
    const accessToken = generateAccessToken(id)
    return resolve({accessToken})
  })
}

const decryptPassword = (data, password) => {
  return bcrypt
    .compare(password, data[0].password)
    .then(result => {
      return new Promise((resolve, reject) => {
        result
        ?
          resolve(data)
        :
          reject(errorResponse("Incorrect Password", 409))
      })
    })
}

exports.authenticateUser = (body) => {

  // Find user with email
  const findUserWithEmail = (email_address) => {
    return knex('users')
      .where('users.email_address', email_address)
  }

  // Check is user exist
  const findUserWithEmailAndCheckResult = (data) => {
    return new Promise((resolve, reject) => {
      data.length
      ?
        resolve(data)
      :
        reject(errorResponse("User with this email not found", 404))
    })
  }

  // Verify
  const verify = (body) => {
    return new Promise((resolve, reject) => {
      body.email_address && body.password
      ?
        resolve(body)
      :
        reject(errorResponse("Some field is null", 409))
    })
  }

  return(
    verify(body)
      .then(result => findUserWithEmail(result.email_address))
      .then(result => findUserWithEmailAndCheckResult(result))
      .then(result => decryptPassword(result, body.password))
      .then(result => generateAsync(result))
      .then(result => successResponseWithData(result, "Login Successfully", "POST", 200))
      .catch(error => error)
  )

}