<!DOCTYPE html>
<html>

<head>
	<meta charset="utf-8">

  	

	<meta name="viewport" content="width=device-width, initial-scale=1">
	<script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
	<script type="text/javascript" src="http://netdna.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
	<link href="http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.3.0/css/font-awesome.min.css"
	rel="stylesheet" type="text/css">
	<link rel="stylesheet" href="landing.css">
</head>
<?php
$gen = "?req=".date("Y-m-d_H:i:s");
?>
<body>
	<div class="headerimg"><img src="img/logo.png"/></div>
	
		<div class="cover">
			
			<div class="cover-image" style="background-image : url('img/bg1.jpg');">
				
			</div>

			<div class="container-fluid">

				<a class="fingerbtn" href="fingerscan/index.php<?php echo $gen; ?>" role="button">FingerScan</a>
				<a class="eservicebtn" href="eservice/index.php<?php echo $gen; ?>" role="button">E-Service</a>
				<a class="checklistbtn" href="checklist/index.php<?php echo $gen; ?>" role="button">Checklist</a>
				<a class="invenbtn" href="matmg/index.php<?php echo $gen; ?>" role="button">Inventory</a>

			</div>

		</div>	
						
	</body>

	</html>