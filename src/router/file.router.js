const Router = require('koa-router')

const { verifyAuth } = require('../middleware/auth.middleware')

const {
  avatarHandler,
  pictureHandler,
  pictureResize,
} = require('../middleware/file.middleware')
const {
  saveAvatarInfo,
  savePictureInfo,
} = require('../controller/file.controller')
const uploadRouter = new Router({ prefix: '/upload' })

uploadRouter.post('/avatar', verifyAuth, avatarHandler, saveAvatarInfo)

uploadRouter.post(
  '/picture',
  verifyAuth,
  pictureHandler,
  pictureResize,
  savePictureInfo
)
module.exports = uploadRouter
