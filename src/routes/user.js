const router = require('express').Router()
const {
  login,
  register,
  getuserbyId,
  patchimg,
  forgotPassword,
  resetPassword,
  changePassword,
  deleteImg,
  settings
} = require('../controller/user')
const { authUser } = require('../middleware/auth')
const uploadImage = require('../middleware/multerUser')
// ==> Auth  <== //
router.post('/login', login)
router.post('/register', register)
router.post('/forgot', forgotPassword)
router.post('/reset', resetPassword)
router.patch('/changePassword', changePassword)
// ==> User <==
router.get('/:id', authUser, getuserbyId)
router.patch('/settings/:id', authUser, settings)
router.patch('/img/:id', authUser, uploadImage, patchimg)
router.delete('deleteImg/:id', authUser, deleteImg)
module.exports = router
