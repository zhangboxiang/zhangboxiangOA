var fileObj;
function getfile(ele) {
		fileObj = ele.files[0];
		var windowURL = window.URL || window.webkitURL;
		var dataURL;
		var $img = $("#preview");
		if(fileObj) {
			dataURL = windowURL.createObjectURL(fileObj);
			$img.attr('src', dataURL);
		} else {
			dataURL = $file.value;
			var imgObj = document.getElementById("preview");
			// 两个坑:
			// 1、在设置filter属性时，元素必须已经存在在DOM树中，动态创建的Node，也需要在设置属性前加入到DOM中，先设置属性在加入，无效；
			// 2、src属性需要像下面的方式添加，上面的两种方式添加，无效；
			//imgObj.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = dataURL;

		}
	}
$(function() {
	
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
	
	
	// 退出
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
	
	
	$('#san_btn').click(function(){
		if($('.filePrew').val()==''||$('.name').val()==''||$('.sex').val()==''||$('.age').val()==''||$('.tel').val()==''||$('.email').val()==''||$('.idnumber').val()==''||$('.address').val()==''||$('.entrytime').val()==''||$('.branch').val()==''||$('.Staffevel').val()==''||$('.resigntime').val()==''||$('.education').val()==''){
		}else{
//			console.log(fileObj.files[0].type)
			var formData = new FormData();
			formData.append('setfiles',fileObj);
			//console.log(fileObj)
			$.ajax({
				type:"post",
				url:"http://localhost:8888/crm/addfile",
				data:formData,
				contentType:false,
				processData:false,
				success:function(e){
					//console.log(e)
					$.ajax({
						type:"post",
						url:"http://localhost:8888/crm/add",
						data:{	username:$('.name').val(),
								sex:$('.radio>input:checked').val(),
								age:$('.age').val(),
								tel:$('.tel').val(),
								email:$('.email').val(),
								idnumber:$('.idnumber').val(),
								address:$('.address').val(),
								entrytime:$('.entrytime').val(),
								branch:$('.branch').val(),
								Staffevel:$('.Staffevel').val(),
								resigntime:$('.resigntime').val(),
								education:$('.education').val(),
								img:e
								},
						success:function(da){
							console.log(da)
						},error:function(){
							alert('出错')
						}
					});
				},error:function(){
					alert('error!!')
				}
			});
		}
	})
	
})