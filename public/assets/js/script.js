//After the page loads...
$(function(){

	$.ajax('/api/test', {
		type:"post",
	}).done(function(data){
		console.log('post response from server:', data)
	}).fail(function(err){
		alert(err);
	});


});