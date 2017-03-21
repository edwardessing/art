$(document).ready(function() {

/* signature */
	if (typeof console !== 'undefined') {
		console.log("%cEDES, \nDesign & Development: Edward Essing (http://edwardessing.com)", "color: #FFA500; font-weight: bold; font-size: 12px;");
	}

/* duplication fix */
	$('[id]').each(function (i) {
		$('[id="' + this.id + '"]').slice(1).remove();
	});


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

/* post nav */
	$('.post-nav div').hover(function () {
		$(".post-nav a span").toggleClass( 'active' );
	});

	// if($('.post-nav a').length >0 ){
	//  var prev = $('.post-nav .prev a')[0],
	//      next = $('.post-nav .next a')[0];

	//  $(window).keydown(function(e){
	//      if (e.which === 37) {
	//          window.location.href = prev.href;
	//      } else if (e.which === 39) {
	//          window.location.href = next.href;
	//      }
	//  });
	// }

// Cross browser addEvent function by John Resig
// http://ejohn.org/blog/flexible-javascript-events/
	function addEvent(obj, type, fn) {
		if (obj.attachEvent) {
			obj['e' + type + fn] = fn;
			obj[type + fn] = function () {
				obj['e' + type + fn](window.event);
			}
			obj.attachEvent('on' + type, obj[type + fn]);
		} else obj.addEventListener(type, fn, false);
	}

	function trigger(action, el){
	  if (document.createEvent) {
		var event = document.createEvent('HTMLEvents');
		event.initEvent(action, true, false);
		el.dispatchEvent(event);
	  } else {
		el.fireEvent('on' + action);
	  }
	}

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
	/* original link */
	$(this).prop('src', directory + "/thumbs/" + caption + "-thumb." + ext);
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

	// $(this).attr('src', function(index, attr) {
	// 	return attr.replace(/\.[^.]*$/, '_thumb$&');
	// });
});

/* script end */
});