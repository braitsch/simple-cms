<?php
session_start();
session_destroy();   // destroy session data in storage
session_unset();     // unset $_SESSION variable for the runtime
?>

<!DOCTYPE HTML>
<html>
	<head>
		<meta charset="utf-8">
		<title>Hello, Please Login</title>
		<meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
		<link rel="shortcut icon" href="/favicon.ico">		
		<link rel="stylesheet" href="./logout.css">
	</head>	
    <body>
        <div id="outer">
            <div id="inner">
                <h1>You have successfully logged out<h1>
				<button type="button" id='login'>click here to log back in</button>
            </div>
        </div>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" type="text/javascript"></script>
    <script type="text/javascript" src="./logout.js" ></script>
    </body>  
</html>