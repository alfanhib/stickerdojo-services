require('dotenv').config('../.env')
const jwt             = require('jsonwebtoken')
const fs              = require('fs')
const cert            = fs.readFileSync(process.env.CERTIFICATE)
const Promise         = require('bluebird')

function errorResponse(response, error, statusCode) {
	response.status(statusCode).json({
		name: "error",
    message: error,
    time: new Date().toISOString(),
		status: statusCode
	})
}

function authenticateUser(req, res, next) {

  // Get token from request header
  const token = req.headers.authorization
  
  // Check is token exist
  const checkTokenIsExist = (token) => {
    return new Promise((resolve, reject) => {
      token
      ?
        resolve(token)
      :
        reject(errorResponse(res, "Access Token not Provided", 401))
    })
  }

  // Check scope object in a token
  const checkScopesToken = (token) => {
    return new Promise((resolve, reject) => {
      return jwt.verify(
        token,
        cert,
        (err, decoded) => {
          if(!err && decoded){
            if(decoded.scope === "access-token-user"){
              resolve(token)
            }else{
              reject(errorResponse(res, "Your token does not have permission to access",403))  
            }
          }else{
            reject(errorResponse(res, "Your token does not have permission to access",403))
          }
        }
      )
    })
  }

  // Authentication token
  const authAsync = (token) => {
    return new Promise((resolve, reject) => {
      return jwt.verify(
        token,
        cert,
        (err, decoded) => {
          err
          ?
            reject(errorResponse(res, "Authentication Failed", 500))
          :
            resolve(decoded)
        }
      )
    })
  }

  // Processing  
  return(
    checkTokenIsExist(token)
      .then(result => checkScopesToken(result))
      .then(result => authAsync(result))
      .then(decoded => {
        req.decoded = decoded
        return next()
      })
      .catch(err => console.log(err))
  )

}

module.exports = {
  authenticateUser
}