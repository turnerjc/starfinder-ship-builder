<?php

if (empty($_POST['json'])) {
	echo "No JSON input received";
	die();
}

$model_json = $_POST['json'];

try {
	$model = json_decode($model_json);
} catch(Exception $e) {
	echo $e->getMessage();
}
