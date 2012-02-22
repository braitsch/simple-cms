var imgName;

$(document).ready(function(){
	var options = {
		dataType:       'json',	    
		url:            './php/upload.php',
		beforeSubmit:   onRequest,
		success:        onResponse
	};
	$('#my-form').submit(function() {
		$(this).ajaxSubmit(options);
		return false;
	});
    $('input[type=file]').change(function(e){
 	    $('#preview').fadeOut();
   	    $('#my-form').ajaxSubmit(options);
    });
	$("#btn-cancel").click(onCancel);
	$("#btn-publish").click(onPublish);
 	$('#preview').hide(); $('#controls').hide(); $('#loader').hide();	
}); 

function onRequest(formData, jqForm, options) { 
    var queryString = $.param(formData);
	showPreview(false); $('#loader').fadeIn();
    console.log('About to submit: \n\n' + queryString);
    return true; 
} 
 
function onResponse(responseText, statusText, xhr, $form) { 
	var n = imgName = responseText.name;
	if (n.length > 22) n = '...'+n.substr(-22);
 	$('#img-name').text(n);
 	$('#preview img').attr('src', responseText.file);
	showPreview(true); 	$('#loader').fadeOut();
    console.log('\nstatus: ' + statusText + '\nresponseText: ' + responseText.name); 
}

function onCancel()
{
	console.log('deleting '+imgName);
	$.ajax({
		type: "POST",
		url: './php/cancel.php',
		data: { file:imgName },
		success: function(response){
			if (response == 'ok'){
				showPreview(false);
			}
		}
	});
}

function onPublish()
{
	$.ajax({
		type: "POST",
		url: './php/query.php',
		data: {
			type:'PUBLISH-IMAGE', file:imgName, desc:$("#img-desc").val(), proj:pid
		},
		success: function(response){
			console.log('response = '+response);
		}
	});
}

function showPreview(b)
{
	if (b == false){
 		$('#preview').fadeOut(); 
 		$('#controls').fadeOut();	
	}	else{		
 		$('#preview').fadeIn(); 
 		$('#controls').fadeIn();			
	}
}
