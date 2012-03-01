<div id='press' class='page-wrapper'>
    <div id="press-list" class='page-list'>        
        <button id='press-new' class="btn btn-success"><i class="icon-pencil icon-white"></i>New Press Item</button>
        <div class='page-list-group'>
            <label>My Press Items</label><ul></ul>
        </div>    
    </div>    
    <div id='press-content' class='page-content'>
        <h2>New Press Item</h2>
        <div class='details'>
            <label for="press-publisher">Publisher / Media Outlet<span class='required'>*</span></label>
            <input id="press-publisher" name="press-title" class="span5" type="text" />
            <label for="textarea">Short Description</label>
            <textarea id='press-description' name='press-description' class="span5" rows="6"></textarea>
            <label for="press-link">Link to Press Item<span class='required'>*</span></label>
            <input id="press-link" name="press-link" class="span5" type="text" />            
            <div class="btn-collection">
                <button class="btn btn-primary" id='press-save'><i class="icon-ok icon-white"></i>Save Item</button>
                <button class="btn btn-danger" id='press-delete'><i class="icon-remove-circle icon-white"></i>Delete</button>
                <button class="btn btn-primary" id='press-edit'><i class="icon-ok-circle icon-white"></i>Update</button>
            </div>
        </div> <!-- end details -->
    </div> <!-- end press-content -->
</div>  <!-- end press -->