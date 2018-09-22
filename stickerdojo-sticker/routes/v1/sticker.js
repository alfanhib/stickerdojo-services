const express = require('express')
const Promise = require('bluebird')
const router = express.Router()

router.get("/stickers", (req, res, next) => {
  res.status(200).json({
    message: "Sticker routes is working"
  })
})

module.exports = router