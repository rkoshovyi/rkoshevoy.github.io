$(document).ready(function() {
	var show_modal = $('.phone_text');
	var modal = $('.consult_modal');
	var close_modal = $('.close_modal');

	$(show_modal).click(function() {
		$(modal).removeClass('hide');
	})

	$(close_modal).click(function() {
		$(modal).addClass('hide');
	})
});