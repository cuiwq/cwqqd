$(function(){
getSearchListData();

})

var getSearchListData = function(pageName,price,num){
	var url = new URLSearchParams(location.search);
	var proName = url.get('proName');
		console.log(proName);
	$>ajax({
		type:'get',
		url:'/product/queryProduct',
		data:{
			proName:proName || '',
			page:pageNum || 1,
			pageSize:6,
			price:price || 2,

			success:function(data){

			}
		}
	})
}