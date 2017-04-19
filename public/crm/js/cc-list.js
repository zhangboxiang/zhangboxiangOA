
$('.fr-search').mousemove(function(){
	$('.search').css({
		'clip':'rect(0px,188px,35px,0px)'
	})
})
$('.fr-search').mouseout(function(){
	$('.search').css({
		'clip':'rect(0px,188px,35px,188px)'
	})
})
//列表数据遍历//分页
var curPage = 1; //当前页码
var total, pageSize, totalPage;

function ajax(page) {
	$.ajax({
		type: "get",
		url: "http://localhost:8888/ccList/list",
		data: {
			curPage: page
		},
		success: function(e) {
			//			console.log(e);
			total = e.total; //总记录数
			pageSize = e.pageSize; //每页显示条数
			curPage = page; //当前页
			totalPage = e.totalPage; //总页数
			$('.main').empty();
			var str = '';
			for(var i = 0; i < e.list.length; i++) {
				str += '<tr><td>' + ((i + 1) + ((page - 1) * e.pageSize)) +
					'</td><td><a href="xjxq.html?id='+e.list[i].id+'" class="detail" detail="' + e.list[i].id + '">' + e.list[i].username +
					'</a></td><td>' + e.list[i].sex + '</td><td>' + e.list[i].address +
					'</td><td>' + e.list[i].branch +
					'</td><td><span class="compile"><a href="jacascript:;" class="change"  change="' +
					e.list[i].id + '">编辑</a></span><span class="delete"  delete="' +
					e.list[i].id + '"><a href="javascript:;">删除</a></span></td></tr>'
			}
			$('.main').append(str);

			//修改页面
			$('.change').click(function() {
					var id = $(this).attr('change');
					change(id)
				})
				//删除页面
			$('.delete').click(function() {
				var id = $(this).attr('delete');
				del(id)
			})
		},
		complete: function() { //生成分页条
			getPageBar();

		},
		error: function() {
			alert("数据请求失败！！")
		}
	});
}
ajax(1)
	//获取分页条
function getPageBar() {
	//页码大于最大页数
	if(curPage > totalPage) curPage = totalPage;
	//页码小于1
	if(curPage < 1) curPage = 1;
	var pageStr = '',
		pageList = '';
	for(var i = 0; i < totalPage; i++) {
		pageList += "<span><a href='javascript:void(0)' onclick='fn(" + (i + 1) + ")' >" + (i + 1) + "</a></span>"
	}
	//如果是第一页
	if(curPage == 1) {
		pageStr += "<span>«</span>" + pageList + "<span><a href='javascript:void(0)' onclick='fn(" + (parseInt(curPage) + 1) + ")'>»</a></span>";
	} else if(curPage >= totalPage) {
		pageStr += "<span><a href='javascript:void(0)' onclick='fn(" + (curPage - 1) + ")'>«</a></span>" + pageList + "<span>»</span>";
	} else {
		pageStr += "<span><a href='javascript:void(0)' onclick='fn(" + (curPage - 1) + ")'>«</a></span>" + pageList + "<span><a href='javascript:void(0)' onclick='fn(" + (parseInt(curPage) + 1) + ")'>»</a></span>";
	}
	$("#pagecount").html(pageStr);
	$('#pagecount span').click(function() {
		$(this).addClass('active')
	})
}

function fn(page) {
	if(page) {
		ajax(page);
	}
}

//搜索
$('.search_btn').click(function() {
		if($('.search').val() == '' || $('.search').val() == null) {
			alert('请输入您要搜索内容')
		} else {
			$.ajax({
				type: 'get',
				url: 'http://localhost:8888/ccList/search',
				data: {
					name: $('.search').val()
				},
				success: function(e) {
					$('.main').empty();
					$('#pagecount').empty();
					var str = '';
					for(var i = 0; i < e.length; i++) {
						str += '<tr><td>' + (i + 1) + '</td><td><a href="javascript:;" class="detail" detail="' + e[i].id +
							'">' + e[i].username + '</a></td><td>' + e[i].sex + '</td><td>' + e[i].address +
							'</td><td>' + e[i].branch + '</td><td><span class="compile change"  change="' + e[i].id + '"><a href="javascript:;" >编辑</a></span><span class="delete"  delete="' +
							e[i].id + '"><a href="javascript:;">删除</a></span></td></tr>'
					}
					$('.main').append(str);

					$('.change').click(function() {
							var id = $(this).attr('change');
							change(id)
						})
						//删除页面
					$('.delete').click(function() {
						var id = $(this).attr('delete');
						console.log(id)
						del(id)
					})
				},
				error: function() {
					alert('请重新搜索')
				}
			})
		}
	})
	//删除
function del(id) {
	$.ajax({
		type: 'get',
		url: 'http://localhost:8888/ccList/delete',
		data: {
			id: id
		},
		success: function(e) {
			if(e.flag == 1) {
				alert('删除成功')
				$('[delete =' + id + ']').parents("tr").remove();
			} else if(e.flag == 2) {
				alert('删除失败')
			} else {
				alert('删除失败')
			}
		},
		error: function() {
			alert('请重新删除')
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

//
function change(id) {
	$.ajax({
		type: 'get',
		url: 'http://localhost:8888/ccList/change',
		data: {
			id: id
		},
		success: function(e) {
			//						console.log(e.flag)
			if(e.flag == 1) {
				sessionStorage.setItem('id', id);
				location.href = 'cc-change.html';
			} else {
				alert('请用力点我吧')
			}
		},
		error: function() {
			alert('请重新修改')
		}
	})
	// 退出
}
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