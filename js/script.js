//==========================бургер=========================================================================
$('.header-menu__burger').click(function (event) {
	$(this).toggleClass('active');
	$('.header-menu__nav').toggleClass('active');
	if ($(this).hasClass('active')) {
		$('body').data('scroll', $(window).scrollTop());
	}
	// Блокировать бади, чтобы не было прокрутки страницы, при прокрутке бургера
	$('body').toggleClass('lock');
	if (!$(this).hasClass('active')) {
		$('body,html').scrollTop(parseInt($('body').data('scroll')));
	}
});
//==========================бургер=========================================================================



//=============================ibg=========================================================================
function ibg() {
	$.each($('.ibg'), function (index, val) {
		if ($(this).find('img').length > 0) {
			$(this).css('background-image', 'url("' + $(this).find('img').attr('src') + '")');
		}
	});
}
ibg();
//=============================ibg=========================================================================



//=============================popup=======================================================================
// Объявляем переменные
const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll(".lock-padding");

let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
	for (let index = 0; index < popupLinks.length; index++) {
		const popupLink = popupLinks[index];
		popupLink.addEventListener("click", function (e) {
			const popupName = popupLink.getAttribute('href').replace('#', '');
			const curentPopup = document.getElementById(popupName);
			popupOpen(curentPopup);
			e.preventDefault();
		});
	}
}
const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
	for (let index = 0; index < popupCloseIcon.length; index++) {
		const el = popupCloseIcon[index];
		el.addEventListener('click', function (e) {
			popupClose(el.closest('.popup'));
			e.preventDefault();
		});
	}
}

function popupOpen(curentPopup) {
	if (curentPopup && unlock) {
		const popupActive = document.querySelector('.popup.open');
		if (popupActive) {
			popupClose(popupActive, false);
		} else {
			bodyLock();
		}
		curentPopup.classList.add('open');
		curentPopup.addEventListener("click", function (e) {
			if (!e.target.closest('.popup__content')) {
				popupClose(e.target.closest('.popup'));
			}
		});
	}
}

function popupClose(popupActive, doUnlock = true) {
	if (unlock) {
		popupActive.classList.remove('open');
		if (doUnlock) {
			bodyUnLock();
		}
	}
}

function bodyLock() {
	const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

	if (lockPadding.length > 0) {
		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}
	body.style.paddingRight = lockPaddingValue;
	body.classList.add('lock');

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

function bodyUnLock() {
	setTimeout(function () {
		if (lockPadding.length > 0) {
			for (let index = 0; index < lockPadding.length; index++) {
				const el = lockPadding[index];
				el.style.paddingRight = '0px';
			}
		}
		body.style.paddingRight = '0px';
		body.classList.remove('lock');
	}, timeout);

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

document.addEventListener('keydown', function (e) {
	if (e.which === 27) {
		const popupActive = document.querySelector('.popup.open');
		popupClose(popupActive);
	}
});

(function () {
	// проверяем поддержку
	if (!Element.prototype.closest) {
		// реализуем
		Element.prototype.closest = function (css) {
			var node = this;
			while (node) {
				if (node.matches(css)) return node;
				else node = node.parentElement;
			}
			return null;
		};
	}
})();
(function () {
	// проверяем поддержку
	if (!Element.prototype.matches) {
		// определяем свойство
		Element.prototype.matches = Element.prototype.matchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector;
	}
})();
//=============================popup=======================================================================



//======================================user-arrows========================================================
// $('.header-arrows').click(function () {
// 	$(this).toggleClass('active');
// 	$('.header-user__submenu').toggleClass('active');
// 	var e = document.getElementById('test');
// 	if (!e.contains(event.target)) e.style.display = 'none';
// });


// document.addEventListener('click', function (event) {
// 	var e = document.getElementById('test');
// 	if (!e.contains(event.target)) e.style.display = 'none';
// });
let hamburger = document.querySelector('.header-arrows');
let menu = document.querySelector('.header-user__submenu');

const toggleMenu = () => {
	menu.classList.toggle('active');
}

hamburger.addEventListener('click', e => {
	e.stopPropagation();

	toggleMenu();
});

document.addEventListener('click', e => {
	let target = e.target;
	let its_menu = target == menu || menu.contains(target);
	let its_hamburger = target == hamburger;
	let menu_is_active = menu.classList.contains('active');

	if (!its_menu && !its_hamburger && menu_is_active) {
		toggleMenu();
	}
})
//======================================user-arrows========================================================



//========================================slider===========================================================
$(document).ready(function () {
	$('.main-slider__body').slick({
		autoplay: true,
		pauseOnFocus: true,
		waitForAnimate: true,
		adaptiveHeight: true,
	});
});
$(document).ready(function () {
	$('.cards-lots').slick({
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		pauseOnFocus: true,
		waitForAnimate: true,
		adaptiveHeight: true,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					infinite: true,
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					infinite: true,
				}
			}
		]
	});
});

//========================================slider===========================================================

//======================================control-lots-slider__sirclebtn=====================================
$('.control-lots-slider__sirclebtn').click(function (event) {
	$('.control-lots-slider__sirclebtn,.control-lots-slider__smsircle').toggleClass('active');
	if ($('.control-lots-slider__sirclebtn').hasClass('active')) {
		$('.cards-lots').slick('unslick');
	}
	else $('.cards-lots').slick({
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		pauseOnFocus: true,
		waitForAnimate: true,
		adaptiveHeight: true,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					infinite: true,
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					infinite: true,
				}
			}
		]
	});
});
//======================================control-lots-slider__sirclebtn================================

//========================================time========================================================
function zero_first_format(value) {
	/* функция добавления ведущих нулей */
	/* (если число меньше десяти, перед числом добавляем ноль) */
	if (value < 10) {
		value = '0' + value;
	}
	return value;
}
/* функция получения текущей даты и времени */
function date_time() {
	var current_datetime = new Date();
	var hours = zero_first_format(current_datetime.getHours());
	var minutes = zero_first_format(current_datetime.getMinutes());
	var seconds = zero_first_format(current_datetime.getSeconds());
	var milliseconds = zero_first_format(current_datetime.getMilliseconds());

	return hours + ":" + minutes + ":" + seconds + ":" + milliseconds;
}
/* выводим текущую дату и время на сайт в блок с id "current_date_time_block" */
document.getElementById('lots-time').innerHTML = date_time();
document.getElementById('lots-time-2').innerHTML = date_time();
document.getElementById('lots-time-3').innerHTML = date_time();
document.getElementById('lots-time-4').innerHTML = date_time();
//========================================time=============================================================

//======================================scroll to elem=====================================================
$("#auction").click(function () { // ID откуда кливаем
	$('html, body').animate({
		scrollTop: $(".lots-slider").offset().top  // класс объекта к которому приезжаем
	}, 1000); // Скорость прокрутки
});
$("#info").click(function () { // ID откуда кливаем
	$('html, body').animate({
		scrollTop: $(".info").offset().top  // класс объекта к которому приезжаем
	}, 1000); // Скорость прокрутки
});
$("#contacts").click(function () { // ID откуда кливаем
	$('html, body').animate({
		scrollTop: $(".footer").offset().top  // класс объекта к которому приезжаем
	}, 1000); // Скорость прокрутки
});
$("#service").click(function () { // ID откуда кливаем
	$('html, body').animate({
		scrollTop: $(".services").offset().top  // класс объекта к которому приезжаем
	}, 1000); // Скорость прокрутки
});
//======================================scroll to elem=====================================================