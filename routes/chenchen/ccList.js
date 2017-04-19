var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var fs = require('fs');
var formidable = require("formidable");
var pool = mysql.createPool({
//	host:'192.168.113.148',
     host:'192.168.43.168',
//  host:'192.168.1.104',
	user:'root',
	password:'root',
	database:'cc-test1603',
	port:'3306'
})
//列表



router.get('/list',function(req,res){
	function getAllUsers(callback){
		pool.getConnection(function(err,connection){
			var getAllUders_Sql = 'select * from mysql where del=0';
			connection.query(getAllUders_Sql,function(err,result){
				connection.release();
				callback(err,result);
			})
		})
	}
	getAllUsers(function(err,result){
		var curPage = req.query.curPage;
		var total = result.length;
		var pageSize = 10;
		var totalPage = Math.ceil(total/pageSize);
		var start = pageSize*(curPage - 1);
		var end = pageSize*curPage;
		var results = result.slice(start,end);
		var call = {total:total,pageSize:pageSize,totalPage:totalPage,list:results};
		res.send(call);
	})
})
//公用的请求函数
 function move(can,callback,my_sql){
	pool.getConnection(function(err,connection){
		 connection.query(my_sql,can,function(err,result){
		 	callback(err,result,connection);
		 })
	})
}
////详情页 修改页
router.post('/detail',function(req,res){
	var id = req.body['id'];
   	 	move([id],function(err,result,connection){
		  	connection.release();
		  	res.send(result)
	},'select * from mysql where id=?')
})
//搜索
 router.get('/search',function(req,res){
	var name = req.query['name'];
 	 move([name],function(err,result,connection){
		  connection.release();
		  res.send(result);
	},'select * from mysql where username like "%" ? "%"')
 })
//跳转修改页面
router.get('/change',function(req,res){
	var id = req.query['id'];
 	 	move([id],function(err,result,connection){
		  	connection.release();
		  	res.send({flag:1})
	},'select * from mysql where id=?')
})
//修改页面提交
router.post('/alert',function(req,res){
	var id = req.body['id'],
		address = req.body['address'],
		age = req.body['age'],
		branch = req.body['branch'],
		education = req.body['education'],
		email = req.body['email'],
		entrytime = req.body['entrytime'],
		idnumber = req.body['idnumber'],
		img = req.body['img'],
		resigntime = req.body['resigntime'],
		stafflevel = req.body['Staffevel'],
		tel = req.body['tel'],
		username = req.body['username'];
		move([address,age,branch,education,email,entrytime,img,resigntime,stafflevel,tel,id],function(err,result,connection){
			connection.release();
			if(result.changedRows>0){
				res.send({flag:1})
			}
		},"update mysql set address=?,age=?,branch=?,education=?,email=?,entrytime=?,img=?,resigntime=?,stafflevel=?,tel=? where id=?")
})
//删除数据  
router.get('/delete',function(req,res){
	var id = req.query.id;
	var del = 1;
 	 	move([del,id],function(err,result,connection){
		  	
		  	connection.release();
		  	if(result.changedRows>0){
		  		res.send({flag:1})
		  	}else{
		  		res.send({flag:2})
		  	}
		  	
	},'update mysql set del=? where id=?')
})
//创建图片文件存放位置
router.post('/up', function(req, res) {
	var form = new formidable.IncomingForm();
	form.uploadDir = 'public/upload/'; //设置上传图片路径
	form.parse(req, function(error, fields, files) {
//		console.log(files)
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
//			console.log(fName+'2222222222')
			res.send(fName);
		}
	})
})

//recycle
router.get('/recycle',function(req,res){
	var del = 1;
	move([del],function(err,result,connection){
		connection.release();
		res.send(result)
	},'select * from mysql where del=?')
})
//rec
router.get('/rec',function(req,res){
	var id = req.query.id;
	var del = 0;
	move([del,id],function(err,result,connection){
		connection.release();
		if(result.changedRows>0){
			res.send({flag:1})
		}else{
			res.send({flag:2})
		}
	},'update mysql set del=? where id=?')
})
module.exports=router;