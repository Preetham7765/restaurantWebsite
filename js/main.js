(function($) {
	"use strict"

	// Preloader
	$(window).on('load', function() {
		$("#preloader").delay(600).fadeOut();
	});
	
	// Mobile Toggle Btn
	$('.navbar-toggle').on('click',function(){
		$('#header').toggleClass('nav-collapse');
	});
	
	// Fixed Nav
	$(window).on('scroll', function() {
		var wScroll = $(this).scrollTop();
		wScroll > $('.banner-area').height() ? $('#header').addClass('fixed') : $('#header').removeClass('fixed');
	});
	
	// Banner Area Height
	function bannerHeight () {
		$('.banner-area').css({'paddingTop': $('#header').height() + 30});
	}
	$(window).on('resize', function() {
		bannerHeight();
	});
	bannerHeight();
	
	// Galery Slider
	$('#galery').owlCarousel({
		items:2,
		loop:true,
		margin:0,
		dots : false,
		nav: true,
		navText : ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
		autoplay : true,
		responsive:{
			0: {
				items:1
			},
			992:{
				items:2
			}
		}
	});

})(jQuery);

$("#reply").ready(function(){
    var ratings = document.getElementsByClassName('rating');
    console.log("Loaded reply content");
    for (var i = 0; i < ratings.length; i++) {
        var r = new SimpleStarRating(ratings[i]);

        ratings[i].addEventListener('rate', function(e) {
            console.log('Rating: ' + e.detail);
            $("#user_comment_rating").val(e.detail);
        });
    }
});
