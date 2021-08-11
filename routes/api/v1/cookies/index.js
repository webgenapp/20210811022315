const express = require('express')
const router = express.Router()
const { Cookie } = require('../../../../models')
const { auth } = require('../../../../middlewares/auth')

router.get('/', auth, async function (req, res, next) {
  const cookies = await Cookie.findAll()

  res.send(cookies)
})

router.get('/:id', auth, async function (req, res, next) {
  const { id } = req.params
  const cookie = await Cookie.findOne({ where: { id } })

  res.send(cookie)
})

router.post('/', auth, async function (req, res, next) {
  const cookie = await Cookie.build({
    ...req.body,
  }).save()

  res.status(201)
  res.send(cookie)
})

router.delete('/:id', auth, async function (req, res, next) {
  const { id } = req.params
  await Cookie.destroy({ where: { id } })

  res.status(204)
  res.send()
})

router.put('/:id', auth, async function (req, res, next) {
  const { id } = req.params
  const cookie = await Cookie.findOne({ where: { id } })

  cookie.flavour = req.body.flavour

  cookie.save()

  res.send(cookie)
})

module.exports = router
