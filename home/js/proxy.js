
var query = './php/query.php';
function Proxy()
{
	this.getProjects = function()
	{
		$.ajax({
			type: "POST", url: query,
			data: { type:'GET_PROJECT_LIST' },
			success: function(projects) { dispatch('PROJECTS_LOADED', projects);}
		});
	}
	this.getProjectDetails = function(pName)
	{
		$.ajax({
			type: "POST", url: query,
			data: { type:'GET_PROJECT_DETAILS', title : pName },
			success: function(response) { dispatch('PROJECT_SELECTED', response); }
		});	
	}
	this.addProject = function(t, d)
	{
		$.ajax({
			type: "POST", url: query,
			data: { type:'ADD_PROJECT', title:t, desc:d },
			success: function(projects) { dispatch('PROJECTS_LOADED', projects);}
		});		
	}
	this.updateProject = function(pid, t, d)
	{
		$.ajax({
			type: "POST", url: query,
			data: { type:'EDIT_PROJECT', id:pid, title:t, desc:d },
			success: function(projects) { dispatch('PROJECTS_LOADED', projects);}
		});		
	}	
	this.deleteProject = function(pid)
	{
		$.ajax({
			type: "POST", url: query,
			data: { type:'DELETE_PROJECT', id:pid },
			success: function(projects) { dispatch('PROJECT_DELETED', projects);}
		});		
	}
// images & video //
	this.getProjectImages = function(pid)
	{
		$.ajax({
			type: "POST", url: query,
			data: { type:'GET_PROJECT_IMAGES', proj:pid},
			success: function(imgs) { dispatch('IMAGES_RECEIVED', imgs);}
		});
	}
	this.getImageDetails = function(pid, f)
	{
		$.ajax({
			type: "POST", url: query,
			data: { type:'GET_IMAGE_DETAILS', proj:pid, file:f},
			success: function(response) { dispatch('IMAGE_DETAILS', response);}
		});
	}
	this.publishImage = function(pid, f, d)
	{
		$.ajax({
			type: "POST", url: query,
			data: { type:'PUBLISH_IMAGE', proj:pid, file:f, desc:d},
			success: function(response) { dispatch('IMAGE_PUBLISHED', response);}
		});
	}
	this.editImage = function(pid, f, d)
	{
		$.ajax({
			type: "POST", url: query,
			data: { type:'EDIT_IMAGE', proj:pid, file:f, desc:d},
			success: function(response) { dispatch('IMAGE_EDITED', response);}
		});
	}	
	this.deleteImage = function(pid, f)
	{
		$.ajax({
			type: "POST", url: query,
			data: { type:'DELETE_IMAGE', proj:pid, file:f},
			success: function(response) { dispatch('IMAGE_DELETED', response);}
		});
	}	
	this.cancelImageUpload = function(f)
	{
		$.ajax({
			type: "POST", url: query,
		    data: { type:'CANCEL_IMAGE', file:f },
			success: function(response) { dispatch('IMAGE_CANCELLED', response);}
		});		
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