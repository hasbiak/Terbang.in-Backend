const connection = require('../config/mysql')

module.exports = {
  postFlightModel: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO flight SET ?', setData, (error, result) => {
        if (!error) {
          const newResult = {
            flightId: result.insertId,
            ...setData
          }
          resolve(newResult)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  getTotalCapacity: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT capacity, mascapaiImage FROM flight WHERE flightId = ${id}`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  updateCapacityModel: (setData, flightId) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE flight SET ? WHERE flightId = ?',
        [setData, flightId],
        (error, result) => {
          if (!error) {
            const newResult = {
              flightId: flightId,
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
  getFlightModel: (
    fromCity,
    toCity,
    flightDate,
    clas,
    transit,
    facLuggage,
    facfood,
    facwifi,
    departure,
    arrived,
    airline,
    price,
    sorting,
    limit,
    offset
  ) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM flight WHERE ${fromCity}${toCity}${flightDate}${clas}${transit}${facLuggage}${facfood}${facwifi}${departure}${arrived}${airline}${price} ORDER BY ${sorting} LIMIT ${limit} OFFSET ${offset}`,
        (error, result) => {
          console.log(error)
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getAllFlightModel: (limit, offset) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM flight LIMIT ${limit} OFFSET ${offset}`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getFlightByIdModel: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM flight WHERE flightId = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  dataCountModel: (
    fromCity,
    toCity,
    flightDate,
    clas,
    transit,
    facLuggage,
    facfood,
    facwifi,
    departure,
    arrived,
    airline,
    price,
    sorting
  ) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT COUNT(*) AS total FROM flight WHERE ${fromCity}${toCity}${flightDate}${clas}${transit}${facLuggage}${facfood}${facwifi}${departure}${arrived}${airline}${price} ORDER BY ${sorting}`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  allDataCountModel: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT COUNT(*) AS totalData FROM flight',
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  }
}
