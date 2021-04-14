$(document).ready(function() {

  // МНОГОУРОВНЕВОЕ МЕНЮ

  $('.dropdown-menu a.dropdown-toggle').on('click', function(e) {
    $(this).toggleClass('header__lastToggle-revert');
    if (!$(this).next().hasClass('show')) {
      $(this).parents('.dropdown-menu').first().find('.show').removeClass('show');
    }
    var $subMenu = $(this).next('.dropdown-menu');
    $subMenu.toggleClass('show');
  
    $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function(e) {
      $('.dropdown-submenu .show').removeClass('show');
    });

    $('.dropdown-menu').on('click', function(event) {
      event.preventDefault();
			event.stopPropagation(); 
		});
  });
  

// СЛАЙДЕР


    $('.first__slider').slick({
      dots: true,
      autoplay: true,
      infinite: true,
      speed: 300
    });


// ПОПАП С ФОРМОЙ ПОИСКА


    $('.header__openPopup').click(function() {
      var popup_id = $('#' + $(this).attr("rel"));
      $(popup_id).show();
      $('.header__overlay').show();
  });
  $('.header__popup .header__close, .header__overlay').click(function() {
      $('.header__overlay, .header__popup').hide();
  });


});
