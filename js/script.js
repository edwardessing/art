$(document).ready(function() {

/* signature */
	if (typeof console !== 'undefined') {
		console.log("%cEDES, \nDesign & Development: Edward Essing (http://edwardessing.com)", "color: #FFA500; font-weight: bold; font-size: 12px;");
	}


/* menu */
	$('.menu-link').click(function () {
		$('.menu-link').toggleClass( 'rotate' );
		$('.dropdown').toggleClass( 'active' );
	});

	$(document).mouseup(function (e) {
		var box = $('.dropdown, .menu-link');
		if (!box.is(e.target) // if the target of the click isn't the container...
			&& box.has(e.target).length === 0) // ... nor a descendant of the container
			{
				$('.menu-link').removeClass('rotate');
				box.removeClass('active');
			}
	});

/* style toggle */
	function switchSize(newSize) {
		var sizes = ['t1', 't2', 't3'].forEach(function (size) {
			$('#container').removeClass(size);
		});

		$('#container').addClass(newSize);
		localStorage.setItem('storedSize', newSize);
	}
	function switchColour(newColour) {
		['gold', 'black', 'white'].forEach(function (colour) {
			$('#container').removeClass(colour);
		});

		$('#container').addClass(newColour);
		localStorage.setItem('storedColour', newColour);
	}
	function switchRow(newRow) {
		['col-sm-2','col-sm-3','col-sm-4','col-sm-6','col-sm-12'].forEach(function (row) {
			$('.gallery .img').removeClass(row);
		});

		$('.gallery .img').addClass(newRow);
		localStorage.setItem('storedRow', newRow);
	}
	function switchBorder(newBorder) {
		var borders = ['b1', 'b2', 'b3'].forEach(function (border) {
			$('#container').removeClass(border);
		});

		$('#container').addClass(newBorder);
		localStorage.setItem('storedBorder', newBorder);
	}

	$('.styleSwitch .size').click(function() {
		var value = $(this).val();
		switchSize(value);
	});
	$('.styleSwitch .colour').click(function() {
		var value = $(this).val();
		switchColour(value);
	});
	$('#row-tool').change(function() {
	// $('#tools-nav .row-tool button').click(function(event) {
		var value = $(this).val();
		switchRow(value);
	});
	$('.styleSwitch .border').click(function() {
		var value = $(this).val();
		switchBorder(value);
	});

	var storedSize = localStorage.getItem('storedSize');
	var storedColour = localStorage.getItem('storedColour');
	var storedRow = localStorage.getItem('storedRow');
	var storedBorder = localStorage.getItem('storedBorder');
	if (storedSize) {
		switchSize(storedSize);
	} else {
		switchSize('t2');
	}
	if (storedColour) {
		switchColour(storedColour);
	} else {
		switchColour('gold');
	}
	if (storedRow) {
		switchRow(storedRow);
	} else {
		switchRow('col-sm-3');
	}
	if (storedBorder) {
		switchBorder(storedBorder);
	} else {
		switchBorder('b3');
	}


/* color variables */
	if ($('#container').hasClass('gold') === true) {
		$('.link').css('color','black');
	} else {
		$('.link').css('color','#ff5722');
	}

	$('button.colour').click(function () {
		if ($('#container').hasClass('gold') === true) {
			$('.link').css('color','black');
		} else {
			$('.link').css('color','#ff5722');
		}
	});

	var rowName = $('#row-tool input[value=' + storedRow + ']').html();
	$('.row-selected').html(rowName);
	$('.row-selected').val(storedRow);


/* 6 items fix */
	(function($) {
		var $window = $(window),
			$cover = $('.gallery .img');

		function resize() {
			if ($window.width() < 720 && $cover.hasClass('col-sm-2')) {
				$cover.removeClass('col-sm-2');
				$cover.addClass('col-sm-3');
			}
		}

		$window
			.resize(resize)
			.trigger('resize');
	})(jQuery);

/* image thumbnails + captions */
$('.img-thumb').each(function() {
	var path = $(this).attr("alt");
	var directory = path.replace(/[^\/]*$/, '');
	var filename = path.replace(/^.*[\\\/]/, '');
	var ext = filename.split('.').pop();
	var caption = filename.replace(/\.[^/.]+$/, '')
	// $(this).parent().prop('href', "/images/" + caption + "." + ext);
	/* caption */
	$(this).parent().prop('title', caption);
	if (caption != '') {
		var imgWidth = $(this).width();
		var imgHeight = $(this).height();
		var position = $(this).position();
		var positionTop = (position.top + imgHeight - 26)
		$("<span class='img-caption'>" + caption + "</span>").css({
			"display": "block",
			"width": "100%",
			"text-align": "center",
			"padding": "10px 0 40px"
		}).insertAfter(this);
	}
});

$('.gallery').magnificPopup({
	delegate: 'a.img',
	type: 'image',
	tLoading: 'Loading image %curr%...',
	mainClass: 'mfp-img-mobile',
	fixedBgPos: true,
	closeOnContentClick: true,
	gallery: {
		enabled: true,
		navigateByImgClick: false,
		preload: [0,1] // Will preload 0 - before current, and 1 after the current image
	},
	image: {
		tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
		titleSrc: function(item) {
			return item.el.attr('title');
		}
	}
});

/* script end */
});