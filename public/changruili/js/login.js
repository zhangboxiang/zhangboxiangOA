$(function(){
//	$('#uname').val(localStorage.getItem('name'));
	$('#btn2').click(function() {
		if($('#uname').val() == '' || $('#password').val() == '') {
			alert('请填写完整')
		}else {
			$.ajax({
				type: "post",
				url: "http://localhost:8888/register/login",
//				async: false,
				data: {
					'uname': $('#uname').val(),
					'password': $('#password').val()
				},
				success: function(e) {
					console.log(e);
					if(e.flag == 1) {
						alert('登录成功！')
						window.location.href = '../zhangboxiang/index.html'
					} else if(e.flag == 2) {
						alert('用户名不存在')
					} else if(e.flag==3){
						alert('密码错误！')
					}
				},
				error: function() {
					alert('请求失败')
				}
			})
		}
	})
})