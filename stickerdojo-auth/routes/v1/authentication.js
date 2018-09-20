const express = require('express')
const Promise = require('bluebird')
const router = express.Router()

// Dispatchers
const { 
  authenticateUser
} = require('../../dispatchers/authentication')

router.post('/user/auth', (req, res, next) => {
  Promise.try(() => authenticateUser(req.body))
    .then(response => res.status(response.status).json(response))
    .catch(err => console.log("Error on POST_USER_AUTHENTICATION", err))
})

module.exports = router