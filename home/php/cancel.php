<?php

require_once('./globals.php');
unlink('../' . IMG_SRC_DIR . '/' . $_REQUEST['file']);
unlink('../' . IMG_TMB_DIR . '/' . $_REQUEST['file']);
echo 'ok';