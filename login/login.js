$(document).ready(function() {

	$("#login").click(function() {
		if (!$("#user").val() || !$("#user").val()){
			$("#error").html("Invalid username and/or password");
		}	else{
			$.ajax({
				type: "POST",
				url: './login.php',
				data: {user : $("#user").val(), pass : $("#pass").val() },
				success: function(response) {
					if (response == 'success') {
						window.location.replace("../home");
					}	else{
						$("#error").html("Invalid username and/or password");
					}
				}
			});			
		}
		return false;
	});
	
});