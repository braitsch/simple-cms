var proxy = new Proxy();

$(document).ready(function() {

	var pages = ['Home', 'Projects', 'Press', 'Contact'];

	$("#main-nav li").click(function() { onGlobalNavClick($(this))});
	$("#btn-logout").click(function()  { window.location.replace("../logout");});

	function onGlobalNavClick(e)
	{
		$("#main-nav li").attr('class','');	e.attr('class','active');
		for (var i=0; i < 4; i++) {
			var n = $('#'+pages[i].toLowerCase());
			pages[i] == e.text() ? n.show() : n.hide();
		};
	}
	
// set projects as the default page //
	$('#projects').show();
	$("#main-nav li").each(function() { if ($(this).text() == 'Projects') $(this).attr('class', 'active');});
	
});

