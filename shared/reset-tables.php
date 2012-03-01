<?php

include './db-connect.php';

$tbl1 = 'CREATE TABLE `projects` (
        `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
        `title` VARCHAR( 255 ) NOT NULL,
        `desc` TEXT NOT NULL,
        `hidden` TINYINT( 1 ) DEFAULT 0 NOT NULL,
        `pos` TINYINT( 4 ) DEFAULT 0 NOT NULL,
		`stamp` TIMESTAMP(8),
        PRIMARY KEY ( `id` )
       ) ENGINE = InnoDB';

$tbl2 = 'CREATE TABLE `media` (
        `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
        `title` VARCHAR( 50 ) NOT NULL,
        `desc` TEXT NOT NULL,
        `file` VARCHAR( 50 ) NOT NULL,
        `proj` INT UNSIGNED NOT NULL,
        `pos` TINYINT( 4 ) DEFAULT 0 NOT NULL,        
		`stamp` TIMESTAMP(8),        
        PRIMARY KEY ( `id` )
       ) ENGINE = InnoDB';
       
$tbl3 = 'CREATE TABLE `press` (
        `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
        `publisher` VARCHAR( 50 ) NOT NULL,
        `desc` TEXT NOT NULL,
        `link` VARCHAR( 50 ) NOT NULL,
        `pos` TINYINT( 4 ) DEFAULT 0 NOT NULL,        
		`stamp` TIMESTAMP(8),        
        PRIMARY KEY ( `id` )
       ) ENGINE = InnoDB';

function run_query($q)
{
    $r = mysql_query($q);
    if ($r){
        echo $r;
    }   else{
        echo mysql_error();
    }
}

run_query("DROP TABLE `projects`");
run_query("DROP TABLE `media`");
run_query("DROP TABLE `press`");
run_query($tbl1); run_query($tbl2); run_query($tbl3);