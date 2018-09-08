/*滚动条监听事件*/
$(document).ready(function() {
	var postTop;
	var reallTop;
	var reallTopShow;
	$(window).scroll(function() {
		postTop = $(document).scrollTop();
		reallTop = $("#menu").height() + $("#myCarousel").height() + $(".ms-news-model").height() + $(".banner").height() + 20;
		reallTopShow = $("#carousel-example-generic").height() + 60;
		if(postTop >= reallTop) {
			$(".topDiv").show();
			$("#top").show();
			$(".model-all").addClass("navbar-fixed-top");
			$(".container-fluid").css("padding", "0px 30px");
			$(".model-filter").addClass("fixed-filter");
		}
		if(postTop >= reallTopShow) {
			$("#orderby-all").addClass("navbar-fixed-top");
			$(".ms-mstore-show-div").show();
		}
		if(postTop > 1800) {
			$(".btn-group-vertical").fadeIn();
		} else {
			$(".btn-group-vertical").fadeOut();
		}
		if(postTop < reallTopShow) {
			$("#orderby-all").removeClass("navbar-fixed-top");
			$(".ms-mstore-show-div").hide();
		}
		if(postTop < reallTop) {
			$(".topDiv").hide();
			$("#top").hide();
			$(".model-all").removeClass("navbar-fixed-top");
			$(".container-fluid").css("padding", "0px 15px");
			$(".model-filter").removeClass("fixed-filter");
		}
	})
	$(window).scroll(function() {
		var sum = $(document).scrollTop();
		if(sum <= $(this).scrollTop() + $(this).height()) {}
	});
});

/*锚链接*/
function goTop() {
	$('html,body').animate({
		scrollTop: 0
	}, 500);
};