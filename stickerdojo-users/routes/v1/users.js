const express = require('express')
const Promise = require('bluebird')
const router = express.Router()

// Dispatchers
const { 
  getUsers, 
  getUserByUUID,
  deleteUser,
  registerUser,
  updateEmail
} = require('../../dispatchers/users')

/**
 * End Points
 * 
 * POST     localhost:3000/api/v1/user/register               (registration)
 * GET      localhost:3000/api/v1/users                       (fetch users)
 * GET      localhost:3000/api/v1/user/:uuid                  (fetch user)
 * DELETE   localhost:3000/api/v1/user/close-account/:uuid    (delete or destroy user)
 * PUT      localhost:3000/api/v1/user/update-email/:uuid     (change email user)
 * PUT      localhost:3000/api/v1/user/update-password/:uuid  (change password user)
 */

// Register users
router.post('/user/register', (req, res, next) => {
  Promise.try(() => registerUser(req.body))
    .then(response => res.status(response.status).json(response))
    .catch(err => console.log("Error on POST_USER", err))
})

// Get or Fetch all users
router.get('/users', (req, res, next) => {
  Promise.try(() => getUsers())
    .then(response => res.status(response.status).json(response))
    .catch(err => console.log("Error on GET_ALL_USERS", err))
})

// Get or Fetch singgle user
router.get('/user/:uuid', (req, res, next) => {
  Promise.try(() => getUserByUUID(req.params.uuid))
    .then(response => res.status(response.status).json(response))
    .catch(err => console.log("Error on GET_USER", err))
})

// Delete or Remove user
router.delete('/user/close-account/:uuid', (req, res, next) => {
  Promise.try(() => deleteUser(req.params.uuid))
    .then(response => res.status(response.status).json(response))
    .catch(err => console.log("Error on DELETE_USER", err))
})

// Update email address
router.post('/user/update-email', (req, res, next) => {
  Promise.try(() => updateEmail(req.body))
    .then(response => res.status(response.status).json(response))
    .catch(err => console.log("Error on UPDATE_EMAIL_USER", err))
})

module.exports = router