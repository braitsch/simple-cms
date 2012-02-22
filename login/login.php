<?php

session_start();
require_once('../shared/db-connect.php');

$user = $_REQUEST['user'];
$pass = $_REQUEST['pass'];

$query = "SELECT * FROM users";
$result = mysql_query($query);

$loggedIn = 'failure';
while ($row = mysql_fetch_assoc($result)){
	if ($user==$row['user'] && $pass==$row['pass']){
    	$_SESSION['user'] = $user; $loggedIn = 'success'; break;
 	}
}
echo $loggedIn; 

?>