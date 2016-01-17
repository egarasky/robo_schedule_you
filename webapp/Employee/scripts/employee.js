var main = function(){
	$('#view-employee-availability').click(function(event){
		$('main').load('views/employee-availability.html');
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

	
};

$(document).ready(main);