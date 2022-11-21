const path = require('path')
const fs = require('fs')
const multer=require("multer");
module.exports = (req, res) => {
  try {
    console.log(req.files);
    console.log(req.files[0].originalname); //req.files post文件 originalname为文件名
 
    //获取原始拓展名+后缀名
    var newName = req.files[0].path+path.parse(req.files[0].originalname).ext;
    //重命名
	fs.rename(req.files[0].path,newName,function(err){
		if(err){
			res.sendResult(null, 400,'上传失败');
		}else{
			res.sendResult(req.files[0], 201, '上传成功');
		}
	});
//   let fullPath=path.resolve(__dirname+"/upload");
//   let filename="";
//   let storage=multer.diskStorage({
//     //设置文件存储路径
//       destination:(req,file,cb)=>{
//           cb(null,fullPath);
//       },
//       //设置文件存储名称
//       filename:(req,file,cb)=>{
//           let extname=path.extname(file.originalname);
//           filename=file.fieldname+"-"+Date.now()+extname;
//           cb(null,filename);
//       }
//   })
// //上传单张图片
//   let upload=multer({storage}).single("photo");
//   upload(req,res,(err)=>{
//      if (err instanceof multer.MulterError) {
//           res.send("multererr:"+err);
//       }else if(err){
//           res.send("err:"+err);
//       }else{
//         //上传成功后，将图片写在req.body.photo中，继续住下执行
//           req.body.photo=filename;
//           next();
//       }
//   })
  } catch (err) {
    console.log(err);
    return err
  }
}
