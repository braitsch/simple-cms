var imgFileName;
var win = {	width:680, height:340, overlayOpacity:'50'};

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
}); 

function onRequest(formData, jqForm, options) { 
	hideImageDetails(); $('#loader').fadeIn();
    return true;
} 
 
function onResponse(response, status, xhr, $form) { 
	var n = imgFileName = response.name;
// truncate image file name if too long... //	
	if (n.length > 22) n = '...'+n.substr(-22);
 	$('#img-name').text(n);
 	$('#preview img').attr('src', response.file);
	showImageDetails();
    console.log('\nstatus: ' + status + '\nresponse: ' + response.name); 
}

function onCancel()
{
	$.ajax({
		type: "POST",
		url: './php/cancel.php',
		data: { file:imgFileName },
		success: function(response){
			if (response == 'ok') hideImageDetails();
		}
	});
	console.log(imgFileName, 'removed from file system');
	imgFileName = null;
}

function onPublish()
{
	$.ajax({
		type: "POST",
		url: './php/query.php',
		data: {
			type:'PUBLISH-IMAGE', file:imgFileName, desc:$("#img-desc").val(), proj:pid
		},
		success: function(response){
			$.closeDOMWindow();
		}
	});
	imgFileName = null;	
}

function showImageDetails()
{
 	$('#loader').fadeOut();	
	$('#preview').fadeIn();
	$('#controls').fadeIn();
}

function hideImageDetails()
{
 	$('#preview').fadeOut();
 	$('#controls').fadeOut();
}
function showImageUploader()
{
	$("#add-img h2").html($("#title").val());
	win.windowSourceID = '#add-img'; 
	win.functionCallOnClose = onUploaderClosed; 
	var k = $(this).openDOMWindow(win);
 	$('#preview').hide(); $('#controls').hide(); $('#loader').hide();	
}
function onUploaderClosed()
{
// remove any orphaned images from the file system //	
	if (imgFileName) onCancel();
}
