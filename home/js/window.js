var imgName, imgFile, imgDesc;
var win = {	width:680, height:340, overlayOpacity:'50'};

proxy.addListener('IMAGE_PUBLISHED', onImagePublished);
proxy.addListener('IMAGE_EDITED', onImageEdited);
proxy.addListener('IMAGE_DETAILS', onImageDetails);
proxy.addListener('IMAGE_CANCELLED', onImageCancelled);
//proxy.addListener('IMAGE_DELETED', onImageDeleted);

$(document).ready(function(){
	var ldr = new ImageUploader($('#my-form'), $('input[type=file]'));
		ldr.addListener('UPLOAD_INIT', onImageUploadInit);
		ldr.addListener('UPLOAD_COMPLETE', onImageUploadComplete);
	$("#btn-publish").click(publishImage);
	$("#btn-cancel").click(cancelImage);	
	// $("#btn-edit").click(editImage);
	// $("#btn-delete").click(deleteImage);	
}); 

// public methods //

function onAddImageClick()
{
	openWindow();
 	$('#preview').hide(); $('#controls').hide(); $('#loader').hide();	
}

// private proxy methods //

function publishImage()
{
	proxy.publishImage(pid, imgName, $("#img-desc").val());
}

function cancelImage()
{
	proxy.cancelImageUpload(imgName);
}

function editImage()
{
	proxy.editImage(pid, imgName, $("#img-desc").val());
}

function deleteImage()
{
	proxy.editImage(pid, imgName);
}

// callbacks //

function onImageUploadInit()
{
	setViewMode('LOADING');
}

function onImageUploadComplete(f)
{ 
	setViewMode('PREVIEW');	
	imgFile = './'+f;
	imgName = getImageFileName();
	setImageDetails();
}

function onImagePublished(response)
{
	imgFile = null;	
	if (response == 'ok') {
		proxy.getProjectImages(pid);
	}	else{
		console.log(response);
	}
	$.closeDOMWindow();	
}

function onImageEdited(response)
{
	imgFile = null;
	if (response == 'ok') {
		alert('image updated.');
	}	else{
		console.log(response);
	}
}

function onImageCancelled(response)
{
	imgFile = null;	
	setViewMode('RESET');
	console.log(response);	
}

function onImageDetails(response)
{
	var k = $.parseJSON( response );
	imgFile = './'+k['file']; 
	imgName = getImageFileName();
	imgDesc = k['desc'];
	setImageDetails(); openWindow();
 	$('#preview').show(); $('#controls').show(); $('#loader').hide();
}

function setImageDetails()
{
// truncate image file name if too long... //
	var name = (imgName.length <= 22) ? imgName : '...'+imgName.substr(-22);
 	$('#img-name').text(name);
	$("#img-desc").val(imgDesc)	
 	$('#preview img').attr('src', imgFile);	
}

function openWindow()
{
	$("#add-img h2").html($("#title").val());
	win.windowSourceID = '#add-img'; 
	win.functionCallOnClose = onUploaderClosed;
	$(this).openDOMWindow(win);	
}

function getImageFileName()
{
	return imgFile.substr(imgFile.lastIndexOf('/') + 1);
}

function setViewMode(s)
{
	switch(s){
		case 'RESET' :
	 		$('#loader').fadeOut();	$('#preview').fadeOut(); $('#controls').fadeOut();
		break;		
		case 'LOADING' :
	 		$('#loader').fadeIn(); $('#preview').fadeOut(); $('#controls').fadeOut();		
		break;
		case 'PREVIEW' :
	 		$('#loader').fadeOut();	$('#preview').fadeIn(); $('#controls').fadeIn();		
		break;
		case 'EDITING' :
	 		$('#loader').fadeOut();	$('#preview').fadeIn(); $('#controls').fadeIn();		
		break;				
	}
}

function onUploaderClosed()
{
	console.log('onUploaderClosed');	
	if (!imgFile) return;
	var matched = false;
	$("#image-grid li img").each(function(i) {
		var s = $(this).attr('src');
	// check if loaded image is in the current project
		if (s == imgFile) matched = true;
	});	
	// otherwise remove the orphaned image from the file system //		
	if (!matched) cancelImage();
}
