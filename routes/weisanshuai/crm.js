var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var fs = require('fs');
var formidable = require("formidable");

var pool = mysql.createPool({
//	host: '192.168.113.148',
//  host:'192.168.1.104',
    host:'192.168.43.168',
	user: 'root', //用户名
	password: 'root', //密码
	database: 'cc-test1603', //数据库名
	port: 3306 //端口号
})


router.get('/tui',function(req,res){
if(req.session.uname!=''&& req.session.uname!=undefined){
     	console.log('into index....')
     	res.send({uname:req.session.uname,img:req.session.img})
    }else{
    	//console.log(req.session.uname)
    	res.send({flag:1})
    }
})




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

router.post('/chars',function(req,res){
	var mysql_ = 'select * from mysql';
	//var xiaoArr = [],zhongArr = [],daArr = [];
	get(mysql_,function(err,result){
//		console.log(typeof result)
		res.send(result);
//		console.log(result)
		//console.log(result)
//		for(var i=0;i<result.length;i++){
//			if(result[i].age>=20||result[i].age<=30){
//				xiaoArr.push(result[i].age)
//			}else if(result[i].age>30||result[i].age<=40){
//				zhongArr.push(result[i].age)
//			}else if(result[i].age>40||result[i].age<50){
//				daArr.push(result[i].age)
//			}
//		}
		//console.log(xiaoArr+'>>'+zhongArr+'>>>'+daArr)
	})
})

router.post('/add',function(req,res){
	var username = req.body['username'];
	var sex = req.body['sex'];
	var age = req.body['age'];
	var tel = req.body['tel'];
	var email = req.body['email'];
	var idnumber = req.body['idnumber'];
	var address = req.body['address'];
	var entrytime = req.body['entrytime'];
	var branch = req.body['branch'];
	var Staffevel = req.body['Staffevel'];
	var education = req.body['education'];
	var img = req.body['img'];
	var data = [username,sex,age,tel,email,idnumber,address,entrytime,branch,Staffevel,education,img]
	var mysql_ = 'insert into mysql(id,username,sex,age,tel,email,idnumber,address,entrytime,branch,stafflevel,education,img) values (null,?,?,?,?,?,?,?,?,?,?,?,?)';
	add(mysql_,data,function(err,result){
		//console.log(result)
		if(err){
			res.send({flag:0})
		}else if(result){
			res.send({flag:1})
			
		}else{
			res.send({flag:2})
		}
	})
})

//添加
function add(mysql_,data,she){
	pool.getConnection(function(err,connection){
		connection.query(mysql_,data,function(err,result){
			if(err){
				console.log('success:error'+'>>>>'+err)
				return;
			}
			connection.release();
			she(err,result)
		})
	})
}
//获取
function get(mysql_,she){
	pool.getConnection(function(err,connection){
		connection.query(mysql_,function(err,result){
			if(err){
				console.log('success:error'+'>>>>'+err)
				return;
			}
			connection.release();
			she(err,result)
		})
	})
}

module.exports = router;