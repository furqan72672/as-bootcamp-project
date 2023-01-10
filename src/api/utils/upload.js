// multer
const fs = require('fs')
const multer = require('multer')
const imagesDir = `./src/uploads/images`

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, imagesDir)
    },
    filename: function (req, file, cb) {
        var fileExtension = file.mimetype.split("/")[1]
        if (!file.originalname.toLowerCase().match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Only image files are allowed.'))
        }
        cb(null, + Date.now() + '.' + fileExtension)
    }
  })

const upload = multer({ storage })
exports.uploadMultiple = upload.fields([{ name: 'images', maxCount: 5 }])
exports.uploadSingle = upload.single('image')

