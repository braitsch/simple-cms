var proxy = new Proxy();

$(document).ready(function() {

	$("#main-nav li").click(function() { onGlobalNavClick($(this))});
	$("#btn-logout").click(function()  { window.location.replace("../logout");});

	function onGlobalNavClick(e)
	{
		$("#main-nav li").attr('class','');	
		e.attr('class','active'); console.log(e.text());
	}
	
});

