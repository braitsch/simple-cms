var pid;
var query = './php/query.php';
var proxy = new Proxy();

$(document).ready(function() {

	proxy.addListener('PROJECTS_LOADED', buildProjectList);
	proxy.addListener('PROJECT_SELECTED', displayProject);
	proxy.addListener('PROJECT_DELETED', onProjectDeleted);		

	$("#media ul").sortable({
	//	stop: function(e, o) { alert(o.position) }
	});
	$("#media ul").disableSelection();	
	$("#project-list ul").sortable();
	$("#project-list ul").disableSelection();
	$('.dom-window').click(function()  { showImageUploader() });	
	$("#btn-logout").click(function()  { window.location.replace("../logout");});
	$("#main-nav li").click(function() { onGlobalNavClick($(this))});	
	$("#new-project").click(function() { showNewProjectTemplate(); });

	$("#project-save").click(function() {
		if ($("#title").val() == ''){
			alert('please enter a title for this project');			
		}	else if ($("#description").val() == ''){
			alert('please enter a description for this project');
		}	else{
			proxy.addProject($("#title").val(), $("#description").val());
		}
		return false;
	});
	
	$("#project-update").click(function() {
		proxy.updateProject(pid, $("#title").val(), $("#description").val());
		return false;
	});	
	
	$("#project-delete").click(function() {
		var k = confirm('Are you sure you want to delete this project?');
		if (k == true) proxy.deleteProject(pid);
		return false;		
	});	
		
	function buildProjectList(projects)
	{
		var a = projects.split(',');
		$("#project-list ul").empty();
		for (var i=0; i < a.length - 1; i++) $("#project-list ul").append("<li class='ui-state-default'><span class='ui-icon ui-icon-arrowthick-2-n-s'></span>"+ a[i] +"</li>");
		$("#project-list li").click(function() { proxy.loadProject($(this).text()); });
	}
	
	function displayProject(response)
	{
		var k = eval("(" + response + ")");				
		pid = k['id'];
		$("#title").val(k['title']);
		$("#description").val(k['desc']);
		$("#content h2").html(k['title']);
		if (k['images']){
			$.each(k['images'], function(i, o) {
				$("#image-grid").append("<li><img src="+'./files/tmb/'+o['file']+"></li>");
  			});					
		}
		showProjectDetails();		
	}
	
	function onProjectDeleted(projects)
	{
		showNewProjectTemplate();
		buildProjectList(projects);
	}
	
// view states //
	function showProjectDetails()
	{
		$("#media").show();
		$("#image-grid").empty();	
		$("#project-save").hide();
		$("#project-update").show();
		$("#project-delete").show();			
	}
	
	function showNewProjectTemplate()
	{	
		$("#media").hide();		
		$("#image-grid").empty();		
		$("#project-save").show();
		$("#project-update").hide();
		$("#project-delete").hide();
		$("#title").val('');
		$("#description").val('');
		$("#content h2").html('New Project');		
	}
	
	function onGlobalNavClick(e)
	{
		$("#main-nav li").attr('class','');	
		e.attr('class','active'); console.log(e.text());
	}	
	
	proxy.getProjects(); showNewProjectTemplate();
	
});