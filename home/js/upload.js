
function ImageUploader(form, select)
{
	var options = {
		dataType:       'json',	    
		url:            './php/upload.php',
		beforeSubmit:   onRequest,
		success:        onResponse
	};
// force clear the file box on every image select //	
	select.click(function(){	
			console.log('click');		
		$(this).attr("value", "");
	})	
	select.change(function(){
		console.log('change');
		form.ajaxSubmit(options);
	})
	
	function onRequest(formData, jqForm, options)
	{
		console.log('onRequest');
		dispatch('UPLOAD_INIT');
	}	
	
	function onResponse(response, status, xhr, $form)
	{
		console.log('response');		
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