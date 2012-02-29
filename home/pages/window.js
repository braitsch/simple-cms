var imgName, imgFile, imgDesc;
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
	$("#btn-publish").click(publishImage);
	$("#btn-cancel").click(cancelImage);	
	$("#btn-update").click(updateImage);
	$("#btn-delete").click(deleteImage);	
}); 

// public methods //

function onAddImageClick()
{
	openWindow(); setViewMode('RESET');
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

function updateImage()
{
	console.log('update');
	proxy.updateImage(pid, imgName, $("#img-desc").val());
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
		alert('image updated!');
	}	else{
		console.log(response);
	}
	$.closeDOMWindow();	
}

function onImageDeleted(response)
{
	imgFile = null;
	$.closeDOMWindow();
	proxy.getProjectImages(pid);	
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
	setImageDetails();	
	openWindow(); setViewMode('EDITING');
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

function onUploaderClosed()
{
	setViewMode('RESET');
	if (imgFile) cancelImage();
}

function getImageFileName()
{
	return imgFile.substr(imgFile.lastIndexOf('/') + 1);
}

function setViewMode(s)
{
	switch(s){
		case 'EDITING' :		
	 		$('#my-form').hide(); $('#loader').hide(); $('#preview').show();
			$('#btn-delete').show(); $('#btn-update').show(); $('#btn-cancel').hide(); $('#btn-publish').hide();	
		break;				
		case 'LOADING' :
	 		$('#my-form').hide(); $('#loader').fadeIn(); $('#preview').fadeOut();
			$('#btn-delete').hide(); $('#btn-update').hide(); $('#btn-cancel').hide(); $('#btn-publish').hide();	
		break;
		case 'PREVIEW' :
	 		$('#my-form').hide(); $('#loader').fadeOut(); $('#preview').fadeIn();
			$('#btn-delete').hide(); $('#btn-update').hide(); $('#btn-cancel').fadeIn(); $('#btn-publish').fadeIn();	
		break;
		case 'RESET' :
		 	$('#preview img').attr('src', ''); $('#img-desc').val(''); imgDesc = '';
	 		$('#my-form').fadeIn(); $('#loader').fadeOut(); $('#preview').fadeOut();
			$('#btn-delete').fadeOut(); $('#btn-update').fadeOut(); $('#btn-cancel').fadeOut(); $('#btn-publish').fadeOut();
		break;
	}
}
