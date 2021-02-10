const connection = require('../config/mysql')
const midtransClient = require('midtrans-client')

module.exports = {
  createPayment: (bookingId, totalPayment) => {
    return new Promise((resolve, reject) => {
      const snap = new midtransClient.Snap({
        isProduction: false,
        clientKey: 'SB-Mid-client-3ReA74BDVu_-3aqu',
        serverKey: 'SB-Mid-server-FOMwVHyJWnxkEkuLKkW9lIMi'
      })
      const parameter = {
        transaction_details: {
          order_id: bookingId,
          gross_amount: totalPayment
        },
        credit_card: {
          secure: true
        }
      }
      snap
        .createTransaction(parameter)
        .then((transaction) => {
          // url deploy
          const redirectUrl = transaction.redirect_url
          resolve(redirectUrl)
        })
        .catch((error) => {
          console.log(error)
          reject(error)
        })
    })
  },
  postBooking: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO booking SET ?', setData, (err, result) => {
        const newResult = {
          bookingId: result.insertId,
          ...setData
        }
        if (!err) {
          resolve(newResult)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  postDataPassenger: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO passenger SET ?',
        setData,
        (err, result) => {
          const newResult = {
            ...setData
          }
          if (!err) {
            resolve(newResult)
          } else {
            reject(new Error(err))
          }
        }
      )
    })
  },
  patchStatusBooking: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `UPDATE booking SET ? WHERE bookingId=${id}`,
        setData,
        (error, result) => {
          console.log(error)
          if (!error) {
            const newResult = {
              ...setData
            }
            resolve(newResult)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  },
  getDataByBookingId: (id, userId) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM booking WHERE bookingId=${id} AND userId=${userId} AND paymentStatus=0`,
        (error, result) => {
          if (!error) {
            resolve(result)
          } else {
            reject(error)
          }
        }
      )
    })
  },
  getAllDataBookingModel: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT bookingId, booking.code, booking.userId, booking.contactFullname, flight.mascapai,booking.totalPayment, booking.createdAt FROM booking JOIN flight ON booking.flightId = flight.flightId WHERE paymentStatus=0 ORDER BY booking.createdAt DESC',
        (error, result) => {
          if (!error) {
            resolve(result)
          } else {
            reject(error)
          }
        }
      )
    })
  },
  getDataBookingDetail: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM booking WHERE bookingId=${id}`,
        (error, result) => {
          if (!error) {
            resolve(result)
          } else {
            reject(error)
          }
        }
      )
    })
  },
  getDataBookingByUserId: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT booking.bookingId, booking.userId, booking.flightId, booking.totalPassenger, booking.totalPayment, booking.paymentStatus, booking.contactFullName, booking.contactEmail, booking.contactNumber, booking.code, mascapai, fromCountry, fromCity, toCountry, toCity, flight.code AS flightCode, flightDate, departureTime, booking.createdAt, booking.updatedAt FROM booking JOIN flight ON booking.flightId=flight.flightId WHERE userId=${id} ORDER BY booking.createdAt DESC `,
        (error, result) => {
          if (!error) {
            resolve(result)
          } else {
            reject(error)
          }
        }
      )
    })
  },
  getBookingDetail: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT mascapai, mascapaiImage, fromCountry, toCountry, clas, departureTime, booking.bookingId, booking.code FROM booking JOIN flight ON booking.flightId=flight.flightId WHERE bookingId=${id}`,
        (error, result) => {
          if (!error) {
            resolve(result)
          } else {
            reject(error)
          }
        }
      )
    })
  },
  checkBookingId: (bookingId) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM booking WHERE bookingId=${bookingId}`,
        (error, result) => {
          if (!error) {
            resolve(result)
          } else {
            reject(error)
          }
        }
      )
    })
  },
  patchBoardingStatus: (setStatus, bookingId) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `UPDATE booking SET ? WHERE bookingId=${bookingId}`,
        setStatus,
        (error, result) => {
          if (!error) {
            const newResult = {
              ...setStatus
            }
            resolve(newResult)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  }
}
