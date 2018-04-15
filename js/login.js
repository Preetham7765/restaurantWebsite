$(document).ready(function(){
	if (localStorage.getItem('user_id'))
	{
		console.log("Valid User ID");
		$("#login-register").html("My Profile");
		$("#login-register").removeAttr("data-toggle");
		$("#login-register").click(function() {
			window.location = "profile.html";
		});
	}
	else
	{
		$("#login-register").html("Login/Register");
		$("#login-register").attr("data-toggle", "modal");
		console.log("User ID not equal to 1");
	}

	$("#login-submit").click(function() {
		var userCredentials = 
		{
			"email": $("#email").val(),
			"pwd": $("#pwd").val()
		}
		userCredentials = JSON.stringify(userCredentials);
		$.ajax({
			url: 'login.php',
			data: {userData: userCredentials},
			dataType: 'json',
			type: 'POST',
			success: function(response) {
				console.log("Login result: " + response.user_id);
				if(response.user_id > 0)
				{
					localStorage.setItem('user_id', response.user_id);
					$("#login-register").removeAttr("data-toggle");
					$("#login-register").click(function() {
						window.location = "profile.html";
					});
					window.location = "index.html";
				}
				else
				{
					localStorage.removeItem('user_id');
					$("#login-register").attr("data-toggle", "modal");
					$("#wrong-credentials").html("Wrong email or password");
					console.log("Error");
				}
				console.log(localStorage.getItem('user_id'));
			}
		});		
	});
});
