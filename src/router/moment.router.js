const Router = require('koa-router')

const momentRouter = new Router({ prefix: '/moment' })

const {
  verifyAuth,
  verifyPermission,
} = require('../middleware/auth.middleware')
const {
  create,
  detail,
  getList,
  update,
  remove,
  addLabels,
  fileInfo,
} = require('../controller/moment.controller')

const { verifyLabelExists } = require('../middleware/label.middleware')

// 发布动态
momentRouter.post('/', verifyAuth, create)

// 获取动态
momentRouter.get('/:momentId', detail)
momentRouter.get('/', getList)

// 修改动态 1.用户必须登录 2.用户具备权限
momentRouter.patch('/:momentId', verifyAuth, verifyPermission, update)
momentRouter.delete('/:momentId', verifyAuth, verifyPermission, remove)

// 给动态添加label标签
momentRouter.post(
  '/:momentId/labels',
  verifyAuth,
  verifyPermission,
  verifyLabelExists,
  addLabels
)

// 动态配图的服务
momentRouter.get('/images/:filename', fileInfo)

module.exports = momentRouter
