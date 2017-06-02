(function (window) {
	'use strict';

	// Your starting point. Enjoy the ride!
	
	//기본 적용된 필터 -> all
	//전체 리스트 호출 -> 새로고침해도 같도록
	getTodoList('all');
})(window);

//all / active / completed 버튼 눌렸을 때의 이벤트 메소드 작성해서 그 안에서 getTodoList(filter) 호출
$('#all').on('click', function() {
	getTodoList('all');
});


$('#active').on('click', function() {
	getTodoList('active');
});


$('#completed').on('click', function() {
	getTodoList('completed');
});

function isActive(tdata){
	return tdata.completed == 0;
}

function isCompleted(tdata){
	return tdata.completed == 1;
}

function countNum(data){
	var num = 0;
	$.each(data, function(){
		var now = $(this).get(0);
		if(now.completed == 0){
			num++;
		}
	})
	$('.todo-count>strong').text(num);
}

function getTodoList(filter){
	$.ajax({
		type : "GET",
		url : "/api/todo",
		success : function(data){
			//data에 전체 todo 리스트가 보내짐
			$('.todo-list').empty();
	
			countNum(data);
			
			var newData;
			
			//현재 선택된 filter 얻어와서 구별하고 todo list 뿌려줌
			if(filter == 'all') {
				newData = data;
			}
			else if(filter == 'active') {
				newData = data.filter(isActive);
			}
			else if(filter == 'completed') {
				newData = data.filter(isCompleted);
			}
			
			//newData 배열 뿌려주기(현재 객체의 completed가 0인지 1인지 각각 체크하며 뿌려줘야함_all 때문에 섞여서)
			$.each(newData, function(){
				var now = $(this).get(0);
				if(now.completed == 0){
					$('.todo-list').prepend('<li><div class="view" id="' + now.id + '"><input class="toggle" type="checkbox"><label>' + now.todo + '</label><button class="destroy"></button></div></li>');
				}
				else if(now.completed == 1){
					$('.todo-list').prepend('<li class="completed"><div class="view" id="' + now.id + '"><input class="toggle" type="checkbox" checked><label>' + now.todo + '</label><button class="destroy"></button></div></li>');
				}
			})
		}
	});
}

var todoArray = new Array();

//insert todo
$('.new-todo').keyup(function (e){
	if(e.keyCode == 13){ 
		var todoData = new Object();
		todoData.todo = $(this).val();
		
		if(todoData.todo == ''){
			alert('add your todo!');
			return;
		}
		
		$(this).val('');
		
		$.ajax({
			  type: "POST",
			  url: "/api/todo",
			  contentType: "application/json; charset=utf-8",
			  data: todoData.todo,
			  success: function(data){
				  console.log(data);
				  
				  todoData.id = data.id;
				  todoData.completed = data.completed;
				  todoArray.unshift(todoData);				 
				  
				  //add to '.todo-list'
				  if($('#all').hasClass('selected') || $('#active').hasClass('selected')){
					  $('.todo-list').prepend('<li><div class="view" id="' + data.id + '"><input class="toggle" type="checkbox"><label>' + data.todo + '</label><button class="destroy"></button></div></li>');
				  }
				  
				  //'' item left++
				  var num = Number($('.todo-count>strong').text())+1;
				  $('.todo-count>strong').text(num);
			  }
			  
		});
	}
	
})