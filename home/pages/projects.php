<div id='projects' class='page-wrapper'>
    <div id="project-list">
        <button class="btn btn-success" id='project-new'><i class="icon-pencil icon-white"></i>New Project</button>  
        <form class="form-stacked" id='project-label'><label>My Projects</label></form>                    
        <ul id="sortable"></ul>
    </div>
    <div id='content'>
        <h2>New Project</h2>      
        <div id='details' >
            <form action="" class="form-stacked">
                <fieldset>
                <div class="clearfix">
                    <label for="title">Title</label>
                    <div class="input">
                        <input id="title" name="title" class="span5" type="text" />
                    </div>
                </div><!-- /clearfix -->
                <div class="clearfix">
                    <label for="textarea">Description</label>
                    <div class="input">
                        <textarea id='description' name='description' class="span5" rows="16"></textarea>
                    </div>
                    <div class="form-btns">
                        <button class="btn btn-primary" id='project-save'><i class="icon-ok icon-white"></i>Save Project</button>
                        <button class="btn btn-danger" id='project-delete'><i class="icon-remove-circle icon-white"></i>Delete</button>
                        <button class="btn btn-primary" id='project-edit'><i class="icon-ok-circle icon-white"></i>Update</button>
                    </div>
                </div><!-- /clearfix -->
                </fieldset>
            </form>
        </div> <!-- end title & description -->

        <div id='media'>
            <form class="form-stacked" id='media-label'><label>Images & Videos</label></form>     
            <ul id="image-grid"></ul>  
            <div id='media-btns'>      
                <hr>                            
                <div class="form-btns"> 
                    <button id='add-image' class="btn btn-primary"><a href="#add-img" class="dom-window"><i class="icon-plus icon-white"></i>Add Image</a></button>
                    <button id='add-video' class="btn btn-primary"><a href="#add-vid" class="dom-window"><i class="icon-plus icon-white"></i>Add Video</a></button>
                </div>
            </div>
        </div> <!-- end media -->
    </div> <!-- end content -->   
</div>  <!-- end projects -->