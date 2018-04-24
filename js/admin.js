$(document).ready(function() {
    "use strict"

    var menu_items;

    $.ajax(

        {
            url : 'load_menu_item.php',
            dataType: 'json',
            success: function(result) {
                menu_items = result;
                console.log(menu_items);
                displayItems('lunch');
            } 
        }
    );


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
        var menu_item = '<div class="col-md-8 dish-content">';
    
        console.log(active_menu);
        var id = 0;
        for(var item in active_menu) {
            if(active_menu.hasOwnProperty(item)) {
            
                var dish = `<div id="item` + id + '" ' + `class="single-dish">
                    <div class="single-dish-heading">
                        <h4 class="name">` + active_menu[item].name + `</h4>
                            <h4 class="price">` + active_menu[item].cost + `
                                <a class="fa fa-remove removeitem"></a>											
                        </h4>
                    </div>
                    <p>` + active_menu[item].description + `</p>
                </div>`
            
                menu_item += dish;
                id +=1;
            
            } 
        }
    
        menu_item += '</div>';
    
        return menu_item;
    
    }

    function removeItem(itemName, subCategory, category, id) {
        var data = {'cmd': 'delete','item': itemName, 'subCategory': subCategory, 'category': category};
        $.post('update.php', data, function(response) {
            // do something here with the returnedData

            
            if(response === 'OK') {
                console.log('removing item',menu_items[category][subCategory]);
                for(var item in menu_items[category][subCategory]){
                    var cur_item = menu_items[category][subCategory][item];
                    console.log(cur_item['name'],itemName);
                    if(cur_item['name'] === itemName.trim()){
                        menu_items[category][subCategory].splice(item,1);
                        break;
                    }
                }
                $('div#'+ id ).remove();
            }
            console.log(menu_items);
        })

    }

    function addNewItem(){
        var newItemform = `<div class =" add-new-item tab-pane fade in active" >
            <h3 class="title">Add new Item</h3>
            <input class="input" placeholder="Category" type="text" id="category"></br>
            <input class="input" placeholder="SubCategory" type="text" id="subcategory"></br>
            <input class="input" placeholder="Name" type="text" id="name"></br>
            <input class="input" placeholder="Description" type="text" id="description"></br>
            <input class="input" placeholder="Price" type="text" id="cost"></br>
            <button class="main-button" id="submit-new-item" style="margin-top:20px;">Submit</button></br>
        </div>`;
        
        $('div#menu-content').prepend(newItemform);

    }
    $("#lunch").click( function() {
        $('#menu-content div:first').remove();
        $('#menu-content div:nth-child(2)').remove();
        console.log('lunch calling');
        displayItems('lunch');
    });

    $("#dinner").click( function() {
        $('#menu-content div:first').remove();
        $('#menu-content div:nth-child(2)').remove();
        console.log('dinner calling');
        displayItems('dinner');
    });

    $("#drinks").click( function() {
        $('#menu-content div:first').remove();
        $('#menu-content div:nth-child(2)').remove();
        console.log('drinks calling');
        displayItems('drinks');

    });

    $("#weekends").click( function() {
        $('#menu-content div:first').remove();
        $('#menu-content div:nth-child(2)').remove();
        console.log('weekends calling');
        displayItems('weekends');
    });

    $("#add-new-item").click( function() {
        $('#menu-content div:first').remove();
        $('#menu-content div:nth-child(2)').remove();
        console.log('weekends calling');
        //displayItems('weekends');
        addNewItem();
    });

    $(".container").on('click', '.dummy', function() {
        var subCategory = $(this).text();
        var category = $('.tab-pane').attr('id');
        var subCatItems= getMenuItems(category, subCategory);
        console.log(subCatItems);
        $('div.dish-content').remove();
        var $element = 'div#'+ category + ' > div:nth-child(1)';
        $($element).after(subCatItems);
    });

    $(".container").on('click', '.removeitem', function(){

        var item = $(this).closest('h4').prev().html().trim();
        var subCategory = $('.dummy').text().trim();
        var category = $('.tab-pane').attr('id').trim();
        var id = $(this).closest('div.single-dish').attr('id').trim();
        console.log(id);
        removeItem(item,subCategory,category, id);


    });

    $(".container").on('click', '#submit-new-item', function(){
        console.log("Clicked add_comment");
        var category = $("#category").val();
        var subCategory = $("#subcategory").val();
        var name = $("#name").val();
        var description = $("#description").val();
        var cost = $("#cost").val();
		var dataString = 
		{
            "cmd": "insert",
			"category": $("#category").val(),
			"subcategory": $("#subcategory").val(),
			"name": $("#name").val(),
            "description": $("#description").val(),
			"cost": $("#cost").val(),            
		}

		dataString = JSON.stringify(dataString);
		$.ajax({
			url: 'update.php',
			data: {myData: dataString},
			type: 'POST',
			success: function(response) {

                if(response === 'OK' ){
                    var newData = {'name':name, 'description':description, 'cost': cost};
                    console.log(category, subCategory);                    
                    menu_items[category][subCategory].push(newData);
                    //var subCatItems= getMenuItems(category, subCategory);
                    //console.log(subCatItems);
                    $('div.add-new-item').remove();
                    $('a#add-new-item').parent().removeClass('active');
                    $('a#' + category).parent().addClass('active');
                    //var $element = 'div#'+ category + ' > div:nth-child(1)';
                    //$($element).after(subCatItems);
                    displayItems(category);
                    var subCatItems= getMenuItems(category, subCategory);
                    $('div.dish-content').remove();
                    var $element = 'div#'+ category + ' > div:nth-child(1)';
                    $($element).after(subCatItems);
                }
			}
		});		
	});

});