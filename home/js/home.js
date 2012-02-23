var pid;
var query = './php/query.php';

$(document).ready(function() {

	$("#media ul").sortable({
	//	stop: function(e, o) { alert(o.position) }
	});
	$("#media ul").disableSelection();	
	$("#project-list ul").sortable();
	$("#project-list ul").disableSelection();
	$('.dom-window').click(function()  { showImageUploader() });	
	$("#btn-logout").click(function()  { window.location.replace("../logout");});
	$("#main-nav li").click(function() { onGlobalNavClick($(this))});	
	$("#new-project").click(function() { onNewProjectSelect(); });

// project editor

	$("#project-save").click(function() {	
		if ($("#title").val() == ''){
			alert('please enter a title for this project');			
		}	else if ($("#description").val() == ''){
			alert('please enter a description for this project');
		}	else{
			$.ajax({
				type: "POST",
				url: query,
				data: {
					type:'SAVE-PROJECT', title:$("#title").val(), desc:$("#description").val()
				},
				success: function(projects) { buildNav(projects); }
			});
		}
		return false;
	});
	$("#project-update").click(function() {
		$.ajax({
			type: "POST",
			url: query,
			data: {
				type:'EDIT-PROJECT', id:pid, title:$("#title").val(), desc:$("#description").val()
			},
			success: function(projects) { buildNav(projects); alert('project updated!'); }
		});
		return false;
	});	
	$("#project-delete").click(function() {
		var k = confirm('Are you sure you want to delete this project?');
		if (k == true){
			console.log('deleting '+pid);
			$.ajax({
				type: "POST",
				url: query,
				data: {
					type:'DELETE-PROJECT', id:pid
				},
				success: function(projects) { 
					buildNav(projects); onNewProjectSelect();
				}
			});
		}
		return false;		
	});	
	
	function getProjects()
	{
		$.ajax({
			type: "POST",
			url: query,
			data: { type:'LIST-PROJECTS' },
			success: function(projects) { buildNav(projects); }
		});
	}	
	function buildNav(projects)
	{
		var a = projects.split(',');
		$("#project-list ul").empty();
		for (var i=0; i < a.length - 1; i++) $("#project-list ul").append("<li class='ui-state-default'><span class='ui-icon ui-icon-arrowthick-2-n-s'></span>"+ a[i] +"</li>");
		$("#project-list li").click(function() {
			loadProject($(this).text());
		});	
	}
	function loadProject(projectName)
	{
		$.ajax({
			type: "POST",
			url: query,
			data: {
				type:'LOAD-PROJECT', title : projectName
			},
			success: function(response) {
				onProjectSelect();
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
			}
		});		
	}
// nav selections	
	function onProjectSelect()
	{
		$("#media").show();
		$("#image-grid").empty();	
		$("#project-save").hide();
		$("#project-update").show();
		$("#project-delete").show();			
	}
	function onNewProjectSelect()
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
		e.attr('class','active');
		console.log(e.text());
	}	
	getProjects(); onNewProjectSelect();
});