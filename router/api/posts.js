const posts = require('express').Router()
const postServ = require('../../services/PostsService')
const { verifyToken } = require('../../modules/passport')
const { validatePost, validateFindById } = require('../../model/post')
// 添加文章信息
posts.post('/', 
  (req, res, next) => {
    const { error } = validatePost(req.body)
    if (error) return res.sendResult(null, 400, error.message)
    next()
  },
  (req, res, next) => {
    const id = verifyToken(req.headers.authorization).data._id
    postServ.addPost(id, req.body, (err, result) => {
      if (err) return res.sendResult(null, 400, err)
      res.sendResult(result, 201, '添加文章成功')
    })
  }
)
// 查询所有文章
posts.get('/', 
(req, res, next) => {
  postServ.getPosts(req.query, (err, result) => {
    if (err) return res.sendResult(null, 400, err)
    res.sendResult(result,200,'获取文章列表成功')
  })
}
)
// 查询文章数量
posts.get('/count', 
(req, res, next) => {
  postServ.countPosts((err, result) => {
    if (err) return res.sendResult(null, 400, err)
    res.sendResult(result, 200, '获取分类数量成功')
  })
}
)
// 获取最新发布文章(按照发布时间排序)
posts.get('/lasted', 
(req, res, next) => {
  postServ.lasted((err, result) => {
    if (err) return res.sendResult(null, 400, err)
    res.sendResult(result, 200, '获取最新发布文章成功')
  })
}
)
// 获取热门推荐(按照评论数量排序)
posts.get('/recommend',
(req, res, next) => {
  postServ.recommend((err, result) => {
    if (err) return res.sendResult(null, 400, err)
    res.sendResult(result, 200, '获取热门推荐成功')
  })
}
)
// 获取随机推荐
posts.get('/random', 
(req, res, next) => {
  postServ.random((err, result) => {
    if (err) return res.sendResult(null, 400, err)
    res.sendResult(result, 200, '获取随机推荐成功')
  })
}
)
// 文章点赞
posts.post('/fabulous/:id', 
  (req, res, next) => {
    const { error } = validateFindById(req.params.id)
    if (error) return res.sendResult(null, 400, error.message)
    next()
  },
  (req, res, next) => {
    postServ.fabulous(req.params.id,(err, result) => {
      if (err) return res.sendResult(null, 400, err)
      res.sendResult(result, 200, '点赞成功')
    })
  }
)
// 文章搜索
posts.get('/search/:q', 
(req, res, next) => {
  postServ.search(req.params.q, (err, result) => {
    if (err) return res.sendResult(null, 400, err)
    res.sendResult(result, 200, '搜索成功')
  })
}
)
// 根据分类获取文章列表 
posts.get('/category/:id', 
  (req, res, next) => {
    const { error } = validateFindById(req.params.id)
    if (error) return res.sendResult(null, 400, error.message)
    next()
  },
  (req, res, next) => {
    postServ.category(req.params.id, (err, result) => {
      if (err) return res.sendResult(null, 400, err)
      res.sendResult(result, 200, '获取成功')
    })
  }
)
// 根据文章id获取文章信息
posts.get('/:id',
(req, res, next) => {
  const { error } = validateFindById(req.params.id)
  if (error) return res.sendResult(null, 400, error.message)
  next()
},
(req, res, next) => {
  postServ.findPost(req.params.id, (err, result) => {
    if (err) return res.sendResult(null, 400, err)
    res.sendResult(result, 200, '获取成功')
  })
}
)
// 根据id修改文章
posts.put('/:id', 
(req, res, next) => {
  const { error } = validateFindById(req.params.id)
    if (error) return res.sendResult(null, 400, error.message)
    next()
  },
  (req, res, next) => {
    postServ.updatePost(req.params.id, req.body, (err, result) => {
      if (err) return res.sendResult(null, 400, err)
      res.sendResult(result, 200, '文章修改成功')
    })
  }
)
// 根据id删除文章
posts.delete('/:id', 
  (req, res, next) => {
    if (req.params.id.indexOf('-') != -1) {
      // 批量删除
               // 将字符串id分割为数组
               const ids = req.params.id.split('-');
               // 存储结果数组
               const result = [];
               // 验证
               for (const item of ids) {
                   // 验证
                   let { error } = validateFindById(item);
                   // 数据格式没有通过验证
                   if (error) return res.sendResult(null, 400, error.message)
                   result.push(item)
               }
   } else {
     const { error } = validateFindById(req.params.id)
     if (error) return res.sendResult(null, 400, error.message)
   }
    next()
  },
  (req, res, next) => {
    postServ.deletePosts(req.params.id, (err, result) => {
      console.log(err);
      if (err) return res.sendResult(null, 400, err)
      res.sendResult(result, 200, '删除分类成功')
    })
  }
)


module.exports = posts