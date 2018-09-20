const Promise         = require('bluebird')
const knex            = require('./knex')
const bcrypt          = require('bcrypt')
const uuid            = require('uuid/v1')

// Response
const { 
  errorResponse,
  successResponseWithData,
  successResponseWithoutData
} = require('../response')

// Global Function
const encryptPassword = (data) => {
  return bcrypt
    .hash(data.password, 10)
    .then(hash => hash)
    .catch(() => errorResponse("Internal server error", 500))
}

const decryptPassword = (password, hashedPassword) => {
  return bcrypt
    .compare(password, hashedPassword)
    .then(result => result)
    .catch(() => errorResponse("Internal server error", 500))
}

exports.registerUser = (body) => {

  // Get current time
  const currentTime = new Date().toISOString()

  // Store new user to database
  const registerUserAsync = (body, hashedPassword) => {
    return knex('users')
      .insert({
        id: uuid(),
        email_address: body.email_address,
        password: hashedPassword,
        first_name: body.first_name,
        last_name: body.last_name,
        username: body.username,
        about: body.about,
        job: body.job,
        ages: body.ages,
        create_at: currentTime,
        modify_at: currentTime
      })
  }
  
  // Check email availability
  const checkEmailAvailability = (item) => {
    return knex('users')
      .where('users.email_address', item.email_address)
      .then(result => result)
      .catch(() => errorResponse("Internal server error", 500))
  }

  // Check email availability result
  const checkEmailAvailabilityAsync = (data) =>{
    return new Promise((resolve, reject) => {
      data.length
      ?
        reject(errorResponse("Email already used", 409))
      :
        resolve(data)
    })
  }

  // Verify
  const verify = (item) => {
    return new Promise((resolve, reject) => {
      item.email_address && item.first_name
      item.last_name && item.username
      item.about && item.job && item.ages
      ?
        resolve(item)
      :
        reject(errorResponse("Some field is null", 409))
    })
  }

  // Processing
  return(
    verify(body)
      .then(result => checkEmailAvailability(result))
      .then(result => checkEmailAvailabilityAsync(result))
      .then(() => encryptPassword(body))
      .then(hashedPassword => registerUserAsync(body, hashedPassword))
      .then(id => successResponseWithData(id, "New user has been registered", "POST", 201))
      .catch(error => error)
  )

}

exports.getUsers = () => {

  // Get all users
  const getUsers = () => {
    return knex('users')
      .then(result => result)
      .catch(() => errorResponse("Internal server error", 500))
  }

  // Check is users are exist
  const getUsersAndCheckResult = (data) => {
    return new Promise((resolve, reject) => {
      data.length
      ?
        resolve(data)
      :
        reject(errorResponse("Empty table or there is no users founded", 404))
    })
  }

  // Processing
  return(
    getUsers()
      .then(result => getUsersAndCheckResult(result))
      .then(result => successResponseWithData(result, "Successfully get all users", "GET", 200))
      .catch(error => error)
  )

}

exports.getUserByUUID = (uuid) => {

  const uuidValidator = new RegExp(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)

  // Get user with UUID
  const getUserByUUID = (uuid) => {
    return knex('users')
      .where('users.id', uuid)
  }

  // Check is user is exist
  const getUserByUUIDAndCheckResult = (data, uuid) => {
    return new Promise((resolve, reject) => {
      data.length
      ?
        resolve(data)
      :
        reject(errorResponse(`User with ${uuid} not founded`, 404))
    })
  }

  // Verify entered uuid
  const verify = (uuid) => {
    return new Promise((resolve, reject) => {
      uuid.length == 36 && uuidValidator.test(uuid)
      ?
        resolve(uuid)
      :
        reject(errorResponse("Invalid uuid sorry", 409))
    })
  }

  // Processing
  return(
    verify(uuid)
      .then(result => getUserByUUID(result))
      .then(result => getUserByUUIDAndCheckResult(result, uuid))
      .then(result => successResponseWithData(result, "Successfully get user", "GET", 200))
      .catch(error => error)
  )

}

exports.deleteUser = (uuid) => {

  const uuidValidator = new RegExp(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)

  // Search user by UUID
  const findingUserByUUID = (uuid) => {
    return knex('users')
      .where('users.id', uuid)
  }

  // Delete User by UUID
  const deleteUser = (uuid) => {
    return knex('users')
      .where('users.id', uuid)
      .del()
  }

  // Check is user is exist
  const findingUserByUUIDAndCheckResult = (data, uuid) => {
    return new Promise((resolve, reject) => {
      data.length
      ?
        resolve(data)
      :
        reject(errorResponse(`Delete Operation cannot be continue because there is no user with uuid ${uuid}`, 404))
    })
  }

  // Verify entered uuid
  const verify = (uuid) => {
    return new Promise((resolve, reject) => {
      uuid.length == 36 && uuidValidator.test(uuid)
      ?
        resolve(uuid)
      :
        reject(errorResponse("Invalid uuid sorry", 409))
    })
  }

  // Processing
  return(
    verify(uuid)
      .then(result => findingUserByUUID(result))
      .then(result => findingUserByUUIDAndCheckResult(result, uuid))
      .then(result => result ? deleteUser(uuid) : errorResponse(`Delete Operation cannot be continue because there is no user with uuid ${uuid}`, 404))
      .then(() => successResponseWithoutData("Successfully Delete user", "DELETE", 201))
      .catch(error => error)
  )

}

exports.updateEmail = (body) => {

  // Get user which want to edit
  const findingUserByUUID = (uuid) => {
    return knex('users')
      .where('users.id', uuid)
  }

  // Get user which want to edit
  const findingUserByUUIDAndCheckResult = (data) => {
    return new Promise((resolve, reject) => {
      data.length
      ?
        resolve(data)
      :
        reject(errorResponse(`Delete Operation cannot be continue because there is no user with uuid ${uuid}`, 404))
    })
  }

  // Edit user
  const editUsersEmailAddress = (uuid, new_email_address) => {

    const currentTime = new Date().toISOString()

    return knex('users')
      .where('users.id', uuid)
      .update({
        email_address: new_email_address,
        modify_at: currentTime
      })
  }

  // Verify
  const verify = (body) => {
    return new Promise((resolve, reject) => {
      body.password && body.hashed_password && body.email_address
      ?
        resolve(body)
      :
        reject(errorResponse("Some field is null", 409))
    })
  }

  return(
    verify(body)
  )

}

exports.updatePassowrd = (uuid, password) => {

}

exports.updateUser = (uuid) => {

}