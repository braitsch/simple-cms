$(document).ready(function() {
	
	proxy.addListener('CONTACT_INFO_RECEIEVED', onContactInfo);		
	
	$("#contact-edit").click(function() { 
		var n = $("#contact-name").val();
		var e = $("#contact-email").val();
		if (n != '' && e != ''){
			proxy.setContactInfo(n, e);
		}	else{
			alert('neither name or email can be blank.')			
		}
	});
	
	function onContactInfo(info)
	{
		info = $.parseJSON( info );
		$("#contact-name").val(info['name']);
		$("#contact-email").val(info['email']);
	}
	
	proxy.getContactInfo();
		
});