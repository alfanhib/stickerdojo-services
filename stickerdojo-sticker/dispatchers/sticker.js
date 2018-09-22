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

// Definitions
const {
  stickerDefinition
} = require('../definitions/sticker')

// https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png
// https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Node.js_logo_2015.svg/2000px-Node.js_logo_2015.svg.png

exports.createSticker = (body) => {

  // Get current time
  const currentTime = new Date().toISOString()

  // Upload new sticker
  const createSticker = (body) => {
    return knex('sticker')
      .insert({
        sticker_id: uuid(),
        user_id: body.user_id,
        title: body.title,
        description: body.description,
        prices: body.prices,
        image_url: body.image_url,
        create_at: currentTime,
        modify_at: currentTime,
      })
  }

  // Verify
  const verify = (body) => {
    return new Promise((resolve, reject) => {
      body.user_id &&
      body.title &&
      body.description &&
      body.prices &&
      body.image_url
      ?
        resolve(body)
      :
        reject(errorResponse("Some field is null", 409))
    })
  }

  // Processing
  return(
    verify(body)
      .then(result => createSticker(result))
      .then(result => successResponseWithData(result, "Successfully upload new sticker", "POST", 201))
      .catch(result => result)
  )

}

exports.getStickers = () => {
  
  // Get all sticker from database
  const getStickers = () => {
    return knex('sticker')
      .innerJoin(
        "users",
        "sticker.user_id", "users.id"
      )
      .innerJoin(
        "sticker_like",
        "sticker.sticker_id","sticker_like.sticker_id"
      )
      .then(result => result)
      .catch(() => errorResponse("Internal server error", 500))
  }

  // Check is sticker exists
  const getStickersAndCheckResult = (data) => {
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
    getStickers()
      .then(result => getStickersAndCheckResult(result))
      .then(result => NestHydrationJS.nest(result, stickerDefinition))
      .then(result => successResponseWithData(result, "Successfully get all stickers", "GET", 200))
      .catch(error => error)
  )

}