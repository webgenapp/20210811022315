const express = require('express')
const router = express.Router()

const cookiesRouter = require('./cookies')
router.use('/cookies', cookiesRouter)

const usersRouter = require('./users')
router.use('/users', usersRouter)

module.exports = router
