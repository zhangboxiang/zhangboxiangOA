var express = require('express'); //引用
var mysql =require('mysql')
var fs =require('fs')
var formidable =require('formidable')
var router = express.Router();



var pool =mysql.createPool({
//	host:"192.168.113.148", 
//  host:'192.168.1.104',
    host:'192.168.43.168',
	user:"root",   //用户名
	password:"root",  //密码 
	database:"cc-test1603",  //数据库名  //staffingsystem
	port:3306   //端口号
})

//router.post("/up",function(req,res){
// var form = new formidable.IncomingForm()
//  form.uploadDir ="public/upimg/";//设置临时存放上传的路径
//   form.parse(req, function(err, fields, files) {
//  	    for(var i in files){
//  	    	var file = files[i];
//	    	var fName = (new Date()).getTime(); //(new Date()).getTime();
//  	    	switch(file.type){
//  	    		case"image/jpeg":
//  	    		fName = fName+ ".jpg";
//  	    		break;
//  	    		case"image/png":
//  	    		fName = fName+ ".png";
//  	    		break;
//  	    	}
//  var newPath ="public/upimg/"+fName;
//  fs.renameSync(file.path,newPath);//重命名
////fs.renameSync(oldPath,newPath)
//  res.send(fName)
//  	    }
//  })
//})



function  move(can,callback,my_sql){
	pool.getConnection(function(err,connection){
		var cc=my_sql;
		 connection.query(cc,can,function(err,result){
		 	callback(err,result,connection);
		 })
	})
}



router.get("/detail",function(req,res){
	res.header("Access-Control-Allow-Origin","*");
//	res.send(arr)
//  var id =req.param("id")  //get取值的方法
    var id=req.query.id        //get取值的方法
console.log("into.................")
move([id],function(err,result,connection){
   	
   	 	console.log(result);
		  connection.release();
//		  res.send(result)
		  for (var i=0;i<result.length;i++) {
	if(id==result[i].id){
    	res.send(result[i])
    }
}
	},'select * from mysql where id= ?')
//select * from user where id= ?select * from mysql
})
module.exports = router;  //输出