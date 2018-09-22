/**
 * express framework basic setup
 * for microservice REST API
 */

const createError = require('http-errors')
const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

/**
 * import express
 * import index routes
 * sticker routes
 */

const app = express()
const index = require('./routes/index')
const sticker = require('./routes/v1/sticker')

/**
 * standard usage
 */

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

/**
 * use index routes
 * use /api/v1/routes
 */

app.use('/', index)
app.use('/api/v1', sticker)

/**
 * catch 404 and forward to error handler
 */

app.use(function(req, res, next) {
  next(createError(404))
})

/**
 * error handler
 */

app.use(function(err, req, res, next) {
  res.status(err.status || 500)
  res.json({
    message: err.message,
    status: 500,
    error: req.app.get('env') === 'development' ? err : {}
  })
})

module.exports = app