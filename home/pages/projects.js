var pid; // the currently selected project id //

$(document).ready(function() {

	$("#project-list ul").sortable({stop: function(e, o) { onProjectSort() }});
	$("#project-list ul").disableSelection();
	$("#project-media ul").sortable({stop: function(e, o) { onImageSort() }});	
	$("#project-media ul").disableSelection();		
	$("#project-new").click(function() { showNewProjectTemplate(); });
	$("#project-save").click(function() { addNewProject(); });	
	$("#project-edit").click(function() { editProject(); });
	$("#project-delete").click(function() { deleteProject(); });
	$('#add-image').click(function()  { onAddImageClick() });
	$('#add-video').click(function()  { alert('videos coming soon') });
	
	proxy.addListener('PROJECTS_LOADED', onProjectList);	
	proxy.addListener('PROJECT_SELECTED', onProjectLoaded);
	proxy.addListener('PROJECT_DELETED', onProjectDeleted);	
	proxy.addListener('IMAGES_RECEIVED', onProjectImages);	
	
// proxy callbacks //

	function onProjectList(projects)
	{
		var a = projects.split(',');
		$("#project-list ul").empty();
		for (var i=0; i < a.length - 1; i++) $("#project-list ul").append("<li class='ui-state-default'><span class='ui-icon ui-icon-arrowthick-2-n-s'></span>"+ a[i] +"</li>");
		$("#project-list li").click(function() { proxy.getProjectDetails($(this).text()); });
	}
	
	function onProjectLoaded(proj)
	{
		var k = $.parseJSON( proj );
		pid = k['id'];
		$("#project-title").val(k['title']);
		$("#project-description").val(k['desc']);
		$("#project-content h2").html(k['title']);
		showProjectDetails();
		proxy.getProjectImages(pid);		
	}
	
	function onProjectImages(imgs)
	{
		$("#project-media-grid").empty();		
		var imgs = $.parseJSON( imgs );
		if (imgs){
			$.each(imgs, function(i, o) {
				var k = $("#project-media-grid").append("<li><img src="+'./files/tmb/'+o['file']+"></li>");
	  		});
			$('#project-media-grid li img').each(function(i, o) {
				var s = $(o).attr('src'); s = s.substr(s.lastIndexOf('/') + 1);
				$(o).click(function(){ proxy.getImageDetails(pid, s)});
				$(o).hide(); $(o).delay(i * 100).fadeIn();				
			});
		}
	}	
	
	function onProjectDeleted(projects)
	{
		showNewProjectTemplate(); onProjectList(projects);
	}		
	
// button events //		

	function addNewProject()
	{
		if ($("#project-title").val() == ''){
			alert('please enter a title for this project');			
		}	else if ($("#project-description").val() == ''){
			alert('please enter a description for this project');
		}	else{
			proxy.addProject($("#project-title").val(), $("#project-description").val());
		}
	}
	
	function editProject()
	{
		proxy.updateProject(pid, $("#project-title").val(), $("#project-description").val());
	}
	
	function deleteProject()
	{
		var k = confirm('Are you sure you want to delete this project?');
		if (k == true) proxy.deleteProject(pid);
	}		
	
// list sorting //			
	
	function onProjectSort()
	{
		var a = [];
		$("#project-list ul li").each(function(i, o){ 
			a.push({pos:i+1, title:$(o).text()}); 
		})
		proxy.setProjectPositions(a);
	}	
	
	function onImageSort()
	{
		var a = [];
		$("#project-media ul li img").each(function(i, o){
			f = $(o).attr('src');
			a.push({id:i+1, file:f.substr(f.lastIndexOf('/') + 1)});
		})
		proxy.setImagePositions(a);
	}	
	
// view states //

	function showProjectDetails()
	{
		$("#project-media").show();
		$("#project-save").hide();
		$("#project-edit").show();
		$("#project-delete").show();			
	}
	
	function showNewProjectTemplate()
	{	
		$("#project-media").hide();		
		$("#project-media-grid").empty();		
		$("#project-save").show();
		$("#project-edit").hide();
		$("#project-delete").hide();
		$("#project-title").val('');
		$("#project-description").val('');
		$("#project-content h2").html('New Project');		
	}
	
	proxy.getProjects(); showNewProjectTemplate();
	
});