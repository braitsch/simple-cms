var imgFileName;
var win = {	width:680, height:340, overlayOpacity:'50'};

proxy.addListener('IMAGE_PUBLISHED', onImagePublished);
proxy.addListener('IMAGE_CANCELLED', onImageCancelled);

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
    $('input[type=file]').click(function(){	
// force clear the file box on every image select //	
		$(this).attr("value", "");
	})	
    $('input[type=file]').change(function(){
 	    $('#preview').fadeOut();
   		$('#my-form').ajaxSubmit(options);		
	})
	$("#btn-cancel").click(cancelImage);
	$("#btn-publish").click(publishImage);
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

function cancelImage()
{
	proxy.cancelImageUpload(imgFileName);
}

function onImageCancelled(response)
{
	hideImageDetails();
	imgFileName = null;
	console.log(response);	
}

function publishImage()
{
	proxy.publishImage(pid, imgFileName, $("#img-desc").val());
}

function onImagePublished(response)
{
	$.closeDOMWindow();
	imgFileName = null;	
	console.log(response);
}

function getImages()
{
	// todo //
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
	console.log('onUploaderClosed');	
	if (!imgFileName) return;
	var matched = false;
	$("#image-grid li img").each(function(i) {
		var s = $(this).attr('src');
	// check if loaded image is in the current project
		s = s.substr(s.lastIndexOf('/') + 1);
		if (s == imgFileName) matched = true;
	});	
	// otherwise remove the orphaned image from the file system //		
	if (!matched) cancelImage();
}
