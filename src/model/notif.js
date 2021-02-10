const connection = require('../config/mysql')

module.exports = {
  postNotifModel: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO notif SET ?', setData, (error, result) => {
        if (!error) {
          const newResult = {
            ...setData
          }
          resolve(newResult)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  getNotifByUserIdModel: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM notif WHERE receiverId = ? ORDER BY createdAt DESC ',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  deleteNotifByUserIdModel: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'DELETE FROM notif WHERE receiverId = ?',
        id,
        (error, result) => {
          if (!error) {
            const newResult = {
              user_id: id,
              result
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
