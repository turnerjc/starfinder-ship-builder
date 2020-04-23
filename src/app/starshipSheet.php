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

	<title>Starfinder RPG Starship Sheet | James Turner</title>

	<!-- Stylesheets -->
	<link rel="stylesheet" href="css/starship-sheet.css">

	<!-- Google Fonts -->
	<link href="https://fonts.googleapis.com/css?family=Saira:400,400italic,700" rel="stylesheet">

	<!-- Favicons -->
	<!-- <link rel="icon" type="image/png" href="img/favicon-32x32.png" sizes="32x32" />
	<link rel="icon" type="image/png" href="img/favicon-16x16.png" sizes="16x16" />
	<link rel="shortcut icon" type="image/ico" href="img/favicon.ico"> -->

	<script>window.JTOStarshipSheetModel = <?= $model_json; ?>;</script>
		
</head>

<body>

	<div id="app" class="app">


		<!--
		| - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
		| HEADER
		| - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
		-->
		<div class="header">

		</div>





		<!--
		| - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
		| DETAILS
		| - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
		-->
		<div class="details">
			<div class="row">
				<div class="col-3-of-4 field">
					<div class="field-label">Starship Name</div>
					<div class="field-data">{{ shipName }}</div>
				</div>

				<div class="col-1-of-4 field">
					<div class="field-label">Tier</div>
					<div class="field-data">{{ tier.name }}</div>
				</div>
			</div>

			<!-- Make and model -->

			<div class="row">
				<div class="col-1-of-2 field">
					<div class="field-label">Size</div>
					<div class="field-data">{{ frame.size }}</div>
				</div>

				<div class="col-1-of-2 field">
					<div class="field-label">Frame</div>
					<div class="field-data">{{ frame.name }}</div>
				</div>
			</div>

			<div class="field">
				<div class="field-label">Speed</div>
				<div class="field-data">{{ thrusters.speed }}</div>
			</div>

			<div class="field">
				<div class="field-label">Maneuverability</div>
				<div class="field-data">{{ frame.maneuverability }} (turn {{ turn }})</div>
			</div>

			<div class="field">
				<div class="field-label">Drift Rating</div>
				<div class="field-data">{{ driftEngine.engineRating }}</div>
			</div>
		</div>





		<!--
		| - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
		| SHIELDS
		| - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
		-->

		<div class="shields">

			<!--
			<p><strong>Shields</strong> {{ shields.name }}</p>
			-->

			<div class="shields-stats">
				<div class="shields-stat shields-stat--forward">{{ params.shieldsByPosition.forward }}</div>
				<div class="shields-stat shields-stat--starboard">{{ params.shieldsByPosition.starboard }}</div>
				<div class="shields-stat shields-stat--aft">{{ params.shieldsByPosition.aft }}</div>
				<div class="shields-stat shields-stat--port">{{ params.shieldsByPosition.port }}</div>
			</div>
			
			<svg class="shields-img"
				xmlns:sodipodi0="http://sodipodi.sourceforge.net/DTD/sodipodi0.dtd"
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				width="489.117"
				height="489.117"
				viewBox="0 0 129.412 129.412">
				<defs><clipPath clipPathUnits="userSpaceOnUse" id="a"><circle cx="100.114" cy="94.8" r="42.629" fill="#ff0" stroke-width=".265"/></clipPath><clipPath clipPathUnits="userSpaceOnUse" id="d"><path d="M100.114 37.83a56.048 56.048 0 00-56.048 56.047 56.048 56.048 0 0056.048 56.048 56.048 56.048 0 0056.048-56.048 56.048 56.048 0 00-56.048-56.047zm0 6.047a50 50 0 0150 50 50 50 0 01-50 50 50 50 0 01-50-50 50 50 0 0150-50z" fill="#0f0" stroke-width=".349"/></clipPath></defs><g clip-path="url(#a)" transform="translate(-35.298 -30.088)"><path d="M63.465 119.821l-3.592-6.223 3.592-6.222h7.185l3.593 6.222-3.593 6.223zM63.465 107.376l-3.592-6.223 3.592-6.223h7.185l3.593 6.223-3.593 6.223zM63.465 94.93l-3.592-6.223 3.592-6.223h7.185l3.593 6.223-3.593 6.223zM63.465 82.484l-3.592-6.223 3.592-6.223h7.185l3.593 6.223-3.593 6.223z" sodipodi0:nodetypes="ccccccc" fill="none" stroke="#c1e5df" stroke-width=".24"/><path d="M74.243 126.044l-3.592-6.223 3.592-6.223h7.185l3.593 6.223-3.593 6.223zM74.243 113.598l-3.592-6.222 3.592-6.223h7.185l3.593 6.223-3.593 6.222zM74.243 101.153l-3.592-6.223 3.592-6.223h7.185l3.593 6.223-3.593 6.223zM74.243 88.707l-3.592-6.223 3.592-6.223h7.185l3.593 6.223-3.593 6.223z" sodipodi0:nodetypes="ccccccc" fill="none" stroke="#c1e5df" stroke-width=".24"/><path d="M74.243 76.261l-3.592-6.223 3.592-6.222h7.185l3.593 6.223-3.593 6.223zM85.021 132.267l-3.592-6.223 3.592-6.223h7.185l3.593 6.223-3.593 6.223zM85.021 119.821l-3.592-6.223 3.592-6.222h7.185l3.593 6.222-3.593 6.223zM85.021 107.376l-3.592-6.223 3.592-6.223h7.185l3.593 6.223-3.593 6.223zM85.021 94.93l-3.592-6.223 3.592-6.223h7.185l3.593 6.223-3.593 6.223z" sodipodi0:nodetypes="ccccccc" fill="none" stroke="#c1e5df" stroke-width=".24"/><path d="M85.021 82.484l-3.592-6.223 3.592-6.223h7.185l3.593 6.223-3.593 6.223z" sodipodi0:nodetypes="ccccccc" fill="none" stroke="#c1e5df" stroke-width=".24"/><path d="M85.021 70.038l-3.592-6.222 3.592-6.223h7.185l3.593 6.223-3.593 6.223zM95.8 138.489l-3.594-6.222 3.593-6.223h7.186l3.592 6.223-3.592 6.223zM95.8 126.044l-3.594-6.223 3.593-6.223h7.186l3.592 6.223-3.592 6.223zM95.8 113.598l-3.594-6.222 3.593-6.223h7.186l3.592 6.223-3.592 6.222zM95.8 101.153l-3.594-6.223 3.593-6.223h7.186l3.592 6.223-3.592 6.223zM95.8 88.707l-3.594-6.223 3.593-6.223h7.186l3.592 6.223-3.592 6.223z" sodipodi0:nodetypes="ccccccc" fill="none" stroke="#c1e5df" stroke-width=".24"/><path d="M95.8 76.261l-3.594-6.223 3.593-6.222h7.186l3.592 6.223-3.592 6.223z" sodipodi0:nodetypes="ccccccc" fill="none" stroke="#c1e5df" stroke-width=".24"/><path d="M95.8 63.816l-3.594-6.223 3.593-6.222h7.186l3.592 6.222-3.592 6.223zM106.578 132.267l-3.593-6.223 3.593-6.223h7.185l3.592 6.223-3.592 6.223zM106.578 119.821l-3.593-6.223 3.593-6.222h7.185l3.592 6.222-3.592 6.223zM106.578 107.376l-3.593-6.223 3.593-6.223h7.185l3.592 6.223-3.592 6.223zM106.578 94.93l-3.593-6.223 3.593-6.223h7.185l3.592 6.223-3.592 6.223zM106.578 82.484l-3.593-6.223 3.593-6.223h7.185l3.592 6.223-3.592 6.223z" sodipodi0:nodetypes="ccccccc" fill="none" stroke="#c1e5df" stroke-width=".24"/><path d="M106.578 70.038l-3.593-6.222 3.593-6.223h7.185l3.592 6.223-3.592 6.223zM117.356 126.044l-3.593-6.223 3.593-6.223h7.185l3.593 6.223-3.593 6.223zM117.356 113.598l-3.593-6.222 3.593-6.223h7.185l3.593 6.223-3.593 6.222zM117.356 101.153l-3.593-6.223 3.593-6.223h7.185l3.593 6.223-3.593 6.223zM117.356 88.707l-3.593-6.223 3.593-6.223h7.185l3.593 6.223-3.593 6.223z" sodipodi0:nodetypes="ccccccc" fill="none" stroke="#c1e5df" stroke-width=".24"/><path d="M117.356 76.261l-3.593-6.223 3.593-6.222h7.185l3.593 6.223-3.593 6.223zM128.134 119.821l-3.593-6.223 3.593-6.222h7.185l3.593 6.222-3.593 6.223zM128.134 107.376l-3.593-6.223 3.593-6.223h7.185l3.593 6.223-3.593 6.223zM128.134 94.93l-3.593-6.223 3.593-6.223h7.185l3.593 6.223-3.593 6.223z" sodipodi0:nodetypes="ccccccc" fill="none" stroke="#c1e5df" stroke-width=".24"/><path d="M128.134 82.484l-3.593-6.223 3.593-6.223h7.185l3.593 6.223-3.593 6.223z" sodipodi0:nodetypes="ccccccc" fill="none" stroke="#c1e5df" stroke-width=".24"/><path d="M85.47 81.763l-3.18-5.507 3.18-5.507h6.358l3.18 5.507-3.18 5.507zM107.024 81.763l-3.18-5.507 3.18-5.507h6.358l3.18 5.507-3.18 5.507zM74.698 63.242l-3.18-5.507 3.18-5.507h6.358l3.18 5.507-3.18 5.507zM117.655 63.242l-3.18-5.507 3.18-5.507h6.358l3.18 5.507-3.18 5.507zM85.47 119.183l-3.18-5.507 3.18-5.507h6.358l3.18 5.507-3.18 5.507zM106.977 119.088l-3.18-5.507 3.18-5.506h6.358l3.18 5.506-3.18 5.507zM74.698 137.855l-3.18-5.507 3.18-5.507h6.358l3.18 5.507-3.18 5.507zM117.76 137.855l-3.179-5.507 3.18-5.507h6.358l3.18 5.507-3.18 5.507z" sodipodi0:nodetypes="ccccccc" fill="#8ed8f8"/></g><g transform="translate(-35.298 -30.088)" fill="#00aeef"><path d="M98.238 93.962l.01-1.432c.138-.73.38-1.372.96-1.727l.059-1.404.15.009.017 9.643c-.27-.012-1.468.35-1.546 1.359-.009.108-.218.004-.234.097l-.001-1.465.629-.528.006-2.045-1.745-1.454-1.85.599 1.975-2.487z" id="b" opacity="1" fill-opacity="1" stroke="none" stroke-width=".265" stroke-miterlimit="4" stroke-dasharray="none" stroke-opacity="1"/><use xlink:href="#b" transform="matrix(-1 0 0 1 198.771 0)" width="100%" height="100%"/></g><path d="M64.816 19.437A45.275 45.275 0 0019.54 64.712a45.275 45.275 0 0045.276 45.276 45.275 45.275 0 0045.275-45.276 45.275 45.275 0 00-45.275-45.275zm0 .935a44.34 44.34 0 0144.34 44.34 44.34 44.34 0 01-44.34 44.34 44.34 44.34 0 01-44.34-44.34 44.34 44.34 0 0144.34-44.34z" fill="#254190"/><path d="M64.816 16.965c-26.37 0-47.748 21.377-47.748 47.747.017 6.846 1.873 14.109 4.732 20.328l.722-.5a46.761 46.761 0 01-4.467-19.828c0-25.825 20.935-46.76 46.76-46.76 25.826 0 46.762 20.935 46.762 46.76a46.76 46.76 0 01-4.472 19.827l.729.402c2.863-6.22 4.71-13.383 4.73-20.229 0-26.37-21.378-47.747-47.748-47.747z" fill="#254190"/><path d="M64.816 22.083a42.63 42.63 0 00-42.63 42.63 42.63 42.63 0 0042.63 42.629 42.63 42.63 0 0042.63-42.63 42.63 42.63 0 00-42.63-42.63zm0 3.78a38.85 38.85 0 0138.85 38.85 38.85 38.85 0 01-38.85 38.85 38.85 38.85 0 01-38.85-38.85 38.85 38.85 0 0138.85-38.85z" fill="#254190"/><g transform="translate(-35.298 -30.088)"><path d="M102.572 88.84l16.352-29.51" id="c" fill="none" stroke="#254190" stroke-width=".529" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" stroke-dasharray="none" stroke-opacity="1"/><use xlink:href="#c" transform="matrix(1 0 0 -1 0 189.47)" width="100%" height="100%"/><use xlink:href="#c" transform="matrix(-1 0 0 1 198.377 0)" width="100%" height="100%"/><use xlink:href="#c" transform="rotate(-180 99.189 94.735)" width="100%" height="100%"/></g><g transform="translate(-35.298 -30.088)"><path d="M99.373 95.286L67.187 45.6" id="e" clip-path="url(#d)" fill="none" stroke="#254190" stroke-width="1.058" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" stroke-dasharray="none" stroke-opacity="1"/><use xlink:href="#e" width="100%" height="100%" transform="rotate(7 98.92 94.32)"/><use xlink:href="#e" width="100%" height="100%" transform="rotate(10.5 98.92 94.32)"/><use xlink:href="#e" width="100%" height="100%" transform="rotate(14 98.92 94.32)"/><use xlink:href="#e" width="100%" height="100%" transform="rotate(-3.5 98.92 94.32)"/><use xlink:href="#e" width="100%" height="100%" transform="rotate(-7 98.92 94.32)"/><use xlink:href="#e" width="100%" height="100%" transform="rotate(-10.5 98.92 94.32)"/><use xlink:href="#e" width="100%" height="100%" transform="rotate(-14 98.92 94.32)"/><use xlink:href="#e" width="100%" height="100%" transform="rotate(-17.5 98.92 94.32)"/><use xlink:href="#e" width="100%" height="100%" transform="rotate(-21 98.92 94.32)"/><use xlink:href="#e" width="100%" height="100%" transform="rotate(-24.5 98.92 94.32)"/><use xlink:href="#e" width="100%" height="100%" transform="rotate(-28 98.92 94.32)"/><use xlink:href="#e" width="100%" height="100%" transform="rotate(-21 98.92 94.32)"/><use xlink:href="#e" width="100%" height="100%" transform="rotate(-31.5 98.92 94.32)"/><use xlink:href="#e" width="100%" height="100%" transform="rotate(-35 98.92 94.32)"/><use xlink:href="#e" width="100%" height="100%" transform="rotate(-38.5 98.92 94.32)"/><use xlink:href="#e" width="100%" height="100%" transform="rotate(-77 98.92 94.32)"/><use xlink:href="#e" width="100%" height="100%" transform="rotate(-80.5 98.92 94.32)"/><use xlink:href="#e" width="100%" height="100%" transform="rotate(-84 98.92 94.32)"/><use xlink:href="#e" width="100%" height="100%" transform="rotate(-87.5 98.92 94.32)"/><use xlink:href="#e" width="100%" height="100%" transform="rotate(-91 98.92 94.32)"/><use xlink:href="#e" width="100%" height="100%" transform="rotate(-94.5 98.92 94.32)"/><use xlink:href="#e" width="100%" height="100%" transform="rotate(-98 98.92 94.32)"/><use xlink:href="#e" width="100%" height="100%" transform="rotate(-112 98.92 94.32)"/><use xlink:href="#e" width="100%" height="100%" transform="rotate(-115.5 98.92 94.32)"/><use xlink:href="#e" width="100%" height="100%" transform="rotate(-119 98.92 94.32)"/><use xlink:href="#e" width="100%" height="100%" transform="rotate(-122.5 98.92 94.32)"/><use xlink:href="#e" width="100%" height="100%" transform="rotate(-126 98.92 94.32)"/><use xlink:href="#e" width="100%" height="100%" transform="rotate(-129.5 98.92 94.32)"/><use xlink:href="#e" width="100%" height="100%" transform="rotate(-168 98.92 94.32)"/><use xlink:href="#e" width="100%" height="100%" transform="rotate(-171.5 98.92 94.32)"/><use xlink:href="#e" width="100%" height="100%" transform="rotate(-175 98.92 94.32)"/><use xlink:href="#e" width="100%" height="100%" transform="rotate(-178.5 98.92 94.32)"/><use xlink:href="#e" width="100%" height="100%" transform="rotate(178 98.92 94.32)"/><use xlink:href="#e" width="100%" height="100%" transform="rotate(174.5 98.92 94.32)"/><use xlink:href="#e" width="100%" height="100%" transform="rotate(171 98.92 94.32)"/><use xlink:href="#e" width="100%" height="100%" transform="rotate(167.5 98.92 94.32)"/><use xlink:href="#e" width="100%" height="100%" transform="rotate(164 98.92 94.32)"/><use xlink:href="#e" width="100%" height="100%" transform="rotate(160.5 98.92 94.32)"/><use xlink:href="#e" width="100%" height="100%" transform="rotate(157 98.92 94.32)"/><use xlink:href="#e" width="100%" height="100%" transform="rotate(153.5 98.92 94.32)"/><use xlink:href="#e" width="100%" height="100%" transform="rotate(150 98.92 94.32)"/><use xlink:href="#e" width="100%" height="100%" transform="rotate(146.5 98.92 94.32)"/><use xlink:href="#e" width="100%" height="100%" transform="rotate(143 98.92 94.32)"/><use xlink:href="#e" width="100%" height="100%" transform="rotate(3.5 98.92 94.32)"/></g><g transform="translate(-35.298 -30.088)"><g id="f"><path d="M100.122 29.687a68.671 71.712 0 00-18.219 2.649l4.904 19.638a49.174 51.351 0 0113.315-1.927 49.174 51.351 0 0112.598 1.778l5.385-19.616a68.671 71.712 0 00-17.983-2.522z" fill="#254190" stroke-width=".437" transform="translate(0 .4)"/><path transform="matrix(.26458 0 0 .26458 0 .4)" d="M378.383 116.367a241.932 241.932 0 00-64.184 8.938l17.276 66.254a173.241 173.241 0 0146.908-6.502 173.241 173.241 0 0144.385 5.998l18.97-66.178a241.932 241.932 0 00-63.355-8.51z" fill="#8ed8f8" stroke-width="1.506"/></g><use x="0" y="0" xlink:href="#f" id="g" transform="matrix(1 0 0 -1 0 189.587)" width="100%" height="100%"/><use xlink:href="#f" transform="rotate(90 100.004 94.794)" width="100%" height="100%"/><use xlink:href="#g" transform="rotate(90 100.004 94.794)" width="100%" height="100%"/></g><g transform="translate(-35.298 -30.088)"><text style="line-height:1.25;-inkscape-font-specification:monospace" transform="rotate(-101.922 100.11 94.794)" font-weight="400" font-size="2.822" font-family="Saira" letter-spacing="0" word-spacing="0" stroke-width=".265"><textPath xlink:href="#h">FORWARD SHIELDS</textPath></text><text style="line-height:1.25;-inkscape-font-specification:monospace" transform="rotate(-13.512 100.094 94.808)" font-weight="400" font-size="2.822" font-family="Saira" letter-spacing="0" word-spacing="0" stroke-width=".265"><textPath xlink:href="#h"><tspan>STARBOARD SHIELDS</tspan></textPath></text><text style="line-height:1.25;-inkscape-font-specification:monospace" transform="rotate(169.915 100.101 94.743)" font-weight="400" font-size="2.822" font-family="Saira" letter-spacing="0" word-spacing="0" stroke-width=".265"><textPath xlink:href="#h">PORT SHIELDS</textPath></text><circle id="h" cx="100.114" cy="94.8" r="60.269" display="inline" opacity="1" fill="teal" fill-opacity="0" stroke="none" stroke-width=".375" stroke-miterlimit="4" stroke-dasharray="none" stroke-opacity="1"/><circle r="60.269" cy="-94.8" cx="100.114" id="i" transform="scale(1 -1)" display="inline" opacity="1" fill="olive" fill-opacity="0" stroke="none" stroke-width=".375" stroke-miterlimit="4" stroke-dasharray="none" stroke-opacity="1"/><text style="line-height:1.25;-inkscape-font-specification:monospace" transform="rotate(98.3 99.045 96.035)" font-weight="400" font-size="2.822" font-family="Saira" letter-spacing="0" word-spacing="0" stroke-width=".265"><textPath xlink:href="#i"><tspan>AFT SHIELDS</tspan></textPath></text></g>
			</svg>
		</div>





		<!--
		| - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
		| STATS
		| - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
		-->
		<!-- 
		.field>(.field-label+.field-data)
		-->
		<div class="stats">

			<!-- AC -->
			<div class="field field-breakdown">
				<div class="field-label field-label--breakdown--primary">AC</div>

				<div class="field-breakdown-group field-breakdown-group--total">
					<div class="field-label field-label--breakdown--total">Total</div>
					<div class="field-data field-data--breakdown--total">{{ armourClass }}</div>
				</div>

				<div class="field-label field-label--breakdown--base">10</div>

				<div class="field-breakdown-group field-breakdown-group--secondary">
					<div class="field-label field-label--breakdown--secondary">Pilot Ranks</div>
					<div class="field-data field-data--breakdown--secondary">{{ pilotingRanks }}</div>
				</div>

				<div class="field-breakdown-group field-breakdown-group--secondary">
					<div class="field-label field-label--breakdown--secondary">Armor Bonus</div>
					<div class="field-data field-data--breakdown--secondary">{{ armour.bonusToAc }}</div>
				</div>

				<div class="field-breakdown-group field-breakdown-group--secondary">
					<div class="field-label field-label--breakdown--secondary">Size Mod</div>
					<div class="field-data field-data--breakdown--secondary">{{ sizeCategory.acAndTlModifier }}</div>
				</div>

				<div class="field-breakdown-group field-breakdown-group--secondary">
					<div class="field-label field-label--breakdown--secondary">Misc Mod</div>
					<div class="field-data field-data--breakdown--secondary">XXX</div>
				</div>
			</div>

			<!-- TL -->
			<div class="field field-breakdown">
				<div class="field-label field-label--breakdown--primary">TL</div>

				<div class="field-breakdown-group field-breakdown-group--total">
					<div class="field-label field-label--breakdown--total">Total</div>
					<div class="field-data field-data--breakdown--total">{{ targetLock }}</div>
				</div>

				<div class="field-label field-label--breakdown--base">10</div>

				<div class="field-breakdown-group field-breakdown-group--secondary">
					<div class="field-label field-label--breakdown--secondary">Pilot Ranks</div>
					<div class="field-data field-data--breakdown--secondary">{{ pilotingRanks }}</div>
				</div>

				<div class="field-breakdown-group field-breakdown-group--secondary">
					<div class="field-label field-label--breakdown--secondary">Counter-measures</div>
					<div class="field-data field-data--breakdown--secondary">
						{{ defensiveCountermeasures.defCMBonusToTl }}
					</div>
				</div>

				<div class="field-breakdown-group field-breakdown-group--secondary">
					<div class="field-label field-label--breakdown--secondary">Size Mod</div>
					<div class="field-data field-data--breakdown--secondary">{{ sizeCategory.acAndTlModifier }}</div>
				</div>

				<div class="field-breakdown-group field-breakdown-group--secondary">
					<div class="field-label field-label--breakdown--secondary">Misc Mod</div>
					<div class="field-data field-data--breakdown--secondary">XXX</div>
				</div>
			</div>

			<p><strong>AC</strong> {{ armourClass }}; <strong>TL</strong> {{ targetLock }}</p>
			<p><strong>HP</strong> {{ hp }}; <strong>DT</strong> {{ frame.dt }}; <strong>CT</strong> {{ criticalThreshold }}; <strong>Modifiers</strong> {{ modifiersDescription }}</p>

			<p>
				<strong>Build Points</strong> cost {{ totalBpCost }}, max {{ tier.bpBudget }}
				<strong>Power Core Units</strong> non-essential {{ totalPcuCost.essential + totalPcuCost.nonEssential }}, essential {{ totalPcuCost.essential }}, max {{ pcuBudget }}
			</p>

			<h3>Concept</h3>
			<p v-html="params.shipConcept"></p>

		</div>





		<!--
		| - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
		| WEAPONS
		| - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
		-->
		<div class="weapons">
			<p v-for="(weaponDescription, position) in weaponDescriptions">
				<strong>Attack ({{ position.toTitleCase() }})</strong>
				{{ weaponDescription }}
			</p>
			
		</div>





		<!--
		| - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
		| CREW
		| - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
		-->
		<div class="crew">
			<template v-if="params.hasCrew">
			<h3>Crew</h3>
				<p v-for="(roleObj, role) in params.crewSkills" v-if="roleObj.hasRole"><strong>{{ roleDescription[role] }}</strong> {{ crewDescriptions[role] }}</p>
			</template>
			
		</div>





		<!--
		| - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
		| SYSTEMS
		| - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
		-->
		<div class="systems">
			<p><strong>Power Core(s)</strong> {{ powerCoreDescription }}</p>
			
			<p><strong>Drift Engine</strong> {{ driftEngine.name }}; <strong>Drift</strong> {{ driftEngine.engineRating }}</p>

			<p><strong>Systems</strong> {{ systemsDescription }}<span v-if="hasSecurity">; 
			<strong>Security</strong> {{ securityDescription }}</span><span v-if="expansionBays.length > 0">; 
			<strong>Expansion Bays</strong> {{ expansionBaysDescription }}</span></p>

			<p><strong>Custom Components</strong> {{ customComponentsDescription }}</p>
			
		</div>





		<!--
		| - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
		| CRITICAL
		| - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
		-->
		<div class="critical">
			
		</div>
		
	</div>		



	<!-- Prod -->
	<!-- <script>
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga');ga('create', 'UA-47769832-1', 'auto');ga('send', 'pageview');
	</script>

	<script src="vendor/vue/vue.min.js"></script> -->

	<!-- Dev -->
	<script src="https://unpkg.com/vue"></script>

	<script src="js/ss-components.js"></script>
	<script src="js/script.js"></script>

</body>
</html>
