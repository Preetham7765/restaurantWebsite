$(document).ready(function(){
	var $pagination = $('#pagination'),
		totalRecords = 0,
		records = [],
		displayRecords = [],
		recPerPage = 3,
		page = 1,
		totalPages = 0;

	function load_global_variables(reload) {
		$.ajax({
			url: "load_comments.php",
			async: true,
			dataType: 'json',
			success: function (data) {
				records = data;
				console.log(records);
				totalRecords = records.length;
				totalPages = Math.ceil(totalRecords / recPerPage);
				apply_pagination(reload);
			}
		});
	}

	$("#add_comment").click(function() {
		console.log("Clicked add_comment");
		var dataString = 
		{
			"name": $("#user_comment_name").val(),
			"email": $("#user_comment_email").val(),
			"message": $("#user_comment_message").val(),
			"rating": $("#user_comment_rating").val()
		}

		dataString = JSON.stringify(dataString);
		$.ajax({
			url: 'save_comment.php',
			data: {myData: dataString},
			type: 'POST',
			success: function(response) {
				console.log("Saved comment");
				load_global_variables(true);
				$("#user_comment_name").val('');
				$("#user_comment_email").val('');
				$("#user_comment_message").val('');
				$("#user_comment_rating").val('');
			}
		});		
	});

	load_global_variables(false);

	function generate_table() {
		var div;
		var ul;
		$('#comment_abhi').html('');
		console.log("Chaning comments");
		for (var i = 0; i < displayRecords.length; i++) {
			div = $('<div class="col-sm-4 comment-edit" id="c'+i+'"><div/>');
			ul = $('<ul class="list-group"></ul>');

			ul.append('<li class="list-group-item list-group-item-info" id="c_user'+i+'">' + displayRecords[i].username + '</li>');
			var star;
			var data = '';
			for (star=0; star<displayRecords[i].rating; star++)
			{
				data += '<span class="fa fa-star checked"></span>';
			}
			for (; star<5; star++)
			{
				data += '<span class="fa fa-star"></span>';
			}

			ul.append('<li class="list-group-item" id="c_rating'+i+'">' + data + '</li>');
			ul.append('<li class="list-group-item subject-overflow" id="c_message'+i+'">' + displayRecords[i].message + '</li>');
			div.append(ul);
			// console.log(div);
			$('#comment_abhi').append(div);
		}
		load_events();
	}	

	function apply_pagination(reload) {
		console.log("Applying pagination");
		if (reload) {
			console.log("Reload true");
			displayRecordsIndex = Math.max(page - 1, 0) * recPerPage;
			endRec = (displayRecordsIndex) + recPerPage;
			// console.log(displayRecordsIndex + ' ssssssssss '+ endRec);
			displayRecords = records.slice(displayRecordsIndex, endRec);
			generate_table();
		}
		else {
			$pagination.twbsPagination({
				totalPages: totalPages,
				visiblePages: 5,
				onPageClick: function (event, page) {
					console.log("Clickled page " + page);
					displayRecordsIndex = Math.max(page - 1, 0) * recPerPage;
					endRec = (displayRecordsIndex) + recPerPage;
					// console.log(displayRecordsIndex + ' ssssssssss '+ endRec);
					displayRecords = records.slice(displayRecordsIndex, endRec);
					generate_table();
				}
			});
		}
	}

	function load_events() {
		$("#c0").click(function() {
			console.log("Clicked c0");
			$("#modal-title").html($("#c_user0").html()+"'s comment");
			$("#user_rating").html($("#c_rating0").html());
			$("#user_message").html($("#c_message0").html());
			console.log($("#c_message0").html());
			$("#myModal").modal();
		});

		$("#c1").click(function() {
			console.log("Clicked c1");
			$("#modal-title").html($("#c_user1").html()+"'s comment");
			$("#user_rating").html($("#c_rating1").html());
			$("#user_message").html($("#c_message1").html());
			console.log($("#c_message1").html());
			$("#myModal").modal();
		});

		$("#c2").click(function() {
			console.log("Clicked c2");
			$("#modal-title").html($("#c_user2").html()+"'s comment");
			$("#user_rating").html($("#c_rating2").html());
			$("#user_message").html($("#c_message2").html());
			console.log($("#c_message2").html());
			$("#myModal").modal();
		});

	}
});