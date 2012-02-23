<?php session_start(); 

if (!(isset($_SESSION['user']) && $_SESSION['user'] != '')) {
    logout();
// check if last request was more than 30 minutes ago    
}   else if (isset($_SESSION['LAST_ACTIVITY']) && (time() - $_SESSION['LAST_ACTIVITY'] > 1800)) {
    logout();
}

function logout()
{
    session_destroy(); session_unset(); header('location: ../login');      
}

require_once('../shared/db-connect.php');
$_SESSION['LAST_ACTIVITY'] = time(); // update last activity time stamp	
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
	<title>Admin Area</title>
    <meta name="description" content="">
    <meta name="author" content="">
    <link href="../vendor/bootstrap.min.css" rel="stylesheet">    
    <link href="./css/home.css" rel="stylesheet">
    <link href="./css/upload.css" rel="stylesheet">
    <link rel="shortcut icon" href="images/favicon.ico">
    <link rel="apple-touch-icon" href="images/apple-touch-icon.png">
    <link rel="apple-touch-icon" sizes="72x72" href="images/apple-touch-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="114x114" href="images/apple-touch-icon-114x114.png">
  </head>
    <body>
        <div class="navbar navbar-fixed-top">
            <div class="navbar-inner">
                <div class="container-fluid">
                    <a class="brand" href="#">Hey <?php echo(ucfirst($_SESSION['user']));?>, you look great today!</a>
                    <ul id='main-nav' class="nav">
                        <li><a href="#home">Home</a></li>              
                        <li class="active"><a href="#projects">Projects</a></li> 
                        <li><a href="#press">Press</a></li>
                        <li><a href="#contact">Contact</a></li>            
                    </ul>
                    <button class="btn btn-primary" id='btn-logout'><i class="icon-lock icon-white"></i>Logout</button>                      
                </div>
            </div>
        </div>

        <div id='wrapper'>
            <div id="project-list">
                <button class="btn btn-success" id='new-project'><i class="icon-pencil icon-white"></i>New Project</button>  
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
                            <button class="btn btn-primary" id='project-update'><i class="icon-ok-circle icon-white"></i>Update</button>
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
                        <button class="btn btn-primary"><a href="#add-img" class="dom-window"><i class="icon-plus icon-white"></i>Add Image</a></button>
                        <button class="btn btn-primary"><a href="#add-vid" class="dom-window"><i class="icon-plus icon-white"></i>Add Video</a></button>
                    </div>
                </div>
            </div> <!-- end media -->
            </div>
        </div>  <!-- end container -->
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
            <div id='controls' style='display:none;'>
                <button id='btn-cancel' class="btn btn-warning"><i class="icon-ban-circle icon-white"></i>Cancel</button>
                <button id='btn-publish' class="btn btn-success"><i class="icon-upload icon-white"></i>Publish</button>
            </div>
        </div>           
        <div id="add-vid" style="display:none;"> 
            <p>add a video!</p> 
        </div>        
    <script type="text/javascript" src="../vendor/jquery-1.7.1.min.js"></script>
    <script type="text/javascript" src="../vendor/jquery.DOMWindow.js"></script>    
    <script type="text/javascript" src="../vendor/jquery-ui-1.8.17.custom.min.js"></script>   
    <script type="text/javascript" src="../vendor/jquery.form.js"></script>
    <script type="text/javascript" src="./js/home.js"></script>
    <script type="text/javascript" src="./js/upload.js"></script>    
    </body>
</html>
