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

	
	
	//displayItems('lunch');
	
	/*
		display each subcategory for a given category.
	
	*/
	
	function displayItems(category) {
	
		var categoryItems = menu_items[category]; // { }
		console.log(menu_items);
		var subCategory_names = Object.keys(categoryItems); // 
		var subCatMenu = `<div id=` +`"` + category +`"` + `class="tab-pane fade in active">
			<div class="col-md-2">
				<div class="sidebar-nav">
					<div class="navbar navbar-default" role="navigation">
						<div class="navbar-collapse collapse sidebar-navbar-collapse">
							<ul class="nav navbar-nav">`
	
		for(var item in subCategory_names){
			subCatMenu += '<li id = "item' + item + '" ' + 'class = "active">' 
							+ '<a id = "sub-cat' + item + '" class = "dummy"> ' + 
							subCategory_names[item]  + '</a></li>';
		}
	
		subCatMenu += '</ul></div><!--/.nav-collapse --></div></div></div>';
		var subCatItems = getMenuItems(category, subCategory_names[0]); // default: select first category
		$('div#menu-content').prepend(subCatMenu + subCatItems);   
	   
	}
	
	/*
		returns the mark-up containing menu items
		of all given a category and subCategory
	
	*/
	
	function getMenuItems(category, subCategory) {
	
		console.log(category, subCategory);
		var active_menu = menu_items[category.trim()][subCategory.trim()]; //
		var menu_item = '<div class="col-md-5 dish-content">';
	
		console.log(active_menu);
		for(var item in active_menu) {
			if(active_menu.hasOwnProperty(item)) {
	
				dish = `<div class="single-dish">
					<div class="single-dish-heading">
						<h4 class="name">` + active_menu[item].name + `</h4>
							<h4 class="price">` + active_menu[item].cost + `
								<a class="fa fa-plus-circle addItem"></a>											
						</h4>
					</div>
					<p>` + active_menu[item].description + `</p>
				</div>`
	
				menu_item += dish;
	
			} 
		}
	
		menu_item += '</div>';
	
		return menu_item;
	
	}	

});
