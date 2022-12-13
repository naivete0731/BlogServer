const slide = require('express').Router()
const SlideServ = require('../../services/SlideService')
const { validateFindById, validateSlide } = require('../../model/slide')
// 添加轮播图
slide.post('/', 
  (req, res, next) => {
    const { error } = validateSlide(req.body)
    if (error) return res.sendResult(null, 400, err.message)
    next()
  },
  (req, res, next) => {
    SlideServ.AddSlide(req.body, (err, result) => {
      if (err) return res.sendResult(null, 400, err)
      res.sendResult(result, 200, '添加轮播成功')
     }
    )
  }
)
// 根据id删除轮播图
slide.delete('/:id',
  (req, res, next) => {
    const { error } = validateFindById(req.params.id)
    if (error) return res.sendResult(null, 400, err.message)
    next()
  },
  (req, res, next) => {
    SlideServ.DeleteSlide(req.params.id, (err, result) => {
      if (err) return res.sendResult(null, 400, err)
      res.sendResult(result, 200, '删除轮播成功')
     }
    )
  }
)
// 获取轮播图
slide.get('/', 
  (req, res, next) => {
    SlideServ.getAllSlide((err, result) => {
      if (err) return res.sendResult(null, 400, err)
      res.sendResult(result, 200, '获取所有轮播成功')
     }
    )
  }
)


module.exports = slide