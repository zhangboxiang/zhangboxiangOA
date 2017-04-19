var express = require('express');
var router = express.Router();
var mysql = require('mysql')

var pool = mysql.createPool({
	host:'192.168.43.168',
//	host:'192.168.113.148',
//	host:'192.168.1.104',	
	user:'root',
	password:'root',
	database:'cc-test1603',
	port:3306
})
//退出
   router.get('/tuichu',function(req,res){
    	req.session.destroy();
	  	res.send({flag:1})
   })

//折线图
   router.get('/index',function(req,res){
   if(req.session.uname!=''&& req.session.uname!=null){
     	console.log('into index....'+req.session.uname)
   	 move([],function(err,result,connection){
   	 	//res.header("Access-Control-Allow-Origin","*");
   	 	 // console.log(result);
		  connection.release();
          res.send(result)
	},'select * from market')
    }else{
    	console.log(req.session.uname)
    	res.send({flag:1})
    }
 
   })
   
   function  move(can,callback,my_sql){
	pool.getConnection(function(err,connection){
		var crl=my_sql;
		 connection.query(crl,can,function(err,result){
		 	callback(err,result,connection);
		 })0
	})
}

//销售详细
   router.get('/indexx',function(req,res){
   	console.log('into indexx....')
   	 move([],function(err,result,connection){
// 	 	res.header("Access-Control-Allow-Origin","*");
   	 	//console.log(result);
		  connection.release();
		  res.send(result)
	},'select * from market')
   })
//指派任务
router.get('/indexxx',function(req,res){
   	console.log('into indexxx....')
   	 move([],function(err,result,connection){
   	 	//console.log(result);
		  connection.release();
		  res.send(result)
	},'select * from market ')
   })
//进行中
router.get('/indexxxx',function(req,res){
   	console.log('into indexxxx....')
   	 move([],function(err,result,connection){
   	 	//console.log(result);
		  connection.release();
		  res.send(result)
	},'select * from market ')
   })

//已完成
router.get('/aindex',function(req,res){
   	console.log('into aindex......')
   	 move([],function(err,result,connection){
   	 	//console.log(result);
		  connection.release();
		  res.send(result)
	},'select * from market ')
   })
//搜索
router.get('/eindex',function(req,res){
   	console.log('into eindex......')
   	var sousuo = req.query.sou;
   //	console.log(sousuo)
   	 move([sousuo],function(err,result,connection){
   	 	//console.log(result);
		  connection.release();
		  res.send(result)
	},"select * from market where  taske like '%' ? '%' ")
   })

module.exports = router;