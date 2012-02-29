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
    <div id='img-preview' style='display:none;'>
        <div id='img-details'>
            <label id='img-name'>File Name</label>
            <div id='img-container'><img style='display:block; margin:auto' src='' /></div>
        </div>
        <div id='img-description'>
            <label for="textarea">Add An Optional Description</label>
            <textarea></textarea>
        </div>
    </div>
    <div id='controls'>
        <button id='img-delete' class="btn btn-danger"><i class="icon-trash icon-white"></i>Delete</button>
        <button id='img-update' class="btn btn-success"><i class="icon-ok icon-white"></i>Update</button>                
        <button id='img-cancel' class="btn btn-warning"><i class="icon-ban-circle icon-white"></i>Cancel</button>
        <button id='img-publish' class="btn btn-success"><i class="icon-upload icon-white"></i>Publish</button>
    </div>
</div>           
<div id="add-vid" style="display:none;"> 
    <p>add a video!</p> 
</div>