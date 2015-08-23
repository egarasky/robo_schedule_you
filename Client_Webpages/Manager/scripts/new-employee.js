var main = function(roles){
	roles.forEach(function(role){
		console.log('role: ' + role);
		$('#role-select').append($('<option>').val(role).text(role));
	});

	$('#create-employee').on('click', function(event){
		//still need to validate info


		$.ajax({
			url: '/manager/employees',
			type: 'POST',
			data: {
				firstname: $('#first-name').val(),
				lastname: $('#last-name').val(),
				username: $('#username').val(),
				password: $('#password').val(),
				role: $('#role-select').val()
			}
		}).done(function(data, textStatus, jqXHR){
			if(data === 'OK') {
				$('#create-emp-container').append($('<h2>').text('Employee created').addClass('temp'));
				setTimeout(function(){
					$('#create-emp-container .temp').remove();
				}, 1000);

			}
		}).fail(function(data, textStatus, jqXHR){
			alert('error: ' + data);
		}).always(function(){
			$('input').val("");
		});
	});

};
$(document).ready(function(){
	$.get('/business/roles', function(roles){
		console.log(roles);
		main(roles);
	}).fail(function(){
		alert('Get call to server for roles failed');
	});
});