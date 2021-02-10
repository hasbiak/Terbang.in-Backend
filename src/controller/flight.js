const helper = require('../helper/response')
const qs = require('querystring')
// const fs = require('fs')
const {
  postFlightModel,
  updateCapacityModel,
  getTotalCapacity,
  getFlightModel,
  getAllFlightModel,
  getFlightByIdModel,
  dataCountModel
} = require('../model/flight')

module.exports = {
  postFlight: async (req, res) => {
    try {
      const {
        mascapai,
        departureTime,
        arrivedTime,
        flightDate,
        price,
        food,
        wifi,
        luggage,
        capacity,
        clas,
        fromCity,
        fromCountry,
        toCity,
        toCountry,
        tripType,
        terminal,
        transitType,
        code
      } = req.body
      console.log(req.body)
      if (
        mascapai &&
        flightDate &&
        departureTime &&
        arrivedTime &&
        price &&
        capacity &&
        clas &&
        fromCity &&
        toCity &&
        fromCountry &&
        toCountry &&
        tripType &&
        terminal &&
        transitType
      ) {
        const setData = {
          mascapai,
          mascapaiImage: req.file === undefined ? '' : req.file.filename,
          flightDate,
          departureTime,
          arrivedTime,
          price,
          food,
          wifi,
          luggage,
          capacity,
          clas,
          fromCity,
          fromCountry,
          toCity,
          toCountry,
          tripType,
          terminal,
          transitType,
          code
        }
        const result = await postFlightModel(setData)
        return helper.response(res, 200, 'Success add new flight', result)
      } else {
        return helper.response(res, 400, 'Please fill out the form correctly')
      }
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  updateCapacity: async (req, res) => {
    try {
      const { totalPassenger, flightId } = req.body
      const cap = await getTotalCapacity(flightId)
      const a = parseInt(totalPassenger)
      const setData = {
        capacity: cap[0].capacity - a
      }
      if (totalPassenger > 10) {
        return helper.response(
          res,
          400,
          'Booking cannot be processed, you can only book for a maximum of 10 passengers'
        )
      } else {
        if (setData.capacity < 0) {
          return helper.response(
            res,
            400,
            'Sorry! This airlines id full of capacity'
          )
        } else {
          const result = await updateCapacityModel(setData, flightId)
          console.log(result)
          return helper.response(
            res,
            200,
            'Success book your flight, thank you !'
          )
        }
      }
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getFlight: async (req, res) => {
    try {
      let {
        fromCity,
        toCity,
        flightDate,
        clas,
        transitDirect,
        transit1,
        transit2,
        food,
        wifi,
        luggage,
        departureTimeStr,
        departureTimeEnd,
        arrivedTimeStr,
        arrivedTimeEnd,
        mascapai,
        priceMin,
        priceMax,
        sort,
        page,
        limit
      } = req.query

      fromCity = fromCity !== '' ? ` fromCity = '${fromCity}'` : ''
      toCity = toCity !== '' ? ` AND toCity = '${toCity}'` : ''
      flightDate = flightDate !== '' ? ` AND flightDate = '${flightDate}'` : ''
      const transitDir = transitDirect !== 0 ? " transitType = '0'" : ''
      const transit1x = transit1 !== 0 ? " transitType = '1'" : ''
      const transit2x = transit2 !== 0 ? " transitType = '2'" : ''
      const transit =
        transitDirect === '' && transit1 === '' && transit2 === ''
          ? ''
          : transitDirect === '' && transit1 === ''
          ? ` AND (${transit2x})`
          : transitDirect === '' && transit2 === ''
          ? ` AND (${transit1x})`
          : transit1 === '' && transit2 === ''
          ? `AND (${transitDir})`
          : transitDirect === ''
          ? ` AND (${transit1x} OR${transit2x})`
          : transit1 === ''
          ? ` AND (${transitDir} OR${transit2x})`
          : transit2 === ''
          ? ` AND (${transitDir} OR${transit1x})`
          : ` AND (${transitDir} OR${transit1x} OR${transit2x})`

      // console.log(transit)

      const facLuggage = luggage !== '' ? ` AND luggage = ${luggage}` : ''
      const facfood = food !== '' ? ` AND food = ${food}` : ''
      const facwifi = wifi !== '' ? ` AND wifi = ${wifi}` : ''
      const departure =
        departureTimeStr !== '' && departureTimeEnd !== ''
          ? ` AND departureTime BETWEEN '${departureTimeStr}' AND '${departureTimeEnd}'`
          : ''
      const arrived =
        arrivedTimeStr !== '' && arrivedTimeEnd !== ''
          ? ` AND arrivedTime BETWEEN '${arrivedTimeStr}' AND '${arrivedTimeEnd}'`
          : ''
      const price =
        priceMin !== '' && priceMax !== ''
          ? ` AND price BETWEEN '${priceMin}' AND '${priceMax}'`
          : ''
      const airline = mascapai !== '' ? ` AND mascapai = '${mascapai}'` : ''
      const sorting = sort === '' ? 'price' : `${sort}`

      page = parseInt(page)
      limit = parseInt(limit)

      if (fromCity === '' && toCity === '' && flightDate === '') {
        clas += ''
      } else {
        clas += ' AND '
      }
      clas +=
        clas === '1' || clas === '1 AND '
          ? '(clas = 1 OR clas = 4 OR clas = 5 OR clas = 7)'
          : clas === '2' || clas === '2 AND '
          ? '(clas = 2 OR clas = 4 OR clas = 6 OR clas = 7)'
          : clas === '3' || clas === '3 AND '
          ? '(clas = 3 OR clas = 5 OR clas = 6 OR clas = 7)'
          : '1(clas = 1 OR clas = 2 OR clas = 3 OR clas = 4 OR clas = 5 OR clas = 6 OR clas = 7)'

      const clas1 = clas.substring(1)
      console.log(clas1)

      const total = await dataCountModel(
        fromCity,
        toCity,
        flightDate,
        clas1,
        transit,
        facLuggage,
        facfood,
        facwifi,
        departure,
        arrived,
        airline,
        price,
        sorting
      )

      const totalData = total[0].total
      const totalPage = Math.ceil(totalData / limit)
      const offset = page * limit - limit
      console.log(req.query)
      const previousLink =
        page > 1 ? qs.stringify({ ...req.query, ...{ page: page - 1 } }) : null
      const nextLink =
        page < totalPage
          ? qs.stringify({ ...req.query, ...{ page: page + 1 } })
          : null
      const newPage = {
        page,
        limit,
        totalPage,
        totalData,
        nextLink: nextLink && `${process.env.URL}/flight?${nextLink}`,
        previousLink:
          previousLink && `${process.env.URL}/flight?${previousLink}`
      }
      const result = await getFlightModel(
        fromCity,
        toCity,
        flightDate,
        clas1,
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
      )
      if (result.length > 0) {
        return helper.response(
          res,
          200,
          'Success get flight !',
          result,
          newPage
        )
      } else {
        return helper.response(
          res,
          400,
          'There is no flight for that condition !',
          result
        )
      }
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getAllFlight: async (req, res) => {
    try {
      const result = await getAllFlightModel()
      return helper.response(res, 200, 'Success get all flight !', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getFlightById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await getFlightByIdModel(id)
      if (result.length > 0) {
        return helper.response(
          res,
          200,
          `Success get flight by id : ${id} !`,
          result
        )
      } else {
        return helper.response(res, 404, `There is no flight with id ${id}`)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
