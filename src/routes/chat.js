const router = require('express').Router()

const {
  createRoom,
  getRoom,
  getRoom2User,
  sendMessage,
  getMessage,
  getAdmin
} = require('../controller/chat')
const { authUser } = require('../middleware/auth')

router.get('/room/:id', authUser, getRoom)
router.get('/rooms', authUser, getRoom2User)
router.get('/admin', authUser, getAdmin)
router.post('/room', authUser, createRoom)
router.post('/message', authUser, sendMessage)
router.get('/message/:id', authUser, getMessage)

module.exports = router
