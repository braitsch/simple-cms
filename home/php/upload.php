<?php

require_once('./globals.php');

// image file that was uploaded
$src_img = $_FILES['file']['tmp_name'];
$img_name = $_FILES['file']['name'];
 
function moveImage($img, $dest)
{
    move_uploaded_file($img, $dest);
}

function copyImage($img)
{
	list($src_width, $src_height) = getimagesize($img);	
	$dup = imagecreatefromjpeg($img);
	$new = imagecreatetruecolor($src_width, $src_height);		
	imagecopy($new, $dup, 0, 0, 0, 0, $src_width, $src_height);
	imagedestroy($dup);
	return $new;
}

function resizeImage($img, $width, $height)
{
	list($src_width, $src_height) = getimagesize($img);
// calc the smaller of the two aspect ratios //
	if ($width/$src_width > $height/$src_height){
	    $r = $height/$src_height;
	}   else{
	 	$r = $width/$src_width;
	}
	$width = $src_width * $r;
	$height = $src_height * $r;	
	$dup = imagecreatefromjpeg($img);	
	$new = imagecreatetruecolor($width, $height);
	imagecopyresampled($new, $dup, 0, 0, 0, 0, $width, $height, $src_width, $src_height);
	imagedestroy($dup);
	return $new;
}

$src = copyImage($src_img);
imagejpeg($src, '../' . IMG_SRC_DIR . "/$img_name", 100);
imagedestroy($src);

$tmb = resizeImage($src_img, 160, 120);
imagejpeg($tmb, '../' . IMG_TMB_DIR . "/$img_name", 100);
imagedestroy($tmb);

$a = array('file' => IMG_TMB_DIR.'/'.$img_name, 'name' => $img_name);
echo json_encode($a);

// this simply moves the uploaded file into a directory on the server
// moveImage($src_img, "$src_dir/$img_name");
