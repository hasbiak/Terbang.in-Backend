const helper = require('../helper/response')

const {
  postNotifModel,
  getNotifByUserIdModel,
  deleteNotifByUserIdModel
} = require('../model/notif')

module.exports = {
  postNotif: async (request, response) => {
    try {
      const { notifTitle, notifMessage, receiverId } = request.body
      const setData = {
        notifTitle,
        notifMessage,
        receiverId
      }
      const result = await postNotifModel(setData)
      return helper.response(
        response,
        200,
        'Check your notification for more info',
        result
      )
    } catch (error) {
      return helper.response(response, 400, 'Bad Request!', error)
    }
  },
  getNotifByUserId: async (request, response) => {
    try {
      const { id } = request.params
      const result = await getNotifByUserIdModel(id)
      if (result.length > 0) {
        return helper.response(response, 200, 'Success Get Notif By Id', result)
      } else {
        return helper.response(
          response,
          404,
          `Notif By User Id : ${id} Not Found`
        )
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  deleteNotifByUserId: async (request, response) => {
    try {
      const { id } = request.params
      const checkId = await getNotifByUserIdModel(id)
      if (checkId.length > 0) {
        const result = await deleteNotifByUserIdModel(id)
        return helper.response(
          response,
          200,
          'Succeed Deleting the Notification History',
          result
        )
      } else {
        return helper.response(response, 404, 'Notif is empty')
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  }
}
