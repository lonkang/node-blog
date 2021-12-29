const errorTypes = require('../constants/error-types')
const userService = require('../service/user.service')
const md5password = require('../utils/password-handle')

const verifyUser = async (ctx, next) => {
  // 1 获取用户名和密码
  let { name, password } = ctx.request.body
  // 2 校验用户名和密码是否为空
  if (!name || !password) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit('error', error, ctx)
  }
  // 3 查询数据库中是否有这个用户
  let res = await userService.getUserByName(name)
  if (res.length) {
    const error = new Error(errorTypes.USER_ALREADY_EXISTS)
    return ctx.app.emit('error', error, ctx)
  }

  await next()
}

const handlePassword = async (ctx, next) => {
  const { password } = ctx.request.body
  ctx.request.body.password = md5password(password)

  await next()
}

module.exports = {
  verifyUser,
  handlePassword,
}
