var express = require('express');
var mysql = require('mysql');
var session=require('express-session');
var router = express.Router();
var fs = require('fs');
var formidable = require("formidable");

var pool = mysql.createPool({
	host: '192.168.43.168',
//	host:'192.168.113.148',
//	host:'192.168.1.104',
	user: 'root',
	password: 'root',
	database: 'cc-test1603',
	port: 3306
})


//wss  添加  图片注册

router.post('/addfile', function(req, res) {
	//console.log("ddddd")
	var form = new formidable.IncomingForm();
	form.uploadDir = 'public/upload'; //设置上传图片路径
	form.parse(req, function(error, fields, files) {
		console.log(files)
		for(var i in files) {
			var file = files[i];
			var fName = (new Date()).getTime();
			switch(file.type) {
				case "image/jpeg":
					fName = fName + '.jpg'
					break;
				case 'image/png':
					fName = fName + '.png'
					break;
			}
			var newPath = 'public/upload/' + fName;
			fs.renameSync(file.path, newPath);
			//console.log(fName)
			res.send(fName);
		}
	})
})




//注册
router.post('/register', function(req, res) {
	console.log('into register....')
	var email = req.body['email'];
	var uname = req.body['username'];
	var pwd = req.body['password'];
	var pwdtwo = req.body['pwdtwo'];
	var img = req.body['img'];
	//console.log(typeof email)
	//console.log('用户名：'+uname + '|' +'密码：'+ pwd + '|' +'邮箱：'+ email)
	
  //封装版
      move([uname],function(err,result,connection){
		 console.log('into move.....')
           if(result.length==0){
              move([uname,pwd,email,img],function(err,result,connection){
              //	console.log(err)
              	if(err){
              		res.send({flag:3})
              		return;
              	}
                     connection.release();
                        res.send({flag:1})//注册成功
              },"insert into login(username,password,email,img) values(?,?,?,?)")
          }
          else if(result.length>0){
             res.send({flag:2})//已注册
          }
          else{
          	  res.send({flag:3})//异常
          }
          connection.release();
      
	},'select * from login where username=?')

})
//登录
router.post('/login',function(req,res){
	console.log('into login....')
	var uname = req.body['uname'];
	var password = req.body['password'];
	//console.log('用户名：'+uname + '|' +'密码：'+ password)
    move([uname],function(err,result,connection){
		  
     // console.log(result);
      if(result=='' || result==null){
      	res.send({flag:2})   //用户名不存在
//    	res.send(err);
      	return
      }else if(result[0].username==uname && result[0].password==password){
      	req.session.uname=uname;
      	req.session.img = result[0].img;
      	//console.log(req.session.uname,req.session.img)
      	result={flag:1,id:result[0].id} //登陆成功
      	res.send(result);
      	return;
      }else if(result[0].username==uname && result[0].password!=password){
      	res.send({flag:3})
      }
   connection.release();
	},'select * from login where username=?')


})


function  move(can,callback,my_sql){
	pool.getConnection(function(err,connection){
		var crl=my_sql;
		 connection.query(crl,can,function(err,result){
		 	callback(err,result,connection);
		 })
	})
}

//function getUserByname(uname, callback) {
//	pool.getConnection(function(err, connection) {
//		var get_sql = "select * from user where uname=?";
//		connection.query(get_sql, [uname], function(err, result) {
//			if(err) {
//				console.log('aaa:' + result);
//				return;
//			}
//			connection.release(); //释放连接
//			console.log("invoked[getUserByname]");
//			callback(err, result)
//		})
//	})
//}
//
//function save(uname, pwd, email, callback) {
//	pool.getConnection(function(err, connection) {
//		var in_sql = "insert into user(uname,pwd,email) values(?,?,?)";
//		connection.query(in_sql, [uname, pwd, email], function(err, result) {
//			if(err) {
//				console.log("in_sql:" + err.message);
//				return;
//			}
//			console.log(result);
//			connection.release();
//			callback(err, result)
//		})
//	})
//}

module.exports = router;