
var php_script = './proxies/db-proxy.php';
function Proxy()
{
	this.getProjects = function()
	{
		$.ajax({
			type: "POST", url: php_script,
			data: { type:'GET_PROJECT_LIST' },
			success: function(projects) { if (projects) dispatch('PROJECTS_LOADED', projects);}
		});
	}
	this.getProjectDetails = function(pName)
	{
		$.ajax({
			type: "POST", url: php_script,
			data: { type:'GET_PROJECT_DETAILS', title : pName },
			success: function(response) { dispatch('PROJECT_SELECTED', response); }
		});	
	}
	this.setProjectPositions = function(a)
	{
		$.ajax({
			type: "POST", url: php_script,
			data: { type:'SORT_PROJECTS', data:a},
			success: function(response) { console.log(response);}
		});		
	}	
	this.addProject = function(t, d)
	{
		$.ajax({
			type: "POST", url: php_script,
			data: { type:'ADD_PROJECT', title:t, desc:d },
			success: function(projects) { dispatch('PROJECTS_LOADED', projects);}
		});		
	}
	this.updateProject = function(pid, t, d)
	{
		$.ajax({
			type: "POST", url: php_script,
			data: { type:'EDIT_PROJECT', id:pid, title:t, desc:d },
			success: function(projects) { alert('project updated!'); dispatch('PROJECTS_LOADED', projects);}
		});		
	}	
	this.deleteProject = function(pid)
	{
		$.ajax({
			type: "POST", url: php_script,
			data: { type:'DELETE_PROJECT', id:pid },
			success: function(projects) { dispatch('PROJECT_DELETED', projects);}
		});		
	}
// images & video //
	this.getProjectImages = function(pid)
	{
		$.ajax({
			type: "POST", url: php_script,
			data: { type:'GET_PROJECT_IMAGES', proj:pid},
			success: function(imgs) { dispatch('IMAGES_RECEIVED', imgs);}
		});
	}
	this.getImageDetails = function(pid, f)
	{
		$.ajax({
			type: "POST", url: php_script,
			data: { type:'GET_IMAGE_DETAILS', proj:pid, file:f},
			success: function(response) { dispatch('IMAGE_DETAILS', response);}
		});
	}	
	this.setImagePositions = function(a)
	{
		$.ajax({
			type: "POST", url: php_script,
			data: { type:'SORT_IMAGES', proj:pid, data:a},
			success: function(response) { console.log(response);}
		});		
	}
	this.publishImage = function(pid, f, d)
	{
		$.ajax({
			type: "POST", url: php_script,
			data: { type:'PUBLISH_IMAGE', proj:pid, file:f, desc:d},
			success: function(response) { dispatch('IMAGE_PUBLISHED', response);}
		});
	}
	this.editImage = function(pid, f, d)
	{
		$.ajax({
			type: "POST", url: php_script,
			data: { type:'EDIT_IMAGE', proj:pid, file:f, desc:d},
			success: function(response) { dispatch('IMAGE_EDITED', response);}
		});
	}	
	this.deleteImage = function(pid, f)
	{
		$.ajax({
			type: "POST", url: php_script,
			data: { type:'DELETE_IMAGE', proj:pid, file:f},
			success: function(response) { dispatch('IMAGE_DELETED', response);}
		});
	}	
	this.cancelImageUpload = function(f)
	{
		$.ajax({
			type: "POST", url: php_script,
		    data: { type:'CANCEL_IMAGE', file:f },
			success: function(response) { dispatch('IMAGE_CANCELLED', response);}
		});		
	}
	
// press items //
	this.getPressList = function()
	{
		$.ajax({
			type: "POST", url: php_script,
		    data: { type:'GET_PRESS_LIST'},
			success: function(response) { dispatch('PRESS_ITEMS_LOADED', response);}
		});
	}
	this.getPressItemDetails = function(pid)
	{
		$.ajax({
			type: "POST", url: php_script,
		    data: { type:'GET_PRESS_ITEM_DETAILS', pid:pid},
			success: function(response) { dispatch('PRESS_ITEM_SELECTED', response);}
		});
	}	
	this.setPressListPositions = function(a)
	{
		$.ajax({
			type: "POST", url: php_script,
			data: { type:'SORT_PRESS_ITEMS', data:a},
			success: function(response) { console.log(response);}
		});		
	}	
	this.addPressItem = function(p, d, l)
	{
		$.ajax({
			type: "POST", url: php_script,
		    data: { type:'ADD_PRESS_ITEM', pub:p, desc:d, link:l },
			success: function(response) { dispatch('PRESS_ITEMS_LOADED', response);}
		});		
	}
	this.editPressItem = function(pid, p, d, l)
	{
		$.ajax({
			type: "POST", url: php_script,
		    data: { type:'EDIT_PRESS_ITEM', pid:pid, pub:p, desc:d, link:l },
			success: function(response) { alert('item updated!'); dispatch('PRESS_ITEMS_LOADED', response);}
		});		
	}
	this.deletePressItem = function(pid)
	{
		$.ajax({
			type: "POST", url: php_script,
		    data: { type:'DELETE_PRESS_ITEM', pid:pid },
			success: function(response) { dispatch('PRESS_ITEM_DELETED', response);}
		});
	}
	
// homepage //

	this.getHomePageInfo = function()
	{
		$.ajax({
			type: "POST", url: php_script,
		    data: { type:'GET_HOMEPAGE_INFO' },
			success: function(response) { dispatch('HOMEPAGE_INFO_RECEIEVED', response); }
		});		
	}
	
	this.setHomePageDesc = function(d)
	{
		$.ajax({
			type: "POST", url: php_script,
		    data: { type:'SET_HOMEPAGE_SUMMARY', desc:d },
			success: function(response) { alert('cover description updated!'); }
		});
	}	
	
// personal contact information //

	this.getContactInfo = function(n, e)
	{
		$.ajax({
			type: "POST", url: php_script,
		    data: { type:'GET_CONTACT_INFO' },
			success: function(response) { dispatch('CONTACT_INFO_RECEIEVED', response);}
		});
	}
	this.setContactInfo = function(n, e)
	{
		$.ajax({
			type: "POST", url: php_script,
		    data: { type:'SET_CONTACT_INFO', name:n, email:e },
			success: function(response) { alert('contact information updated!'); }
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