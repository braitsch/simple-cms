<?php

session_start();
require_once('../../shared/globals.php');
require_once('../../shared/db-connect.php');

switch ($_REQUEST['type']) {
    case 'GET_PROJECT_LIST':
        getProjectList();
    break;
    case 'SORT_PROJECTS':
        setProjectPositions();
    break;    
    case 'GET_PROJECT_DETAILS':
        getProjectDetails();
    break;    
    case 'ADD_PROJECT':
        addProject();
    break;
    case 'EDIT_PROJECT':
        editProject();
    break;
    case 'DELETE_PROJECT':
        deleteProject();
    break;
    case 'GET_PROJECT_IMAGES':
        getProjectImages();
    break;
    case 'SORT_IMAGES':
        setImagePositions();
    break;    
    case 'GET_IMAGE_DETAILS':
        getImageDetails();
    break;
    case 'PUBLISH_IMAGE':
        publishImage();
    break;    
    case 'EDIT_IMAGE':
        editImage();
    break; 
    case 'DELETE_IMAGE':
        deleteImage();
    break;
    case 'CANCEL_IMAGE':
        cancelImage();
    break;                     
}

function getProjectList()
{
    $r = mysql_query("SELECT * FROM `projects` ORDER BY `pos`");
	while($row = mysql_fetch_array($r)) echo $row['title'].',';
}

function setProjectPositions()
{
    $arr = $_REQUEST['data'];
    foreach ($arr as &$obj) {
        $p = $obj['pos']; $t = $obj['title'];
        $r = mysql_query("UPDATE `projects` SET `pos`='$p' WHERE title='$t'");
        if (!$r) echo mysql_error();
    }
}

function getProjectDetails()
{
    $title = $_REQUEST['title'];
    $r = mysql_query("SELECT * FROM projects WHERE title='$title'");
    if ($r){
        echo json_encode(mysql_fetch_array($r));
    }   else{
        echo 'ERROR -- PROJECT NOT FOUND!!';
    }
}

function addProject()
{
    $title = $_REQUEST['title']; $desc = $_REQUEST['desc'];    
    $r = mysql_query("INSERT INTO projects (`title`, `desc`) VALUES ('$title', '$desc')");
    if ($r) {
        getProjectList();
    }   else{
        echo mysql_error();
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

function getProjectImages()
{
    $proj = $_REQUEST['proj']; $imgs = array();
    $r = mysql_query("SELECT file FROM media WHERE proj='$proj' ORDER BY `pos`");
    if (mysql_num_rows($r)){             
        while($img = mysql_fetch_array($r)) array_push($imgs, $img);
    }
    echo json_encode($imgs);
}

function setImagePositions()
{
    $proj = $_REQUEST['proj']; $arr = $_REQUEST['data'];  
    foreach ($arr as &$obj) {
        $p = $obj['id']; $f = $obj['file'];
        $r = mysql_query("UPDATE `media` SET `pos`='$p' WHERE file='$f' AND proj='$proj'");
        if (!$r) echo mysql_error();
    }
}

function getImageDetails()
{
    $proj = $_REQUEST['proj']; $file = $_REQUEST['file'];
    $r = mysql_query("SELECT * FROM media WHERE file='$file' AND proj='$proj'");
    if ($r) {
        $o = mysql_fetch_array($r);
        $o['file'] = IMG_TMB_DIR . '/' . $o['file'];
        echo json_encode($o); 
    }   else{
        echo mysql_error();
    }     
}

function publishImage()
{
   $proj = $_REQUEST['proj']; $file = $_REQUEST['file'];
// check if the image already exists in the target project //    
    if (mysql_num_rows(mysql_query("SELECT 1 FROM media WHERE file='$file' AND proj='$proj'")) == 0){
        addImage();
    }   else{
        editImage();
    }
}

function addImage()
{
    $proj = $_REQUEST['proj']; $file = $_REQUEST['file']; $desc = $_REQUEST['desc'];
    $r = mysql_query("INSERT INTO media (`file`, `desc`, `proj`) VALUES ('$file', '$desc', '$proj')");
    if ($r) {
        echo 'ok';
    }   else{
        echo mysql_error();
    }      
}

function editImage()
{
    $proj = $_REQUEST['proj']; $file = $_REQUEST['file']; $desc = $_REQUEST['desc'];
    $r = mysql_query("UPDATE `media` SET `desc`='$desc' WHERE file='$file' AND proj='$proj'");      
    if ($r) {
        echo 'ok';
    }   else{
        echo mysql_error();
    }      
}

function deleteImage()
{
    $proj = $_REQUEST['proj']; $file = $_REQUEST['file'];
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
    $file = $_REQUEST['file'];
    $r = mysql_query("SELECT * FROM media WHERE file='$file'");
    if (mysql_num_rows($r) == 0) deleteFile($file);
}

function deleteFile($f)
{
    echo 'deleting file ' . $f;
    unlink('../' . IMG_SRC_DIR . '/' . $f);
    unlink('../' . IMG_TMB_DIR . '/' . $f);
}


