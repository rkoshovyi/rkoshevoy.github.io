$(document).ready(function(){
  // start animations
  $('.main-left').addClass('main-left-loaded')

  // menu sahowing/hiding
  $('.menu-button').click(function(){
    $('.main').removeClass('main-reduced-left')
    $('.menu').toggleClass('open');
    $(this).toggleClass('open');
  });

  // fullpage
	$('.main-right').fullpage({
    menu: '.menu-list',
    anchors:['about', 'technologies', 'portfolio', 'contacts'],
		navigation: true,
		navigationPosition: 'left',
		continuousVertical: true,
    responsiveWidth: 768,
    scrollOverflow: true
  });

  // replacing fp navigation
  $('#fp-nav').appendTo('#main-left-fp-nav');

  // menu collapsing
  $('#collapse-button').click(function(){
    $('.main').addClass('main-reduced-left');
  });

  $('#uncollapse-button').click(function(){
    $('.main').removeClass('main-reduced-left');
  });

  // modal actions
  $('.portfolio-item-details-button').click(function(e){
    e.preventDefault();

    $(this).parents('.portfolio-item').find('.portfolio-item-title').clone().appendTo('#modal-title');
    $(this).parents('.portfolio-item').find('.portfolio-item-description').clone().appendTo('#modal-text');

    var workLink = $(this).siblings('.portfolio-item-view-button').attr('href');
    $('#modal-view-button').attr('href', workLink);

    $('.details-modal').addClass('details-modal-visible');
  });

  $('.modal-close, .modal-background-overlay').click(function(){
    $('.details-modal').removeClass('details-modal-visible');

    setTimeout(function(){
      $('#modal-title').empty();
      $('#modal-text').empty();
    }, 500);
  });

  //hiding portfolio items in mobile & show more button

  if (screen.width < 768) {
    $('.portfolio-item').not(':first-child, :nth-child(2), :nth-child(3)').addClass('hidden')
  };

  var showCount = 3;

  $('#show-more').click(function(){

    $(this).addClass('show-more-button-active');

    showCount += 3;
    setTimeout(function(){
      $('#show-more').removeClass('show-more-button-active');

      $('.portfolio-item:lt('+showCount+')').removeClass('hidden');

      if ($('.portfolio-item.hidden').length == 0) {
        $('#show-more').css('display', 'none');
      }
    }, 500);
  });

  if (screen.width > 767) {
    $('.menu-button').removeClass('menu-button-hidden');
  } else {
    setTimeout(function(){
      $('.menu-button').removeClass('menu-button-hidden');
    }, 1500);
  }

  // wow js
  new WOW({
    mobile: false
  }).init();

  // superman animation delay

  function randomTime(min, max) {
    return parseInt(Math.random() * (max - min) + min);
  }

  setTimeout(function() {
    document.getElementById('superman').classList.add('animation');
  }, randomTime(5000, 10000))

  setTimeout(function() {
    document.getElementById('superman').classList.remove('animation');
    document.getElementById('superman').classList.add('animation-reverse');
  }, randomTime(15000, 20000))


  $('.iris').xeyes();
  $('.iris2').xeyes();
})
