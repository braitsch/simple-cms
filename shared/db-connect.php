<?php

define('DB_NAME', 'db15559_cms');
define('DB_USER', 'db15559_stephen');
define('DB_PASS', 'E357900C4BC320CDC3AA8D38549C7D5ADC6B4998');
define('DB_HOST', 'internal-db.s15559.gridserver.com');
define('DB_CHARSET', 'utf8');
define('DB_COLLATE', '');

$con = mysql_connect(DB_HOST, DB_USER, DB_PASS) or die('Database Connection Error : ' . mysql_error());
mysql_select_db(DB_NAME, $con);

?>