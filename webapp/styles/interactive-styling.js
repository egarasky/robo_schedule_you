var main = function(){
	$('.nav a').on('click', function(){
		$('.nav').find('.active').removeClass('active');
		$(this).parent().addClass('active');
	});
};

$(document).ready(main);