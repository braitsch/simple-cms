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

// html pages //
include ('./pages/header.php'); 
include ('./pages/home.php'); 
include ('./pages/projects.php'); 
include ('./pages/press.php'); 
include ('./pages/contact.php'); 
include ('./pages/window.php');
include ('./pages/footer.php');