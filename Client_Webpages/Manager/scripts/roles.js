var main = function (){
	"use strict";
	//display roles from server
	var buildRoleList = function buildRoleList(){
		//empty previous roles
		$('.roles-list').empty();
		$.get('/business/roles', function(roles){			
			roles.forEach(function(role){
				//use anchors for role -- browser will indicate clickability
				var nextRole = $('<a>').text(role).attr('href', '#');
				$('.roles-list').append($('<li>').append(nextRole));
			});
		}).fail(function(){
			alert('Get call to server for roles failed');
		});
	};

	buildRoleList();

	//set up new role click handler
	//since /users/roles put request will be processed since
	//specified in form, we want to refresh form list from server
	$('#add-role').on('click', function(event){
		$.ajax({
			url: '/business/roles',
			type: 'PUT',
			data: {role: $('#role-name').val()} //works without specifying JSON in contentType
		}).done(
			$.get('/business/roles', function(roles){
				$('.roles-list').empty();
				buildRoleList(roles);
			}).fail(function(){
			alert('Get call to server for roles failed');
		})).fail(function(){
			alert('put call failed');
		}).always(function(){
			$('#role-name').val("");
		});
	});

	$('#remove-role').on('click', function(event){
		var $role_item = $('.selected');
		if(!$role_item){
			tempAppendMessage('Role must be selected');
		} else {
			var role_name = $('a', $role_item).text();
			console.log('removing: ' + role_name);
			$.ajax({
				url: '/business/roles',
				type: 'DELETE',
				data: {role: role_name}
			}).done(tempAppendMessage.bind(null, 'Role successfully removed'))
			.fail(tempAppendMessage.bind(null, 'Error in removing role'))
			.always(buildRoleList);
		}
	});

	$('#edit-role').on('click', function(event){
		var $selected = $('.selected');
		$selected.hide();
		var $tempInput = $('<input>').attr('type', 'text').attr('id', 'edit-role-input');
		$tempInput.val($selected.text());
		var $submitEdit = $('<button>').attr('id', 'submit-edit').text('Okay').attr('type', 'button');
		$selected.after($tempInput);
		$tempInput.after($submitEdit);
		$tempInput.focus();
		
		$tempInput.on('blur', function(event){
			$selected.show();
			$tempInput.remove();
			$submitEdit.remove();
		});
		//use mousedown instead of click since it will fire before blur event
		//click fires after -- slower -- two phases press and release
		$submitEdit.on('mousedown', function(event){
			console.log($selected.text());
			console.log($tempInput.val());
			var old_role = $selected.text();
			var new_role = $tempInput.val();
			$.ajax({
				url: '/business/roles/change',
				type: 'PUT',
				data: {
					old_role: old_role,
					new_role: new_role
				}
			}).done(tempAppendMessage.bind(null, 'Successfully changed role'))
			.fail(tempAppendMessage.bind(null, 'Error occurred'))
			.always(buildRoleList());
		});



	});

	//function name defined at parse time, var name = function at runtime 
	//can't use before defined then
	function tempAppendMessage(message){
		$('.role-control').append(($('<p>').text(message)).addClass('temp'));
		setTimeout(function(){
			$('.temp').remove();
		}, 1000);
	}

	$('.roles-list').on('click', 'li', function(event){
		console.log('clicked');
		$('.selected').removeClass('selected');
		$(this).addClass('selected');

	});
};//end main

$(document).ready(main);