const express = require('express')
const Promise = require('bluebird')
const router = express.Router()

// Dispatchers
const { 
  getStickers,
  createSticker
} = require('../../dispatchers/sticker')

router.post("/sticker/upload", (req, res, next) => {
  Promise.try(() => createSticker(req.body))
    .then(result => res.status(201).json(result))
    .catch(err => console.log("Error on POST_STICKERS", err))
})

router.get("/stickers", (req, res, next) => {
  Promise.try(() => getStickers())
    .then(result => res.status(200).json(result))
    .catch(err => console.log("Error on GET_ALL_STICKERS", err))
})

module.exports = router