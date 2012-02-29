<div id='projects' class='page-wrapper'>
    <div id="project-list" class='page-list'>        
        <button id='project-new' class="btn btn-success"><i class="icon-pencil icon-white"></i>New Project</button>
        <div class='page-list-group'>
            <label>My Projects</label><ul></ul>
        </div>    
    </div>    
    <div id='project-content' class='page-content'>
        <h2>New Project</h2>      
        <div class='details'>
            <label for="project-title">Title</label>
            <input id="project-title" name="project-title" class="span5" type="text" />
            <label for="textarea">Description</label>
            <textarea id='project-description' name='project-description' class="span5" rows="16"></textarea>
            <div class="btn-collection">
                <button class="btn btn-primary" id='project-save'><i class="icon-ok icon-white"></i>Save Project</button>
                <button class="btn btn-danger" id='project-delete'><i class="icon-remove-circle icon-white"></i>Delete</button>
                <button class="btn btn-primary" id='project-edit'><i class="icon-ok-circle icon-white"></i>Update</button>
            </div>
        </div> <!-- end details -->

        <div id='project-media' class='media'>
            <label>Images & Videos</label>
            <ul id="project-media-grid" class='media-grid'></ul>  
            <div id='project-media-btns' class='media-btns'><hr>                            
                <div class="btn-collection"> 
                    <button id='add-image' class="btn btn-primary"><a href="#add-img" class="dom-window"><i class="icon-plus icon-white"></i>Add Image</a></button>
                    <button id='add-video' class="btn btn-primary"><a href="#add-vid" class="dom-window"><i class="icon-plus icon-white"></i>Add Video</a></button>
                </div>
            </div>
        </div> <!-- end media -->
    </div> <!-- end content -->   
</div>  <!-- end projects -->