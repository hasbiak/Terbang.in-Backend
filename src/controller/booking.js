const {
  createPayment,
  postBooking,
  postDataPassenger,
  getDataByBookingId,
  getDataBookingByUserId,
  patchStatusBooking,
  getBookingDetail,
  getDataBookingDetail,
  getAllDataBookingModel,
  checkBookingId,
  patchBoardingStatus
} = require('../model/booking')
const helper = require('../helper/response')
const midtransClient = require('midtrans-client')

module.exports = {
  postBooking: async (req, res) => {
    try {
      const data = req.body
      let result

      for (let i = 0; i < data.length; i++) {
        if (i === 0) {
          const {
            userId,
            flightId,
            totalPassenger,
            totalPayment,
            contactFullName,
            contactEmail,
            contactNumber
          } = data[0]

          if (contactFullName && contactEmail && contactNumber) {
            const setData = {
              userId,
              flightId,
              totalPassenger,
              contactFullName,
              contactEmail,
              contactNumber,
              totalPayment,
              paymentStatus: 0,
              code: require('crypto').randomBytes(8).toString('hex'),
              createdAt: new Date()
            }
            result = await postBooking(setData)
          } else {
            return helper.response(res, 400, 'Please fill out the form first!')
          }
        } else {
          const { title, fullName, nationality } = data[i]

          if (title && fullName && nationality) {
            const setDataPassenger = {
              bookingId: result.bookingId,
              title,
              fullName,
              nationality
            }
            await postDataPassenger(setDataPassenger)
          } else {
            return helper.response(res, 400, 'Please, fill out the form first')
          }
        }
      }
      const bookingId = result.bookingId
      const totalPayment = result.totalPayment
      const booking = await createPayment(bookingId, totalPayment)
      const url = {}
      url.midtransUrl = booking
      return helper.response(res, 200, 'Success booking! Enjoy your trip!', [
        result,
        url
      ])
    } catch (error) {
      return helper.response(res, 400, 'Bad Request!', error)
    }
  },
  getDataBookingByUserId: async (req, res) => {
    try {
      const { id } = req.params
      const result = await getDataBookingByUserId(id)
      if (result.length > 0) {
        return helper.response(
          res,
          200,
          `Success get data booking by id user ${id}`,
          result
        )
      } else {
        return helper.response(res, 404, "You haven't booked any ticket!")
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request!', error)
    }
  },
  getAllDataBooking: async (req, res) => {
    try {
      const result = await getAllDataBookingModel()
      return helper.response(res, 200, 'Success get all data booking', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request!', error)
    }
  },
  getBookingDetail: async (req, res) => {
    try {
      const { id } = req.params
      const checkBookingId = await getDataBookingDetail(id)
      if (checkBookingId.length > 0) {
        const result = await getBookingDetail(id)
        return helper.response(
          res,
          200,
          `Success get detail booking by booking id: ${id}`,
          result
        )
      } else {
        return helper.response(res, 404, `ID ${id} is not found!`)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request!', error)
    }
  },
  patchStatusBooking: async (req, res) => {
    try {
      let { userId, id } = req.query
      userId = parseInt(userId)
      id = parseInt(id)
      const checkUserId = await getDataBookingByUserId(userId)
      const checkBookingId = await getDataByBookingId(id, userId)
      if (checkUserId.length > 0) {
        if (checkBookingId.length > 0) {
          const setData = {
            paymentStatus: 1,
            updatedAt: new Date()
          }
          const resultPatch = await patchStatusBooking(setData, id)
          console.log(resultPatch)
          return helper.response(res, 200, 'Booking Succeeded!', resultPatch)
        } else {
          return helper.response(
            res,
            404,
            `There is no data booking id: ${id} for user id: ${userId}!`
          )
        }
      } else {
        return helper.response(res, 404, "You haven't booked any ticket!")
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request!', error)
    }
  },
  postMidtransNotif: async (request, response) => {
    try {
      const snap = new midtransClient.Snap({
        isProduction: false,
        clientKey: 'SB-Mid-client-3ReA74BDVu_-3aqu',
        serverKey: 'SB-Mid-server-FOMwVHyJWnxkEkuLKkW9lIMi'
      })
      console.log('config Snap')
      snap.transaction
        .notification(request.body)
        .then(async (statusResponse) => {
          console.log(statusResponse)
          const orderId = statusResponse.order_id
          const transactionStatus = statusResponse.transaction_status
          const fraudStatus = statusResponse.fraud_status
          console.log(
            `Transaction notification received. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}`
          )
          if (transactionStatus === 'capture') {
            if (fraudStatus === 'challenge') {
              console.log('challenge')
              return helper.response(response, 400, 'Failed!')
            } else if (fraudStatus === 'accept') {
              const setData = {
                paymentStatus: 1,
                updatedAt: new Date()
              }
              const resultPatch = await patchStatusBooking(setData, orderId)

              return helper.response(
                response,
                200,
                'Booking Succeeded!',
                resultPatch
              )
            }
          } else if (transactionStatus === 'settlement') {
            const setData = {
              paymentStatus: 1,
              updatedAt: new Date()
            }
            const resultPatch = await patchStatusBooking(setData, orderId)

            return helper.response(
              response,
              200,
              'Booking Succeeded!',
              resultPatch
            )
          } else if (transactionStatus === 'deny') {
            console.log('deny')
            return helper.response(response, 400, 'Denied!')
          } else if (
            transactionStatus === 'cancel' ||
            transactionStatus === 'expire'
          ) {
            return helper.response(response, 400, 'Failed!')
          } else if (transactionStatus === 'pending') {
            return helper.response(response, 400, 'Pending!')
          }
        })
    } catch (error) {
      return helper.response(response, 400, 'Bad Request!', error)
    }
  },
  patchBoardingStatus: async (req, res) => {
    try {
      const { id } = req.params
      const checkBookingID = await checkBookingId(id)
      console.log(checkBookingID)
      if (checkBookingID.length > 0) {
        if (checkBookingID[0].boardingStatus === 1) {
          return helper.response(
            res,
            400,
            'Boarding pass is already scaned !, !!! ILEGAL PASSENGER !!!'
          )
        } else {
          const setStatus = {
            boardingStatus: 1
          }
          const result = await patchBoardingStatus(setStatus, id)
          return helper.response(
            res,
            200,
            'Boarding pass is scaned !, enjoy your trip',
            result
          )
        }
      } else {
        return helper.response(res, 400, 'Boarding pass error !')
      }
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, 'Bad Request!', error)
    }
  }
}
