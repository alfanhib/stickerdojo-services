const express = require('express')
const Promise = require('bluebird')
const router = express.Router()

// Dispatchers
const { 
  getUsers, 
  getUserByUUID,
  deleteUser,
  registerUser,
  updateEmail,
  updatePassowrd,
  updateUser
} = require('../../dispatchers/users')

// Middlewares
const {
  authenticateUser
} = require('../../middlewares/authenticate')

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
router.get('/users', authenticateUser, (req, res, next) => {
  Promise.try(() => getUsers())
    .then(response => res.status(response.status).json(response))
    .catch(err => console.log("Error on GET_ALL_USERS", err))
})

// Get or Fetch singgle user
router.get('/user/:uuid', authenticateUser, (req, res, next) => {
  Promise.try(() => getUserByUUID(req.params.uuid))
    .then(response => res.status(response.status).json(response))
    .catch(err => console.log("Error on GET_USER", err))
})

// Delete or Remove user
router.delete('/user/close-account/:uuid', authenticateUser, (req, res, next) => {
  Promise.try(() => deleteUser(req.params.uuid))
    .then(response => res.status(response.status).json(response))
    .catch(err => console.log("Error on DELETE_USER", err))
})

// Update email address
router.put('/user/update-email', authenticateUser, (req, res, next) => {
  Promise.try(() => updateEmail(req.body))
    .then(response => res.status(response.status).json(response))
    .catch(err => console.log("Error on UPDATE_EMAIL_USER", err))
})

// Update password
router.put('/user/update-password/:uuid', authenticateUser, (req, res, next) => {
  Promise.try(() => updatePassowrd(req.params.uuid, req.body))
    .then(response => res.status(response.status).json(response))
    .catch(err => console.log("Error on UPDATE_PASSWORD_USER", err))
})

// Update profile
router.put('/user/update-profile/:uuid', authenticateUser, (req, res, next) => {
  Promise.try(() => updateUser(req.params.uuid, req.body))
    .then(response => res.status(response.status).json(response))
    .catch(err => console.log("Error on UPDATE_USER_PROFILE_USER", err))
})

module.exports = router