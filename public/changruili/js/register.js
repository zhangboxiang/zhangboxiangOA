$(function() {
//  email验证
   $('#email').change(function(){
   	var em=/^\w+@\w+(\.\w+){1,3}$/;
   	if(em.test($('#email').val())){
   		$('#email').val($('#email').val());
   	}else{
   		$('#email').val('email格式有误')
   		$('#email').css('color','red');
   		email.onclick=function(){
   			$('#email').val('')
   		    $('#email').css('color','#000');
   		}
   	}
     	 
   })
   //用户名验证
   $('#text').change(function(){
   	var te=/^[A-Za-z0-9_\u4e00-\u9fa5]{4,16}$/;
   	if(te.test($('#text').val())){
   		$('#text').val($('#text').val());
   	}else{
   		$('#text').val('限4~12个字符，支持中英文、数字、减号或下划线')
   		$('#text').css('color','red');
   		text.onclick=function(){
   			$('#text').val('')
   		    $('#text').css('color','#000');
   		}
   	}
     	 
   })
   //密码验证
   $('#pwd').change(function(){
   	var pd=/^[0-9a-zA-Z_#]{6,16}$/;
   	if(pd.test($('#pwd').val())){
   		$('#pwd').val($('#pwd').val());
   	}else{
   		$('#pwd').val('')
   		$('.poSpan3').css('display','block')
   		$('#pwd').blur()
   		$('#pwd').attr('placeholder','')
   		pwd.onclick=function(){
   			$('.poSpan3').css('display','')
   			$('#pwd').val('')
   		    $('#pwd').css('color','#000');
   		}
   	}
     	 
   })
   //密码再次验证
   $('#pwd2').change(function(){
   	if($('#pwd2').val()==$('#pwd').val()){
   		$('#pwd2').val($('#pwd2').val())
   	}else{
   		$('#pwd2').val('')
   		$('.poSpan4').css('display','block')
   		$('#pwd2').blur()
   		$('#pwd2').attr('placeholder','')
   		pwd2.onclick=function(){
   			$('.poSpan4').css('display','')
   			$('#pwd2').val('')
   		    $('#pwd2').css('color','#000');
   		}
   	}
     	 
   })
	$('#btn').click(function() {
		if($('#email').val() == '' || $('#text').val() == '' || $('#pwd').val() == '' || $("#pwd2").val() == '') {
			alert('请填写完整')
		}else if($('#pwd').val()!=$('#pwd2').val()){
			alert('两次密码不一样，请重新输入！')
		}else {
			$.ajax({
				type: "post",
				url: "http://localhost:8888/register/register",
				async: false,
				data: {
					'email': $('#email').val(),
					'username': $('#text').val(),
					'password': $('#pwd').val(),
					'pwdtwo': $('#pwd2').val()
				},
				success: function(e) {
					console.log(e);
					if(e.flag == 1) {
						alert('注册成功！')
//						localStorage.setItem('name', $("#text").val());
						window.location.href = 'login.html'
					} else if(e.flag == 2) {
						alert('用户名已占用，请重新输入！')
					} else {
						alert('注册失败！')
					}
				},
				error: function() {
					alert('请求失败')
				}
			})
		}
	})

})