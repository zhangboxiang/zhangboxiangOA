$(".bx_ul>li:nth-child(3)").click(function(){
			$('this').css({'background':'#f3f4f6','borderLeft':'3px solid #5b9cd4'})
	})
		$(function(){
			$("#jx").click(function(){
				$("#bx_jd").show();
				$("#bx_wc").hide();
				$("#jx").css('border-bottom','4px solid #34c6d5')
				$("#wc").css('border-bottom','none')
			})
			$("#wc").click(function(){
				$("#bx_wc").show();
				$("#bx_jd").hide();
				$("#wc").css('border-bottom','4px solid #34c6d5')
				$("#jx").css('border-bottom','none')
			})
			
			$(".bx_row").mouseover(function(){
				$(".bx_row").css("overflow-y","auto")
			})
			$(".bx_row").mouseout(function(){
				$(".bx_row").css("overflow-y","hidden")
			})
			$(".bx_jd").mouseover(function(){
				$(".bx_jd").css("overflow-y","auto")
			})
			$(".bx_jd").mouseout(function(){
				$(".bx_jd").css("overflow-y","hidden")
			})
			$(".bx_wc").mouseover(function(){
				$(".bx_wc").css("overflow-y","auto")
			})
			$(".bx_wc").mouseout(function(){
				$(".bx_wc").css("overflow-y","hidden")
			})
			
//图表	 
            var myChart = echarts.init(document.getElementById("main"));
			$.ajax({
				type:"get",
				url:"http://localhost:8888/up/index",
				success:function(e){
					if(e.flag==1){
						window.location.href="../changruili/login.html"
					}
					console.log(e);
					var money = []
						for(var i=0;i<e.length;i++){
							money.push(e[i].money)
				         }
			option = {
				  backgroundColor: '#fff',
				    tooltip : {
				        trigger: 'axis'
				    },
				    legend: {
				        data:['邮件营销','视频广告','联盟广告']
				    },
				    grid: {
				        left: '3%',
				        right: '4%',
				        bottom: '3%',
				        containLabel: true
				    },
				    xAxis : [
				        {
				            type : 'category',
				            boundaryGap : false,
				            data : ['周一','周二','周三','周四','周五','周六','周日']
				        }
				    ],
				    yAxis : [
				        {
				            type : 'value'
				        }
				    ],
				    series : [
				        {
				            name:'邮件营销',
				            type:'line',
				            stack: '总量',
				            areaStyle: {normal: {}},
							data:money
				        },
				        {
				            name:'视频广告',
				            type:'line',
				            stack: '总量',
				            areaStyle: {normal: {}},
							data:money
				        },
				        {
				            name:'联盟广告',
				            type:'line',
				            stack: '总量',
				            areaStyle: {normal: {}},
							data:money
				        }
				    ]
				  };
				  myChart.setOption(option)
				},error:function(){
					alert('失败')
				}
			});
		
		
// 销售详细表
		$.ajax({
			type:"get",
			url:"http://localhost:8888/up/indexx",
			success:function(e){
				for(var i=0;i<e.length;i++){
					console.log(e[i].img)
					$("tbody").append("<tr><td><i><img src='http://localhost:8888/zhangboxiang/img/bx-img/"+e[i].img+"'/></i>"+"<a href='javascript:;'>"+e[i].username+"</a></td>"+"<td>"+e[i].money+"</td>"+"<td>"+e[i].sales+"</td></tr>")
				}
			},error:function(){
				alert('失败')
			}
		});
//指派任务
		$.ajax({
			type:"get",
			url:"http://localhost:8888/up/indexxx",
			success:function(e){
				for(var i=0;i<e.length;i++){
					$(".bx_row ul").append("<li>"+e[i].taske+"</li>")
				}
			},error:function(){
				alert('失败')
			}
		});
//进行中
		$.ajax({
			type:"get",
			url:"http://localhost:8888/up/indexxxx",
			success:function(e){
				for(var i=0;i<e.length;i++){
					$(".bx_jd ul").append("<li>"+e[i].underway+"</li>")
				}
			},error:function(){
				alert('失败')
			}
		});
//已完成
		$("#wc").click(function(){
			$.ajax({
			type:"get",
			url:"http://localhost:8888/up/aindex",
			success:function(e){
				for(var i=0;i<e.length;i++){
					$(".bx_wc ul").append("<li>"+e[i].accomplish+"</li>")
				}
			},error:function(){
				alert('失败')
			}
		});
		})
//搜索
		$(".icon-search").click(function(){
			$.ajax({
			type:"get",
			url:"http://localhost:8888/up/eindex",
			data:{sou:$('.bx_kuang').val().trim()},
			success:function(e){
              $(".bx_row ul").empty();
				var html=""
				for(var i=0;i<e.length;i++){
					html+="<li>"+e[i].id+e[i].taske+"</li>"
				}
				$(".bx_row ul").append(html)
			},error:function(){
				alert('失败')
			}
		});
		})
		// 退出
//		$('#tui').click(function(){
//			$.ajax({
//				type:"get",
//			    url:"http://localhost:8888/up/tuichu",
//			    async:true,
//			    success:function(e){
//			    	if(e.flag==1){
//			    		alert(1)
//			    	}else if(e.flag==2){
//			    		location.href='../changruili/login.html'
//			    	}else{
//			    		alert('异常')
//			    	}
//				  
//				},error:function(){
//					alert('失败')
//				}
//			})
//		})
	})