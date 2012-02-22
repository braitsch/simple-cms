<?php

session_start();
require_once('../../shared/db-connect.php');

switch ($_REQUEST['type']) {
    case 'LIST-PROJECTS':
        getProjectList();
    break;
    case 'LOAD-PROJECT':
        loadProject();
    break;    
    case 'SAVE-PROJECT':
        saveNewProject();
    break;
    case 'EDIT-PROJECT':
        editProject();
    break;
    case 'DELETE-PROJECT':
        deleteProject();
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
    $r = mysql_query("SELECT * FROM projects");
    while ($row = mysql_fetch_assoc($r)){
    	if ($title==$row['title']){ echo json_encode($row); exit; }
    }
    echo 'error::project not found';
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
    $r = mysql_query("DELETE FROM projects WHERE id='$id'");
    if ($r) {
        getProjectList();
    }   else{
        echo mysql_error();
    }   			
}

?>