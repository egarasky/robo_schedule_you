var main = function(){
	"use strict";

	var hoursSliderAttr = {
		min: "0",
		max: "40",
		step: "1"
	};
	$("#emp-hours-cap").attr(hoursSliderAttr);

	var empPreferenceAttr = {
		min: "0",
		max: "1",
		step: ".01"
	};

	$('#emp-priority').attr(empPreferenceAttr);

	var buildEmployeeList = function buildEmployeeList(){
		$('.employees-list').empty();
		$('.employee-name').text('');
		$('.employee-role').text('');
		$.get('/manager/employees/edit', function(employees){
			console.log('called get employees');
			employees.forEach(function(employee){
				console.log(employee);
				var nextEmployee = $('<a>').text(employee.firstname + ' ' + employee.lastname);
				$('.employees-list').append($('<li>').append(nextEmployee).data('employee', employee));
			});
		});
	}; //end build employees

	$('.employees-list').on('click', 'li', function(event){
		$('.selected').removeClass('selected');
		$(this).addClass('selected');
		var emp = $(this).data('employee');
		$('.employee-name').text(emp.firstname + ' ' + emp.lastname);
		$('.employee-role').text(emp.role);
		setWeightedValues(emp);
	});

	function setWeightedValues(employee){
		var preferences = employee.managerpreferences;
		if(!preferences) return;
		$('#emp-priority').val(preferences.priority).trigger('change');
		$('#emp-hours-cap').val(preferences.capHours).trigger('change');
		$('#full-time').attr('checked', preferences.fulltime);
		$('#cap-true').attr('checked', preferences.shouldCapHours);
	}
	buildEmployeeList();

	$('#emp-priority').on('change mousemove', function() {
		if(!$('.selected')) return;
		var display = Math.floor(($(this).val() * 100)) + '%';
		$('#priority-val').text(display);
	});

	$('#emp-hours-cap').on('change mousemove', function() {
		// var hours = Number($(this).val())/100;
		// hours *= 40;
		// hours = Math.floor(hours);
		if(!$('.selected')) return;
		$('#hours-val').text($(this).val());
	});

	$('#remove-employee').on('click', function(event){
		var emp = $('.selected').data('employee');
		$.ajax({
			url: '/manager/employees',
			type: 'DELETE',
			data: {employee: emp}
		}).done(function(data, textStatus, jqXHR){
			alert('employee successfully deleted');
			buildEmployeeList();
		}).fail(function(jqXHR, textStatus, errorThrown){
			alert('Server error in deleting employee' + errorThrown);
		});
	});

	$('#edit-employee').on('click', function(event){
		var employee = $('.selected').data('employee');
		if(!employee) return;
		var data = {
			emp_id: employee._id,
			priority: $('#emp-priority').val(),
			capHours: $('#emp-hours-cap').val(),
			shouldCapHours: $('#cap-true').is(":checked"),
			full: $('#full-time').is(":checked")
		};
		console.log(data);
		$.ajax({
		 	url: '/manager/employee/preferences',
		 	type: 'PUT',
		 	data: data
		}).done(function(){
			alert('updated successfully');
			buildEmployeeList();
		});
	});
};

$(document).ready(main);