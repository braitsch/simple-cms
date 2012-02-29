$(document).ready(function() {
	
	$("#press-new").click(function() { showNewPressTemplate(); });
	$("#press-save").click(function() { addPressItem(); });	
	$("#press-edit").click(function() { editPressItem(); });
	$("#press-delete").click(function() { deletePressItem(); });
	
	
	function addPressItem()
	{
		console.log('addPressItem');
		return false;
	}
	
	function editPressItem()
	{
		console.log('editPressItem');
		return false;		
	}
	
	function deletePressItem()
	{
		console.log('deletePressItem');
		return false;		
	}	
	
// view states //
	function showPressItemDetails()
	{
		$("#press-save").hide();
		$("#press-edit").show();
		$("#press-delete").show();			
	}
	
	function showNewPressTemplate()
	{	
		$("#press-save").show();
		$("#press-edit").hide();
		$("#press-delete").hide();
		$("#press-title").val('');
		$("#press-description").val('');
		$("#press-content h2").html('New Press Item');
	}			
	
	showNewPressTemplate();
	
});