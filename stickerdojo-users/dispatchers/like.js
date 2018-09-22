const Promise         = require('bluebird')
const knex            = require('./knex')
const bcrypt          = require('bcrypt')
const uuid            = require('uuid/v1')
const NestHydrationJS = require("nesthydrationjs")()

// Response
const { 
  errorResponse,
  successResponseWithData,
  successResponseWithoutData
} = require('../response')

exports.postLikeToSticker = (body) => {

  const currentTime = new Date().toISOString()

  const postLike = (body) => {
    return knex('sticker_like')
      .insert({
        sticker_like_id: uuid(),
        name: body.name,
        sticker_id: body.sticker_id,
        user_id: body.user_id,
        create_at: currentTime,
        modify_at: currentTime
      })
  }

  const checkIsAlreadyLike = (user_id, sticker_id) => {
    return knex('sticker_like')
      .where({
        user_id: user_id,
        sticker_id: sticker_id
      })
      .then(result => result)
  }

  const checkIsAlreadyLikeAndCheckResult = (data) => {
    return new Promise((resolve, reject) => {
      data.length
      ?
        reject(errorResponse("You already like this sticker", 409))
      :
        resolve(data)
    })
  }

  const verify = (body) => {
    return new Promise((resolve, reject) => {
      body.name &&
      body.sticker_id &&
      body.user_id
      ?
        resolve(body)
      :
        reject(errorResponse("Some field is null", 409))
    })
  }

  return(
    verify(body)
      .then(result => checkIsAlreadyLike(result.user_id, result.sticker_id))
      .then(result => checkIsAlreadyLikeAndCheckResult(result))
      .then(() => postLike(body))
      .then(result => successResponseWithData(result, "Successfully post like to sticker", "POST", 201))
      .catch(error => error)
  )

}