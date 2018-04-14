$(document).ready(function() {
    
    order_summary = [];
    grand_total = 0
    order_count = 0;

    // each object has three fields title, count and total cost.
    /* example 

        order_summary = [
             {
                title : '', 
                count: 0,
                cost: 0,
                id: 0,
            },
        ]
    */

    function addItem(itemTitle, self = '') {

        //console.log("result"+ itemTitle);
        if (order_summary.filter(e => e.title === itemTitle).length > 0) {
            //console.log('vendors contains the element were looking for '); 

            index = order_summary.findIndex((obj => obj.title == itemTitle));
            item = order_summary[index] 
            id = item.id;

            //update count
            item.count += 1;
            element = 'li#order-list-id' + id;
            console.log("element",$(element).children('span#count'));
            $(element).children('span#count').text(item.count);

            //update cost
            var total_cost = parseInt(item.cost) * parseInt(item.count);
            $(element).children('span#price').text('$' + total_cost);
            
            grand_total += parseInt(item.cost);
            console.log(grand_total);
            console.log('update grandtotal');            
            $('div#grand-total').children().text('$' + grand_total);
            
        }
        else{

            console.log('key not Found ' + itemTitle);
            
            newItem = {};
            newItem.title = itemTitle;
            newItem.count = 1;
            newItem.id = order_count;

            var amount = self.parent().text()
            var cost = amount.match(/\d+/)[0]

            newItem.cost = cost;
            grand_total += parseInt(cost);
            

            if($('ul#order-summary li').length == 0){

                console.log("Adding grandtotal");
                var $span = $('<span style = "float: right;"> $' + grand_total + '</span>');
                var $div = $('<div id = "grand-total" >Total Price: </div>');
                $div.append($span);
                console.log($div.html());
                $('ul#order-summary').after($div);
                console.log("setting hidden to false");                
                $('#order-card').attr('hidden', false);

            }

            order_summary.push(newItem);
            
            //deleteButton
            var deleteButton = document.createElement('a');
            deleteButton.setAttribute('id', 'deleteItem');
            deleteButton.setAttribute('class', 'fa fa-minus-circle addItem');            

            //addButton
            var addButton = document.createElement('a');
            addButton.setAttribute('id', 'addItem-summary');            
            addButton.setAttribute('class', 'fa fa-plus-circle addItem');

            //count 
            var count =document.createElement('span');
            count.setAttribute('id', 'count');
            count.innerHTML = newItem.count;
        
            //totalprice
            var total_cost = parseInt(cost) * 1;
            var price_element = document.createElement('span');
            price_element.setAttribute('id', 'price');
            price_element.setAttribute('style', 'float: right; color: #f36500;');
            price_element.innerHTML = '$' + total_cost;


            var liItem =document.createElement('li');
            id = 'order-list-id' + order_count;
            liItem.setAttribute('id', id);
            liItem.className = 'list-group-item';
            itemTitle = '<span class= "item-title">' + itemTitle + '</span>';
            liItem.innerHTML = itemTitle;
            liItem.append(addButton, count, deleteButton, price_element)
            console.log(liItem);
            $('ul#order-summary').append(liItem);

            order_count += 1;
            console.log('update grandtotal');
            $('div#grand-total').children().text( '$' + grand_total);
            
        
        }
       
        //when to add ->atleast one element
        //when to update ->  
        //when to remove -> there are no elements in the order_summary

       
        
    }
    function deleteItem(itemTitle) {

        console.log("Deleteing Item");
        var index = order_summary.findIndex((obj => obj.title == itemTitle));
        var item = order_summary[index]
        var item_id = item.id;
        var element = '#order-list-id' + item_id;
        item.count -= 1;
        grand_total -= item.cost;

        $('div#grand-total').children().text('$' + grand_total);

        if(item.count == 0) {
            order_summary.splice(index, 1);
            $('ul#order-summary ' + element).remove();
            if($('ul#order-summary li').length == 0) {
                grand_total = 0;
                order_count = 0;
                $('div#grand-total').remove();
                console.log("setting hidden to true");
                $('#order-card').attr('hidden', true);
            }
            return;
        }
        console.log("Order-summary:",order_summary);
        console.log("element", element);
        $(element).children('span#count').text(item.count);

        //update cost
        var total_cost = parseInt(item.cost) * parseInt(item.count);
        $(element).children('span#price').text('$' + total_cost);
                
    }

    $(".addItem").click( function() {
        var itemTitle = $(this).closest('td').prev().text();
        addItem(itemTitle, $(this));
    });


    $(".container").on('click', '#addItem-summary', function() {
        itemTitle = $(this).parent().find('span').html();
        addItem(itemTitle);
    });

    $(".container").on('click', '#deleteItem',function() {

        console.log("Preetham");
        itemTitle = $(this).parent().find('span').html();
        deleteItem(itemTitle);
        
    });

});