<?php

include './db-connect.php';

$q1 = 'CREATE TABLE `projects` (
        `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
        `title` VARCHAR( 255 ) NOT NULL,
        `desc` TEXT NOT NULL,
        `hidden` TINYINT( 1 ) DEFAULT 0 NOT NULL,
        `pos` TINYINT( 4 ) DEFAULT 0 NOT NULL,
		`stamp` TIMESTAMP(8),
        PRIMARY KEY ( `id` )
       ) ENGINE = InnoDB';

$q2 = 'CREATE TABLE `media` (
        `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
        `desc` TEXT NOT NULL,
        `file` VARCHAR( 50 ) NOT NULL,
        `proj` INT UNSIGNED NOT NULL,
        `pos` TINYINT( 4 ) DEFAULT 0 NOT NULL,        
		`stamp` TIMESTAMP(8),        
        PRIMARY KEY ( `id` )
       ) ENGINE = InnoDB';
       
$q3 = 'CREATE TABLE `press` (
        `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
        `publisher` VARCHAR( 50 ) NOT NULL,
        `desc` TEXT NOT NULL,
        `link` VARCHAR( 255 ) NOT NULL,
        `pos` TINYINT( 4 ) DEFAULT 0 NOT NULL,        
		`stamp` TIMESTAMP(8),        
        PRIMARY KEY ( `id` )
       ) ENGINE = InnoDB';
       
$q4 = 'CREATE TABLE `contact` (
        `name` VARCHAR( 255 ) NOT NULL,
        `email` VARCHAR( 255 ) NOT NULL
       ) ENGINE = InnoDB'; 
       
$q5 = 'CREATE TABLE `home-page` (
        `file` VARCHAR( 50 ) NOT NULL,
        `desc` TEXT NOT NULL
       ) ENGINE = InnoDB';
       
$q6 = "INSERT into `home-page` (`file`, `desc`) VALUES ('', '')";       
$q7 = "INSERT into `contact` (`name`, `email`) VALUES ('Alicia Escott', 'alicia@aliciaescott.com')";

function run_query($q)
{
    $r = mysql_query($q);
    if ($r){
        echo $r;
    }   else{
        echo mysql_error();
    }
}

//run_query("DROP TABLE `projects`");
run_query("DROP TABLE `media`");
run_query($q2);
//run_query("DROP TABLE `press`");

