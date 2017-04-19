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
			dataURL = ele.value;
			var imgObj = document.getElementById("preview");
			// 两个坑:
			// 1、在设置filter属性时，元素必须已经存在在DOM树中，动态创建的Node，也需要在设置属性前加入到DOM中，先设置属性在加入，无效；
			// 2、src属性需要像下面的方式添加，上面的两种方式添加，无效；
			//imgObj.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = dataURL;

		}
	}
$(function() {
	$('#san_btn').click(function(){
		if($('.filePrew').val()==''||$('.name').val()==''||$('.sex').val()==''||$('.age').val()==''||$('.tel').val()==''||$('.email').val()==''||$('.idnumber').val()==''||$('.address').val()==''||$('.entrytime').val()==''||$('.branch').val()==''||$('.Staffevel').val()==''||$('.education').val()==''){
		}else{
			
				function kong(){
								$('.name').val('')
								$('.radio>input:checked').removeAttr('checked')
								$('.age').val('')
								$('.tel').val('')
								$('.email').val('')
								$('.idnumber').val('')
								$('.address').val('')
								$('.entrytime').val('')
								$('.branch').val('')
								$('.Staffevel').val('')
								$('.resigntime').val('')
								$('.education').val('')
								$('#file_upload').val('')
								$('#preview').removeAttr('src')
			}
			
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
						data:{	username:$('.name').val().trim(),
								sex:$('.radio>input:checked').val().trim(),
								age:$('.age').val().trim(),
								tel:$('.tel').val().trim(),
								email:$('.email').val().trim(),
								idnumber:$('.idnumber').val().trim(),
								address:$('.address').val().trim(),
								entrytime:$('.entrytime').val().trim(),
								branch:$('.branch').val().trim(),
								Staffevel:$('.Staffevel').val().trim(),
								resigntime:$('.resigntime').val().trim(),
								education:$('.education').val().trim(),
								img:e
								},
						success:function(da){
							//console.log(da)
							if(da.flag==0){
								alert('添加失败')
								kong()
							}else if(da.flag==1){
								alert('添加成功')
								kong()
							}else{
								alert('异常!!')
							}
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