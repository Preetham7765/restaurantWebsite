$(document).ready(function() {
	order_summary = [
	{title: "Breakfast- Item", count: 7, id: 0, cost: "25"},
	{title: "Breakfast- Item1", count: 7, id: 1, cost: "25"},
	{title: "Breakfast- Item2", count: 6, id: 2, cost: "125"}
	];
	order_summary = JSON.stringify(order_summary);

	new_summary = JSON.parse(order_summary);

	var iter;
	var grad_total = 0;
	for (iter=0;iter<new_summary.length;iter++) {
		summary_item_title = '<span class="summary-item-title">' + new_summary[iter].title + '</span>'
		summary_item_count = '<span class="summary-item-count"> x' + new_summary[iter].count +'</span>'
		summary_item_cost = '<span class="summary-item-cost"> $' + new_summary[iter].cost +'</span>'
		grad_total += parseInt(new_summary[iter].cost);
		element = '<li class="list-group-item">' + summary_item_title + summary_item_count + summary_item_cost +'</li>';
		$("#order-summary").append(element);
	}
	$("#total-display").html("$" + grad_total);
});