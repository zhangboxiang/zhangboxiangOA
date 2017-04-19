$(function() {
	/*柱状图*/
	function histogram(e) {
		var Arr1 = [],
			Arr2 = [],
			Arr3 = [],
			Arr4 = [],
			Arr5 = [],
			Arr6 = [];
		for(var i = 0; i < e.length; i++) {
			if(e[i].age >= 20 && e[i].age <= 25) {
				Arr1.push(e[i].age)
			} else if(e[i].age > 25 && e[i].age <= 30) {
				Arr2.push(e[i].age)
			} else if(e[i].age > 30 && e[i].age <= 35) {
				Arr3.push(e[i].age)
			} else if(e[i].age > 35 && e[i].age <= 40) {
				Arr4.push(e[i].age)
			} else if(e[i].age > 40 && e[i].age <= 45) {
				Arr5.push(e[i].age)
			} else if(e[i].age > 45 && e[i].age <= 50) {
				Arr6.push(e[i].age)
			}
		}
		//console.log(xiaoArr.length,zhongArr.length,daArr.length)

		var Chart = echarts.init(document.getElementById('histogram'))
		option = {
			title: {
				text: '年龄比例',
				left: 'center',
				top: 20,
				textStyle: {
					color: '#999'
				}
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'shadow'
				}
			},
			toolbox: {
				show: true,
				feature: {
					dataZoom: {
						yAxisIndex: 'none'
					},
					dataView: {
						readOnly: false
					},
					magicType: {
						type: ['line', 'bar']
					},
					restore: {},
					saveAsImage: {}
				}
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis: {
				type: 'value',
				boundaryGap: [0, 0.01]
			},
			yAxis: {
				type: 'category',
				data: ['20~25', '25~30', '30~35', '35~40', '40~45', '45~50']
			},
			series: [{
				name: '人数',
				type: 'bar',
				data: [Arr1.length, Arr2.length, Arr3.length, Arr4.length, Arr5.length, Arr6.length]
			}],
			color: [function(params) {
				var colorList = [
					"blue", "yellow", "red", "green", "pink", "purple"
				]
				return colorList[params.dataIndex]
			}]
		};
		Chart.setOption(option)
	}

	function pie_chart(e) {
		var Arr1 = [],
			Arr2 = [],
			Arr3 = [],
			Arr4 = [],
			Arr5 = [];
		for(var i = 0; i < e.length; i++) {
			if(e[i].education == '本科') {
				Arr1.push(e[i].age)
			} else if(e[i].education == '大专') {
				Arr2.push(e[i].age)
			} else if(e[i].education == "高中") {
				Arr3.push(e[i].age)
			} else if(e[i].education == "初中") {
				Arr4.push(e[i].age)
			} else if(e[i].education == "研究生") {
				Arr5.push(e[i].age)
			}
		}

		//console.log(xiaoArr.length,zhongArr.length,daArr.length)

		var Chart = echarts.init(document.getElementById('pie_chart'))

		option = {
			backgroundColor: '#fff',
			title: {
				text: '公司学历比例',
				left: 'center',
				top: 20,
				textStyle: {
					color: '#999'
				}
			},

			tooltip: {
				trigger: 'item',
				formatter: "{a} <br/>{b} : {c} ({d}%)"
			},
			series: [{
				name: '访问来源',
				selectedMode: 'single',
				type: 'pie',
				radius: '55%',
				center: ['50%', '50%'],
				data: [{
					value: Arr1.length,
					name: '本科'
				}, {
					value: Arr2.length,
					name: '大专'
				}, {
					value: Arr3.length,
					name: '高中'
				}, {
					value: Arr4.length,
					name: '初中'
				}, {
					value: Arr5.length,
					name: '研究生'
				}].sort(function(a, b) {
					return a.value - b.value
				}),
				roseType: 'angle', //
				label: {
					normal: {
						textStyle: {
							color: 'rgba(8, 8, 8, 0.3)'
						}
					}
				},
				labelLine: {
					normal: {
						lineStyle: {
							color: 'rgba(8, 8, 8, 0.3)'
						},
						smooth: 0.2,
						length: 10,
						length2: 20
					}
				},
				itemStyle: {
					normal: {
						color: '#c23531',
						shadowBlur: 20,
						shadowColor: 'rgba(0, 0, 0, 0.5)'
					}
				},

				animationType: 'scale',
				animationEasing: 'elasticOut',
				animationDelay: function(idx) {
					return Math.random() * 200;
				}
			}]
		};

		Chart.setOption(option)
	}

	function line_chart(e) {
		var Arr1 = [],
			Arr2 = [],
			Arr3 = [],
			Arr4 = [];
		for(var i = 0; i < e.length; i++) {
			if(e[i].branch == '人事部') {
				Arr1.push(e[i].age)
			} else if(e[i].branch == '技术部') {
				Arr2.push(e[i].age)
			} else if(e[i].branch == "销售部") {
				Arr3.push(e[i].age)
			} else if(e[i].branch == "财务部") {
				Arr4.push(e[i].age)
			}
		}

		var Chart = echarts.init(document.getElementById('line_chart'))

		option = {
			title: {
				text: '部门人数图'
			},
			tooltip: {
				trigger: 'axis'
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis: [{
				type: 'category',
				boundaryGap: false,
				data: ['人事部', '技术部', '销售部', '财务部']
			}],
			yAxis: [{
				type: 'value'
			}],
			series: [{
				name: '人数',
				type: 'line',
				stack: '人数',
				areaStyle: {
					normal: {}
				},
				data: [Arr1.length, Arr2.length, Arr3.length, Arr4.length]
			}]
		};
		Chart.setOption(option)
	}

	$.ajax({
		type: "post",
		url: "http://localhost:8888/crm/chars",
		success: function(e) {
			var e = eval('(' + e + ')')
			histogram(e);
			pie_chart(e)
			line_chart(e)
		},
		error: function() {
			alert('error!!')
		}
	});
})