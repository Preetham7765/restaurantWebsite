<?php
//include "config.php";
//include "load_comments.php";
?>

<!DOCTYPE html>
<html lang="en">
<head>
	<title>Bootstrap Example</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="css/bootstrap.min.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
  	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	<!-- <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script> -->
	<script src="js/comment.js"></script>
	<script src="js/jquery.twbsPagination.min.js"></script>

<!-- 	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
 -->
	
	<!-- Custom stlylesheet -->
	<link type="text/css" rel="stylesheet" href="css/style.css"/>
</head>
<body>

<div class="container" style="padding-top:30px;">
	<h2> Reviews and Ratings</h2>
	<div class="row" id="comment_abhi">
	</div>


	<!-- Modal -->
	<div class="modal fade" id="myModal" role="dialog">
		<div class="modal-dialog">

			<!-- Modal content-->
			<div class="modal-content">
				<div class="modal-header">
				  <button type="button" class="close" data-dismiss="modal">&times;</button>
				  <h4 class="modal-title" id="modal-title"></h4>
				</div>
				<!-- End modal header -->

				<div class="modal-body" id="modal-body">
					<p></p>
				</div>
				<!-- End modal body -->

				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				</div>
				<!-- End modal footer/close -->
			</div>
			<!-- End modal content -->
		</div>
		<!-- End modal dialog -->
	</div>

	<div id="pager" style="text-align:center;">
	      <ul id="pagination" class="pagination-sm"></ul>
	</div>

</div>

</body>
</html>

