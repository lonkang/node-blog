const Router = require('koa-router')

const commentRouter = new Router({ prefix: '/comment' })
const {
  create,
  reply,
  update,
  remove,
  getList,
} = require('../controller/comment.controller')
const {
  verifyAuth,
  verifyPermission,
} = require('../middleware/auth.middleware')

// 发表评论接口
commentRouter.post('/', verifyAuth, create)
// 对某条评论进行评论
commentRouter.post('/:commentId/reply', verifyAuth, reply)

// 修改评论
commentRouter.patch('/:commentId', verifyAuth, verifyPermission, update)
// 删除评论接口
commentRouter.delete('/:commentId', verifyAuth, verifyPermission, remove)

// 获取所有的评论
commentRouter.get('/', getList)

module.exports = commentRouter
