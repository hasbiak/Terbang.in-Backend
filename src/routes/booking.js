const router = require('express').Router()
const {
  postMidtransNotif,
  postBooking,
  patchStatusBooking,
  getDataBookingByUserId,
  getBookingDetail,
  getAllDataBooking,
  patchBoardingStatus
} = require('../controller/booking')
const { authUser, authrole1 } = require('../middleware/auth')

router.get('/detail/:id', authUser, getBookingDetail)
router.get('/:id', authUser, getDataBookingByUserId)
router.get('/', authUser, authrole1, getAllDataBooking)
router.post('/book', authUser, postBooking)
router.post('/midtrans-notification', postMidtransNotif)
router.patch('/book/', authUser, patchStatusBooking)
router.patch('/boarding-status/:id', authUser, patchBoardingStatus)

module.exports = router
