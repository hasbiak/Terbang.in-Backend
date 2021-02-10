const connection = require('../config/mysql')

module.exports = {
  createRoomModel: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO roomchat SET ?',
        setData,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  checkRoomModel: (a, b) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM roomchat WHERE sender = ? AND receiver = ?',
        [a, b],
        (error, result) => {
          if (!error) {
            resolve(result)
          } else {
            console.log(error)
            reject(new Error(error))
          }
        }
      )
    })
  },
  getRoomModel: (userId) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT roomIdUniq, user.userId,  user.fullName , user.profileImage FROM roomchat RIGHT JOIN user ON user.userId = receiver WHERE sender = ? ',
        [userId],
        (error, result) => {
          if (!error) {
            resolve(result)
          } else {
            console.log(error)
            reject(new Error(error))
          }
        }
      )
    })
  },
  getRoom2UserModel: (sender, receiver) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * from roomchat WHERE sender = ? AND receiver = ? ',
        [sender, receiver],
        (error, result) => {
          if (!error) {
            resolve(result)
          } else {
            console.log(error)
            reject(new Error(error))
          }
        }
      )
    })
  },
  getAdminModel: (userId) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM user  WHERE role = 1 ',
        [userId],
        (error, result) => {
          if (!error) {
            resolve(result)
          } else {
            console.log(error)
            reject(new Error(error))
          }
        }
      )
    })
  },
  sendMessageModel: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO chat SET ?', setData, (error, result) => {
        !error ? resolve((result = setData)) : reject(new Error(error))
      })
    })
  },
  getMessageModel: (userId) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT roomIdUniq, user.userId, user.fullName , chat.createdAt, message ,user.profileImage FROM chat RIGHT JOIN user ON user.userId = sender WHERE roomIdUniq = ?',
        [userId],
        (error, result) => {
          if (!error) {
            resolve(result)
          } else {
            console.log(error)
            reject(new Error(error))
          }
        }
      )
    })
  },
  getLastMessageModel: (a) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT message, createdAt FROM chat WHERE roomIdUniq = ? ORDER BY createdAt DESC LIMIT 1',
        [a],
        (error, result) => {
          if (!error) {
            resolve(result)
          } else {
            console.log(error)
            reject(new Error(error))
          }
        }
      )
    })
  }
}
