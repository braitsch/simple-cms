
var query = './php/query.php';
function Proxy()
{
	this.getProjects = function()
	{
		$.ajax({
			type: "POST", url: query,
			data: { type:'LIST_PROJECTS' },
			success: function(projects) { dispatch('PROJECTS_LOADED', projects);}
		});
	}
	this.loadProject = function(pName)
	{
		$.ajax({
			type: "POST", url: query,
			data: { type:'LOAD_PROJECT', title : pName },
			success: function(response) { dispatch('PROJECT_SELECTED', response); }
		});	
	}
	this.addProject = function(t, d)
	{
		$.ajax({
			type: "POST", url: query,
			data: { type:'SAVE_PROJECT', title:t, desc:d },
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
		console.log('deleting project # '+pid);		
		$.ajax({
			type: "POST", url: query,
			data: { type:'DELETE_PROJECT', id:pid },
			success: function(projects) { dispatch('PROJECT_DELETED', projects);}
		});		
	}
// images & video //
	this.publishImage = function(pid, f, d)
	{
		$.ajax({
			type: "POST", url: query,
			data: { type:'PUBLISH_IMAGE', proj:pid, file:f, desc:d},
			success: function(projects) { dispatch('IMAGE_PUBLISHED', projects);}
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