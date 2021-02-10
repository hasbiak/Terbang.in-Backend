const router = require('express').Router()
const {
  postNotif,
  getNotifByUserId,
  deleteNotifByUserId
} = require('../controller/notif')
const { authUser } = require('../middleware/auth')

router.get('/:id', authUser, getNotifByUserId)
router.post('/post', authUser, postNotif)
router.delete('/:id', authUser, deleteNotifByUserId)

module.exports = router
