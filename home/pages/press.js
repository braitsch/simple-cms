var press_items, press_id;

$(document).ready(function() {
	
	$("#press-list ul").disableSelection();	
	$("#press-list ul").sortable({stop: function(e, o) { onPressListSort() }});	
	$("#press-new").click(function() { showNewPressTemplate(); });
	$("#press-save").click(function() { addPressItem(); });	
	$("#press-edit").click(function() { editPressItem(); });
	$("#press-delete").click(function() { deletePressItem(); });

	proxy.addListener('PRESS_ITEMS_LOADED', onPressItemList);
	proxy.addListener('PRESS_ITEM_SELECTED', onPressItemLoaded);
	proxy.addListener('PRESS_ITEM_DELETED', onPressItemDeleted);	
	
// proxy callbacks //

	function onPressItemList(items)
	{
		var a = $.parseJSON( items );
		$("#press-list ul").empty();
		for (var i=0; i < a.length; i++) $("#press-list ul").append("<li id='press-item-"+a[i]['id']+"' class='ui-state-default'>"+ a[i]['publisher'] +"</li>");
		$("#press-list li").click(function() { 
			var n = $(this).attr('id'); press_id = n.substr(n.lastIndexOf('-') + 1); proxy.getPressItemDetails(press_id); 
		});
	}
	
	function onPressItemLoaded(item)
	{
		var o = $.parseJSON( item );
		$("#press-publisher").val(o['publisher']);
		$("#press-description").val(o['desc']);
		$("#press-link").val(o['link']);
		showPressItemDetails();	
	}
	
	function onPressItemDeleted(items)
	{
		showNewPressTemplate(); onPressItemList(items);		
	}
	
// button events //	
	
	function addPressItem()
	{
		var p = $("#press-publisher").val();
		var d = $("#press-description").val();
		var l = $("#press-link").val();		
		if (p == ''){
			alert('please enter the publisher of this press item');			
		}	else if (l == ''){
			alert('please enter the link to this press item');
		}	else{
			proxy.addPressItem(p, d, l);
		}
	}
	
	function editPressItem()
	{
		var p = $("#press-publisher").val();
		var d = $("#press-description").val();
		var l = $("#press-link").val();		
		proxy.editPressItem(press_id, p, d, l);
	}
	
	function deletePressItem()
	{
		var k = confirm('Are you sure you want to delete this press item?');
		if (k == true) proxy.deletePressItem(press_id);
	}	
	
// list sorting //

	function onPressListSort()
	{
		var a = [];
		$("#press-list ul li").each(function(i, o){ 
			var n = $(this).attr('id'); n = n.substr(n.lastIndexOf('-') + 1);
			a.push({id:n, pos:i+1}); 
		})
		proxy.setPressListPositions(a);		
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
		$("#press-publisher").val('');
		$("#press-description").val('');
		$("#press-link").val('');		
		$("#press-content h2").html('New Press Item');
	}			
	
	proxy.getPressList(); showNewPressTemplate();
	
});