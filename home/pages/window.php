<div id="add-img" style="display:none;"> 
    <div id="header">
        <h2>Simple Image Uploader</h2>
        <form id="my-form" enctype="multipart/form-data">
        <!-- The browse-img span is used to style the file input field as a button -->    
            <span class="btn btn-primary browse-img">
                <span><i class="icon-plus icon-white"></i>Select Image</span>
                <input type="file" name="file" />
            </span>
        </form>
    </div>
    <div id='loader' style='display:none;'></div>            
    <div id='preview' style='display:none;'>
        <div class='details'>
            <label id='img-name'>File Name</label><div class='img'><img style='display:block; margin:auto'src='' /></div>
        </div>
        <div class='description'>
            <label for="textarea">Add An Optional Description</label>
            <div class="input"><textarea id='img-desc'></textarea></div> 
        </div>
    </div>
    <div id='controls'>
        <button id='btn-delete' class="btn btn-danger"><i class="icon-trash icon-white"></i>Delete</button>
        <button id='btn-update' class="btn btn-success"><i class="icon-ok icon-white"></i>Update</button>                
        <button id='btn-cancel' class="btn btn-warning"><i class="icon-ban-circle icon-white"></i>Cancel</button>
        <button id='btn-publish' class="btn btn-success"><i class="icon-upload icon-white"></i>Publish</button>
    </div>
</div>           
<div id="add-vid" style="display:none;"> 
    <p>add a video!</p> 
</div>