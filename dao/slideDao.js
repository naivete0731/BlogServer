const { Slide } = require('../model/slide')
const { unlink } = require('../modules/unlink')
module.exports.AddSlide = async (body, cb) => {
  try {
    let slide = new Slide(body);
            // 保存用户
    await slide.save();
    cb(null, slide)
  } catch (err) {
    cb(err, null)
  }
}

module.exports.DeleteSlide = async (id, cb) => {
  try {
    let slide = await Slide.findByIdAndDelete(id);
    // 如果缩略图存在
    if (slide.image) {
        // 删除
        await unlink(slide.image)
    }
    cb(null, slide)
  } catch (err) {
    cb(err, null)
  }
}

module.exports.getAllSlide = async (cb) => {
  try {
    let slides = await Slide.find().populate('author', '-password')
    cb(null, slides)
  } catch (err) {
    cb(err, null)
  }
}