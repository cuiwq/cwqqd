$(function(){
	// 1.判断是否有历史记录 如果有则显示 如果没有则提示没有
	// 2.输入商品名称 点击按钮跳转，并保存到历史记录列表4
	// 3.点击X 删除某一行历史记录 点击删除 清空所有历史记录

	// 4.显示所有的记录


// 需要的知识点
// localstorage 叫本地存储 实际上归属于客户端存储
// 设置值: localStorage.setItem(key,value);
// 获取值: localStorage.getItem(key);
// 移除值: localStorage.removeItem(key);
// 清除所有记录： localStorage.clear();

// 在js中 ,json和对象或数组有一个转换的方法
// 如果对象或数组转换为json 用的是 JSON.stringify()
// 如果json转换为对象或数组 用的时 JSON.parse()
// =====================================================

// 1. 当页面载入的时候显示历史记录
  // setHistoryData('addids');
  showHistoryData();
// 2.点击搜索按钮 把关键词加入历史记录
var searchInput = $('.search-box input');
$('#search-btn').on('tap',function(){
	var keyWord = searchInput.val();
	setHistoryData(keyWord);
	showHistoryData();
})

// 3.点击清空历史按钮 清空历史记录
$('#clear-history').on('tap',function(){
	localStorage.removeItem('ltHistory');
})

// 4.点击删除按钮  删除一条数据
$('.search-history-list').on('tap','i',function(){
	var deleteData = $(this).siblings('span').html();
	// console.log(deleteData);
	removeHistoryData(deleteData);
	showHistoryData();
})
// 5.点击历史列表中的字 把这个字放到地址栏中跳转进行搜索
$('.search-history-list').on('tap','span',function(){
	var keyWord = $(this).html();
	//把关键字传入到searchlist.html
	// console.log(keyWord);
	location.href = './searchList.html?proName='+keyWord;
})


})

// =======================================================
// 获取搜索记录 通过localStorage.getItem('ltHistory')
var getHistoryData = function(){
	return JSON.parse(window.localStorage.getItem('ltHistory') || '[]');
}
// console.log(getHistoryData());

// 1.刚进入是显示历史记录
var showHistoryData = function(){
	// 空数组或有长度的数组
	var list = getHistoryData();
	//判断是否有历史记录
	if(list.lengtn == 0){
		//没有历史记录
		$('.empty-history').show();
		$('.search-history').hide();
	}else {
		//展示历史记录
		var historyist = template('historyTemplate',{
			list:list
		});
		console.log(historyist)
		$('.search-history-list').html(historyist);
		$('.search-history').show();
		$('.empty-history').hide();
	}
}

// 2.设置搜索记录  获取历史记录
var setHistoryData = function(value){
	// 获取历史记录
	var list = getHistoryData();
	// 遍历数据(去除重复数据)
	$.each(list,function(i,item){
		if(value == item){
			list.splice(i,1);
		}
	});
	list.push(value);
	localStorage.setItem('ltHistory',JSON.stringify(list));
}

// 移出数据

var removeHIstoryData = function(value){
	// 获取历史记录
	var list = getHistoryData();
	// console.log(list);
	$.each(list,function(i,item){
		if(value == itme){
			list.splice(i,1);
		}
	})
	// 把切掉的后的数组 放回历史记录中
	window.localStorage.setItem('ltHistory',JSON.stringify(list));
}