var imgName, imgPath, imgDesc;
var win = {	width:680, height:340, overlayOpacity:'50'};

proxy.addListener('IMAGE_DETAILS', onImageDetails);
proxy.addListener('IMAGE_PUBLISHED', onImagePublished);
proxy.addListener('IMAGE_EDITED', onImageEdited);
proxy.addListener('IMAGE_DELETED', onImageDeleted);
proxy.addListener('IMAGE_CANCELLED', onImageCancelled);

$(document).ready(function(){
	var ldr = new ImageUploader($('#my-form'), $('input[type=file]'));
	ldr.addListener('UPLOAD_INIT', onImageUploadInit);
	ldr.addListener('UPLOAD_COMPLETE', onImageUploadComplete);
	$("#img-update").click(editImage);	
	$("#img-cancel").click(cancelImage);
	$("#img-delete").click(deleteImage);
	$("#img-publish").click(publishImage);
}); 

// public methods //

function onAddImageClick()
{
	openWindow(); setViewMode('RESET');
}

// private proxy methods //

function publishImage()
{
	proxy.publishImage(pid, imgName, $("#img-description textarea").val());
}

function editImage()
{
	proxy.editImage(pid, imgName, $("#img-description textarea").val());
}

function cancelImage()
{
	proxy.cancelImageUpload(imgName);
}

function deleteImage()
{
	var k = confirm('Are you sure you want to delete this image?');
	if (k == true) proxy.deleteImage(pid, imgName);
}

// callbacks //

function onImageUploadInit()
{
	setViewMode('LOADING');
	var n = $('input[type=file]').val();
		n = n.substr(n.lastIndexOf('\\') + 1);
// truncate image file name if too long... //		
		n.length <= 22 ? n : '...'+n.substr(-22);
 	$('#img-name').text(n);
}

function onImageUploadComplete(f)
{ 
	setViewMode('PREVIEW');	
	imgPath = './'+f;
	imgName = getImageFileName();
	setImageDetails();
}

function onImagePublished(response)
{
	imgPath = null;	
	if (response == 'ok') {
		proxy.getProjectImages(pid);
	}	else{
		console.log(response);
	}
	$.closeDOMWindow();	
}

function onImageEdited(response)
{
	imgPath = null;		
	if (response == 'ok') {
		alert('image updated!');
	}	else{
		console.log(response);
	}
	$.closeDOMWindow();	
}

function onImageDeleted(response)
{
	imgPath = null;
	$.closeDOMWindow();
	proxy.getProjectImages(pid);	
}

function onImageCancelled(response)
{
	imgPath = null;	
	setViewMode('RESET');
	console.log(response);
}

function onImageDetails(response)
{
	var k = $.parseJSON( response );
	imgPath = './'+k['file'];
	imgDesc = k['desc'];
	imgName = getImageFileName();	
	setImageDetails();	
	openWindow(); setViewMode('EDITING');
}

function setImageDetails()
{
	$("#img-description textarea").val(imgDesc);
 	$('#img-container img').attr('src', imgPath);
}

function openWindow()
{
	$("#add-img h2").html($("#project-title").val());
	win.windowSourceID = '#add-img'; 	
	win.functionCallOnClose = onUploaderClosed;
	$(this).openDOMWindow(win);	
}

function onUploaderClosed()
{
	setViewMode('RESET');
	if (imgPath) cancelImage();
}

function getImageFileName()
{
	return imgPath.substr(imgPath.lastIndexOf('/') + 1);
}

function setViewMode(s)
{
	switch(s){
		case 'EDITING' :		
	 		$('#my-form').hide(); $('#loader').hide(); $('#img-preview').show(); $('#img-preview label').hide();
			$('#img-delete').show(); $('#img-update').show(); $('#img-cancel').hide(); $('#img-publish').hide();	
		break;				
		case 'LOADING' :
	 		$('#my-form').hide(); $('#loader').fadeIn(); $('#img-preview').fadeOut();
			$('#img-delete').hide(); $('#img-update').hide(); $('#img-cancel').hide(); $('#img-publish').hide();	
		break;
		case 'PREVIEW' :
	 		$('#my-form').hide(); $('#loader').fadeOut(); $('#img-preview').fadeIn(); $('#img-preview label').show(); 
			$('#img-delete').hide(); $('#img-update').hide(); $('#img-cancel').fadeIn(); $('#img-publish').fadeIn();	
		break;
		case 'RESET' :
		 	$('#img-preview img').attr('src', ''); $('#img-description textarea').val(''); imgDesc = '';
	 		$('#my-form').fadeIn(); $('#loader').fadeOut(); $('#img-preview').fadeOut();
			$('#img-delete').fadeOut(); $('#img-update').fadeOut(); $('#img-cancel').fadeOut(); $('#img-publish').fadeOut();
		break;
	}
}
