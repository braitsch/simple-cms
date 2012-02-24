<?php

session_start();
require_once('./globals.php');
require_once('../../shared/db-connect.php');

switch ($_REQUEST['type']) {
    case 'LIST_PROJECTS':
        getProjectList();
    break;
    case 'LOAD_PROJECT':
        loadProject();
    break;    
    case 'SAVE_PROJECT':
        saveNewProject();
    break;
    case 'EDIT_PROJECT':
        editProject();
    break;
    case 'DELETE_PROJECT':
        deleteProject();
    break;
    case 'PUBLISH_IMAGE':
        publishImage();
    break;
    case 'EDIT_IMAGE':
        editImage();
    break; 
    case 'CANCEL_IMAGE':
        cancelImage();
    break;    
    case 'DELETE_IMAGE':
        deleteImage();
    break;                    
}

function getProjectList()
{
    $r = mysql_query("SELECT * FROM `projects`");
	while($row = mysql_fetch_array($r)) echo $row['title'].',';
}

function saveNewProject()
{
    $title = $_REQUEST['title']; $desc = $_REQUEST['desc'];    
    $r = mysql_query("INSERT INTO projects (`title`, `desc`) VALUES ('$title', '$desc')");
    if ($r) {
        getProjectList();
    }   else{
        echo mysql_error();
    }  
}

function loadProject()
{
    $title = $_REQUEST['title'];
    $r = mysql_query("SELECT * FROM projects WHERE title='$title'");
    if (mysql_num_rows($r)){
        $o = mysql_fetch_array($r); $proj = $o['id'];
        $r = mysql_query("SELECT `file`, `desc` FROM media WHERE proj='$proj'");
        if (mysql_num_rows($r)){
    // append the thumbs onto the project object //             
            $o['images'] = array();
            while($img = mysql_fetch_array($r)) array_push($o['images'], $img);
        }
        echo json_encode($o);
    }   else{
        echo 'ERROR -- PROJECT NOT FOUND!!';
    }
}

function editProject()
{
    $id = $_REQUEST['id']; $title = $_REQUEST['title']; $desc = $_REQUEST['desc'];        
    $r = mysql_query("UPDATE `projects` SET `title`='$title', `desc`='$desc' WHERE id='$id'");
    if ($r) {
        getProjectList();  
    }   else{
        echo mysql_error();
    }    
}

function deleteProject()
{
    $id = $_REQUEST['id'];
// delete all images associated with this project //    
    $r = mysql_query("SELECT file FROM media WHERE proj='$id'");
    while($o = mysql_fetch_array($r)) deleteFile($o['file']);
// delete references in the database //    
    $r = mysql_query("DELETE FROM media WHERE proj='$id'");
    $r = mysql_query("DELETE FROM projects WHERE id='$id'");
// return the updated list of projects //        
    if ($r) {
        getProjectList();
    }   else{
        echo mysql_error();
    }   			
}

// image functions //

function getImages()
{
    $id = $_REQUEST['id'];    
    $r = mysql_query("SELECT file FROM media WHERE proj='$id'");
	while($row = mysql_fetch_array($r)) echo $row['file'].',';
}

function publishImage()
{
    $file = $_REQUEST['file']; $proj = $_REQUEST['proj'];
// check if the image already exists in the target project //    
    if (mysql_num_rows(mysql_query("SELECT 1 FROM media WHERE file='$file' AND proj='$proj'")) == 0){
        addImage();
    }   else{
        editImage();
    }
}

function addImage()
{
    echo 'adding image';
    $desc = $_REQUEST['desc']; $file = $_REQUEST['file']; $proj = $_REQUEST['proj'];    
    $r = mysql_query("INSERT INTO media (`file`, `desc`, `proj`) VALUES ('$file', '$desc', '$proj')");
    if ($r) {
        echo 'ok';
    }   else{
        echo mysql_error();
    }      
}

function editImage()
{
    echo 'editing image';
    $desc = $_REQUEST['desc'];
    $file = $_REQUEST['file'];
    $proj = $_REQUEST['proj'];
    $r = mysql_query("UPDATE `media` SET `desc`='$desc' WHERE file='$file' AND proj='$proj'");      
    if ($r) {
        echo 'ok';
    }   else{
        echo mysql_error();
    }      
}

function deleteImage()
{
    $r = mysql_query("DELETE FROM media WHERE file='$file' AND proj='$proj'");
    if ($r) {
        echo 'ok';
    }   else{
        echo mysql_error();
    }       
    deleteFile($_REQUEST['file']);
}

function cancelImage()
{
    deleteFile($_REQUEST['file']);
}

function deleteFile($f)
{
    echo 'deleting file ' . $f;
    unlink('../' . IMG_SRC_DIR . '/' . $f);
    unlink('../' . IMG_TMB_DIR . '/' . $f);
}


