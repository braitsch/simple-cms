<?php

include './db-connect.php';

$tbl1 = 'CREATE TABLE `projects` (
        `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
        `title` VARCHAR( 255 ) NOT NULL,
        `desc` TEXT NOT NULL,                
        `hidden` TINYINT( 1 ) DEFAULT 0 NOT NULL,
		`stamp` TIMESTAMP(8),        		
        PRIMARY KEY ( `id` )
       ) ENGINE = InnoDB';

$tbl2 = 'CREATE TABLE `media` (
        `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
        `title` VARCHAR( 50 ) NOT NULL,
        `desc` TEXT NOT NULL,
        `file` VARCHAR( 50 ) NOT NULL,
        `proj` INT UNSIGNED NOT NULL,
		`stamp` TIMESTAMP(8),        
        PRIMARY KEY ( `id` )
       ) ENGINE = InnoDB';


$r = mysql_query("DROP TABLE `projects`");
$r = mysql_query("DROP TABLE `media`");

$r = mysql_query($tbl1);
if ($r){
    echo $r;
}   else{
    echo mysql_error();
}
$r = mysql_query($tbl2);
if ($r){
    echo $r;
}   else{
    echo mysql_error();
}

?> 