<?php
include_once('init.php');
?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
	<meta name="robots" content="noindex">

	<title>GURPS 4E Character Sheet | James Turner</title>

	<!-- Stylesheets -->
	<link rel="stylesheet" href="css/charsheet.css">

	<!-- Favicons -->
	<link rel="icon" type="image/png" href="img/favicon-32x32.png" sizes="32x32" />
	<link rel="icon" type="image/png" href="img/favicon-16x16.png" sizes="16x16" />
	<link rel="shortcut icon" type="image/ico" href="img/favicon.ico">

	<script>window.JTOStarshipSheetModel = <?= $model_json; ?>;</script>
	
	<!-- Google Analytics -->
	<!-- <script>
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga');ga('create', 'UA-47769832-1', 'auto');ga('send', 'pageview');
	</script> -->
	
</head>

<body>

	<div id="app" class="app">

		<p>{{ shipName }} (Tier&nbsp;{{ tier.name }})</p>

	</div>		


	<script src="https://unpkg.com/vue"></script>
	<!--
	<script src="vendor/vue/vue.min.js"></script>
	-->
	<script src="js/script.js"></script>


</body>
</html>
