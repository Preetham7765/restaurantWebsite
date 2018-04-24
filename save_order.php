<?php
include "config.php";

	$obj = json_decode($_POST['myData']);
	// echo $obj;
	$sql_query = "SELECT MAX(order_id)+1 AS order_id from ORDERS";
	$newid = mysqli_fetch_array(mysqli_query($con, $sql_query));

	$sql_query = "INSERT INTO ORDERS (order_id, summary, total, user_id, o_time, firstname, address, phone)
					VALUES ('". $newid['order_id'] ."', '"  . $obj->summary . "', '" . $obj->total . "', '" . 3 . "', NOW(), '" . $obj->name . "', '" . $obj->address . "', '" . $obj->phone . "')";
	// $sth = mysqli_query($con,$sql_query);


	if ($con->query($sql_query) === TRUE) {
	    error_log("New record in order table created successfully");
	} else {
	    error_log("ERROR\nQuery: " . $sql_query . "\nerror: " . $con->error);
	}

	echo "Inserted";
?>