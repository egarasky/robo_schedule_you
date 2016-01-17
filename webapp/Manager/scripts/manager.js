var main = function(){
	$('#add-emp').on('click', function(event){
		$('.view').load('views/add-employee.html'); //path is from html page that loaded script
	});
	
	$('#view-emp').on('click', function(event){
		$('.view').load('views/edit-employees.html');
	});

	$('#roles').on('click', function(event){
		$('.view').load('views/roles.html');
	});

	$('#hours').on('click', function(event){
		$('.view').load('views/hours.html');
	});

	$('#shifts').on('click', function(event){
		$('.view').load('views/shift-schedule.html');
	});

	$('#create-schedule').on('click', function(event){
		$('.view').load('views/create-schedule.html');
	});

	$('#edit-schedule').on('click', function(event){
		$('.view').load('views/edit-schedule.html');
	});

	$('#past-schedule').on('click', function(event){
		$('view').load('views/past-schedule.html');
	});

	$('#logout').on('click', function(event){
		$.ajax({
			url: '/manager',
			type: 'DELETE'
		}).done(function(data, textStatus, jqXHR){
			alert('logout successful');
			console.log('data:' + data);
			console.log('textStatus: ' + textStatus);
			console.log('jqXHR: '); console.log(jqXHR);
			window.location.href = data;

		}).fail(function(data, textStatus, jqXHR){
			alert('logout error');
		});
	});

	//deal with chrome drop down menu bug
	$('body').on('click', 'select', function(event){
		$('body').addClass('select-activated'); //http://jsfiddle.net/davidsusu/4w8wdwbL/
		setTimeout(function(){
			$('body').removeClass('select-activated');
		}, 200);
	});

};

$(document).ready(main);