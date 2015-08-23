//clicking on tab resets main .content of html tree by Jquery - generally tab list
//start with tab array - collect json objects then 

//JQuery module export different from nodes, no export or modules function, just return objects

var tabs = function(employee) { 
//import module -- causes function to run -- use getScript

//create tab objects
//day gets passed from employee availability array of Day objects with fields: dayName, times
var $tabContainer = $('.day-tabs'),
	$contentContainer = $('.time-intervals');

	var createTab = function(day, index){
		var $tabElement = $('<a>').attr('href', '');
		var $spanElement = $('<span>');
		$tabElement.append($spanElement);
		var tab = {
					name: day.dayName,
					index: index,
					changeContent: function (){
						$contentContainer.empty();
						day.times.forEach(function(interval, index){
						    var $TimeElement = $("<p>").text(interval.startTime + ' - ' + interval.endTime).
						    	data('index', index);
						    	$TimeElement.data('startTime', interval.startTime).data('endTime', interval.endTime);

							$contentContainer.append($TimeElement);
						//add click hander for each
							$TimeElement.on('click', function(){
								console.log($contentContainer.children().length);
								$('.selected').show();
								$('#div-edit').remove();
								//$contentContainer.filter($('p')).removeClass('selected'); doesn't work
								//selects 0?? can't remove class 
								$contentContainer.children().removeClass('selected');
								$(this).addClass('selected');
							});
						});

					} //end content function
				}; //tabObject

			$spanElement.on("click", function(){
				$(".day-tabs a span").removeClass("active"); //move active class to highlight clicked tab
				$spanElement.addClass("active");
				tab.changeContent();
				return false; //consume click event, does not get passed up widget tree
			}); //end click handler

			//add tabs to container
			$spanElement.text(tab.name);
			$tabContainer.append($tabElement);
		};
	employee.availability.forEach(function(value, index){
		createTab(value, index); //passing an array of {startTime, endTime} representing a day
	}); 
};



	//push other tabs

// //$container is holder for time intervals
// 	var createTabElements = function(){
// 		//function passed to forEach gets passed parameters in order value, index, array, thisArg
// 		var tabs = [];
// 		//for each day in availability, create tab with content function
// 		employee.availability.forEach(function(day){
// 			tabs.push(createTab(day, $container)); 
// 		});
		
// 		//create actual html elements for DOM
// 		var tabElements = [];
// 		tabs.forEach(function (tab, index, tabs) {
// 		var $aElement = $("<a>").attr("href", ""),
// 			$spanElement = $("<span>").text(tab.dayName);

// 		$aElement.append($spanElement);
// //use closures...
// 		$spanElement.on("click", function(){
// 			$(".tabs a span").removeClass("active"); //move active class to highlight clicked tab
// 			$spanElement.addClass("active");
// 			$container.empty();
// 			$container.append(tab.content());
// 			return false; //consume click event, does not get passed up widget tree
// 		}); //end click handler
// 		tabElements.push($aElement);
// 		}); //end for each tabElements creation
// 		return tabElements;
// 	};
// 	return createTabElements;
// };//end create tabs function assignment

$(document).ready(function(){
	$.getJSON("/employee.JSON", function(employee){
		tabs(employee);
	});
});