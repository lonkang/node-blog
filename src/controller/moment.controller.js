const fs = require('fs')
const momentService = require('../service/moment.service')
const fileService = require('../service/file.service')
const { PICTURE_PATH } = require('../constants/file-path')

class momentColler {
  // 发布动态
  async create(ctx, next) {
    // 1.获取数据(user_id, content)
    const userId = ctx.user.id
    const content = ctx.request.body.content

    // 2.将数据插入到数据库
    const result = await momentService.create(userId, content)
    ctx.body = result
  }
  // 获取单个动态
  async detail(ctx, next) {
    // 1.获取数据(momentId)
    const momentId = ctx.params.momentId
    // 2.查询数据
    let result = await momentService.getMomentByIdail(momentId)
    // 3 返回数据
    ctx.body = result
  }
  // 获取动态列表
  async getList(ctx, next) {
    // 1.获取数据(offset/size)
    const { offset, size } = ctx.query

    // 2.查询列表
    const result = await momentService.getMomentList(offset, size)
    ctx.body = result
  }
  // 更新动态
  async update(ctx, next) {
    // 1 获取参数
    let { content } = ctx.request.body
    let { momentId } = ctx.params
    // 2 更新动态
    const result = await momentService.update(momentId, content)
    ctx.body = result
  }
  async remove(ctx, next) {
    let { momentId } = ctx.params
    let result = await momentService.remove(momentId)
    ctx.body = result
  }
  async addLabels(ctx) {
    // 1.获取标签和动态id
    const { momentId } = ctx.params
    const labels = ctx.labels
    // 2.添加所有的标签
    for (let label of labels) {
      // 2.1.判断标签是否已经和动态有关系
      const isExist = await momentService.hasLabel(momentId, label.id)
      if (!isExist) {
        await momentService.addLabel(momentId, label.id)
      }
    }

    ctx.body = '给动态添加标签成功~'
  }
  async fileInfo(ctx, next) {
    let { filename } = ctx.params
    console.log(ctx.params)

    const fileInfo = await fileService.getFileByFilename(filename)
    const { type } = ctx.query
    // 如果有不同的type那就返回不同的大小的图片
    const types = ['small', 'middle', 'large']
    if (types.some((item) => item === type)) {
      filename = filename + '-' + type
    }
    console.log(fileInfo)
    ctx.response.set('content-type', fileInfo.mimetype)
    ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`)
  }
}
module.exports = new momentColler()
