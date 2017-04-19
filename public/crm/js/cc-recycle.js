$.ajax({
	type:"get",
	url:"http://localhost:8888/ccList/recycle",
	success:function(e){
		if(e.flag==1){
				location.href="login.html"
		}else{
		var str = '';
		for(var i = 0; i < e.length; i++) {
			str += '<tr><td>' + (i + 1) +
			'</td><td>' + e[i].username +'</td><td>' + e[i].sex + '</td><td>' + e[i].address +'</td><td>' + 
			e[i].branch +'</td><td><span class="recycle icon-info" style="border-right:1px solid #d9d9d9;background:#337ab7;color:white;padding-left:10px;"  recycle="' +e[i].id + '"><a href="javascript:;" style="color:white;padding:8px 8px 8px 10px;">恢复</a></span></td></tr>'
		}
		$('.main').append(str);
		$('.recycle').click(function() {
			var id = $(this).attr('recycle');
			rec(id)
		})
		}
	},
	error:function(){
		alert('error@');
	}
});
//恢复
function rec(id) {
	$.ajax({
		type: 'get',
		url: 'http://localhost:8888/ccList/rec',
		data: {id: id},
		success: function(e) {
			if(e.flag == 1) {
				alert('恢复成功')
				$('[recycle =' + id + ']').parents("tr").remove();
			} else if(e.flag == 2) {
				alert('恢复失败')
			} else {
				alert('恢复失败')
			}
		},
		error: function() {
			alert('请重新恢复')
		}
	})
}
$.ajax({
		type:"get",
		url:"http://localhost:8888/crm/tui",
		success:function(e){
			if(e.flag==1){
				location.href="login.html"
			}else{
				$('#san_name').html(e.uname)
				$('.bx_tu4').attr('src','../../upload/'+e.img)
			}
		},error:function(){
			alert('异常!!')
		}
	});

			$('#tui').click(function(){
//				alert(1)
				$.ajax({
				    url:"http://localhost:8888/up/tuichu"
					,type:"get"
				   ,success:function(e){
//				   		console.log(req)
//				   		alert("nima")
				   		location.href="login.html"
				   }
				    ,error:function(){
						alert('失败')
					}
				})
			})




