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
var id = sessionStorage.getItem('id');
$.ajax({
	type: 'post',
	url: 'http://localhost:8888/ccList/detail',
	data: {
		id: id
	},
	success: function(e) {
		var e = e[0];
		var aImg = e.img;
		//获取数据
		var det_list = '<div class="san-name-tu fl aImg"><div class="san-input"><img id="preview" src="../../../upload/' + e.img +
			'" /><a href="javascript:;" class="btn_addPic"><span>修改头像</span><input type="file" class="filePrew" id="file_upload" title="支持jpg、jpeg、gif、png格式" onchange="getfile(this)" name="pic" /></a></div></div>    <div class="aBox fr"><div class="san-name"><label>姓名 / Name</label><div class="san-input"><input type="text" disabled value="' + e.username +
			'" class="light name" /><p class="san-input-ti"></p></div></div>    <div class="san-name"><label>年龄 / Age</label><div class="san-input"><input type="number" value="' + e.age +
			'" class="age" /><p class="san-input-ti"></p></div></div>     <div class="san-name"><label>电话 / tel</label><div class="san-input"><input type="text" value="' + e.tel +
			'" class="tel" /><p class="san-input-ti"></p></div></div>    <div class="san-name"><label>邮箱 / email</label><div class="san-input"><input type="email" value="' + e.email +
			'" class="email" /><p class="san-input-ti"></p></div></div>   <div class="san-name"><label>身份证 / idnumber</label><div class="san-input"><input type="text"  disabled value="' + e.idnumber +
			'" class="idnumber" /><p class="san-input-ti"></p></div></div>  <div class="san-name"><label>地址 / address</label><div class="san-input"><input type="text" value="' + e.address +
			'" class="address" /><p class="san-input-ti"></p></div></div>   <div class="san-name"><label>入职时间/entrytime</label><div class="san-input"><input type="text" value="' + e.entrytime.split('T')[0] +
			'"  class="entrytime" /></div></div>    <div class="san-name"><label>所在部门 / branch</label><div class="san-input"><input type="text" value="' + e.branch +
			'" class="branch" /><p class="san-input-ti"></p></div></div>   <div class="san-name"><label>人员级别 / Staffevel</label><div class="san-input"><input type="text" value="' + e.stafflevel +
			'" class="Staffevel" /><p class="san-input-ti"></p></div></div>  <div class="san-name"><label>离职时间/resigntime</label><div class="san-input"><input type="text" class="resigntime"value="' + e.resigntime.split('T')[0] +
			'" /></div></div>   <div class="san-name"><label>学历/education</label><div class="san-input"><input type="text" value="' + e.education +
			'" class="education" /><p class="san-input-ti"></p></div></div><div class="san-name"><label></label><div class="san-input"><input type="button" class="san-btn" id="san_btn" value="提交" /></div></div></div>';
		$('.san-form').append(det_list);
		//提交数据

		$('#san_btn').click(function() {
			if($('.name').val() == '' || $('.sex').val() == '' || $('.age').val() == '' || $('.tel').val() == '' || $('.email').val() == '' || $('.idnumber').val() == '' || $('.address').val() == '' || $('.entrytime').val() == '' || $('.branch').val() == '' || $('.Staffevel').val() == '' || $('.resigntime').val() == '' || $('.education').val() == '') {
				alert('不能为空')
			} else {
				if(('../../../upload/' + aImg) == ($('#preview').attr('src'))) {
					$.ajax({
						type: "post",
						url: "http://localhost:8888/ccList/alert",
						data: {
							id: id,
							username: $('.name').val(),
							age: $('.age').val(),
							tel: $('.tel').val(),
							email: $('.email').val(),
							idnumber: $('.idnumber').val(),
							address: $('.address').val(),
							entrytime: $('.entrytime').val(),
							branch: $('.branch').val(),
							Staffevel: $('.Staffevel').val(),
							resigntime: $('.resigntime').val(),
							education: $('.education').val(),
							img: aImg
						},
						success: function(e) {
							if(e.flag == 1) {
								alert('恭喜你修改成功');
								location.href = 'cc-table.html';
							} else {
								alert('请确认修改信息')
							}
						},
						error: function() {
							alert('请重新点击详情')
						}
					});
				} else {
					var formData = new FormData();
					formData.append('setfiles', fileObj);
					$.ajax({
						type: "post",
						url: "http://localhost:8888/ccList/up",
						data: formData,
						contentType: false,
						processData: false,
						success: function(e) {
							console.log(e);
							$.ajax({
								type: "post",
								url: "http://localhost:8888/ccList/alert",
								data: {
									id: id,
									username: $('.name').val(),
									sex: $('.radio>input:checked').val(),
									age: $('.age').val(),
									tel: $('.tel').val(),
									email: $('.email').val(),
									idnumber: $('.idnumber').val(),
									address: $('.address').val(),
									entrytime: $('.entrytime').val(),
									branch: $('.branch').val(),
									Staffevel: $('.Staffevel').val(),
									resigntime: $('.resigntime').val(),
									education: $('.education').val(),
									img: e
								},
								success: function(a) {
									console.log(a)
									if(a.flag == 1) {
										alert('恭喜你修改成功');
										location.href = 'cc-table.html';
									} else {
										alert('请确认修改信息')
									}
								},
								error: function() {
									alert('请重新点击详情')
								}
							});
						},
						error: function() {
							alert('error')
						}
					})
				}

			}
		});

	},
	error: function() {
		alert('请返回再次点击')
	}
	
})
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