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
                        <li><a href="#projects">Projects</a></li>
                        <li><a href="#press">Press</a></li>
                        <li><a href="#contact">Contact</a></li>            
                    </ul>
                    <button class="btn btn-primary" id='btn-logout'><i class="icon-lock icon-white"></i>Logout</button>                      
                </div>
            </div>
        </div>