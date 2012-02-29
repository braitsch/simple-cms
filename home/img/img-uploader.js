
function ImageUploader(form, select)
{
	var options = {
		type: 			'POST',
		dataType:       'json',
		url:            './img/img-uploader.php',
		beforeSubmit:   onRequest,
		error: 			onError,
		success:        onResponse
	};
// force clear the file box on every image select //	
	select.click(function(){		
		$(this).attr("value", "");
	})	
	select.change(function(){
		form.ajaxSubmit(options);
	})
	
	function onRequest(formData, jqForm, options)
	{
		dispatch('UPLOAD_INIT');
	}
	
	function onError(jqXHR, textStatus, errorThrown)
	{
		console.log('error', jqXHR, textStatus, errorThrown);
	}	
	
	function onResponse(response, status, xhr, $form)
	{
	//	console.log('onResponse', response, status);
		dispatch('UPLOAD_COMPLETE', [response.file]);
	}

// simple event dispatching //	
	var _listeners = [];
	this.addListener = function(e, f)
	{
		_listeners.push({event:e, func:f});
	//	console.log(this, '#listeners = ', _listeners.length);		
	}
	this.removeListener = function(e, f)
	{
		for (var i=0; i < _listeners.length; i++) {
			if (_listeners[i].event == e && _listeners[i].func == f){
				_listeners.splice(i, 1);
			}
		}
	//	console.log(this, '#listeners = ', _listeners.length);
	}
	var dispatch = function(e, args)
	{
		for (var i=0; i < _listeners.length; i++) {
			if (_listeners[i].event == e){
				_listeners[i].func.apply(null, [args]);
			}
		};
	//	console.log('dispatching :: '+e);
	}
	
}