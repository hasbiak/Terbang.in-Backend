const multer = require('multer')
const helper = require('../helper/response')
// ========================================================================================
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/user')
  },
  filename: function (req, file, cb) {
    console.log(file)
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
  }
})
// =========================================================================================
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/jpg'
  ) {
    cb(null, true)
  } else {
    cb(new Error('File must be .PNG or .JPG'), false)
  }
}
const maxSize = 1 * 1024 * 1024
const upload = multer({
  storage,
  limits: { fileSize: maxSize },
  fileFilter
}).single('profileImage')
// =========================================================================================
const uploadFilter = (req, res, next) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return helper.response(res, 400, err.message)
    } else if (err) {
      return helper.response(res, 400, err.message)
    }
    next()
  })
}

module.exports = uploadFilter
