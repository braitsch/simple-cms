$(document).ready(function() {
	
	proxy.addListener('HOMEPAGE_INFO_RECEIEVED', onHomePageInfo);
	
	$("#change-home-image").click(function() { 
		alert('change-homepage-image');
	});
	
	$("#update-home-summary").click(function() { 
		proxy.setHomePageDesc($("#home-description").val());
	});
	
	function onHomePageInfo(info)
	{
		info = $.parseJSON( info );
	//	$("#home-image").attr('src', info['image']); 
		$("#home-description").val(info['desc']);
	}
	
	proxy.getHomePageInfo();
		
});