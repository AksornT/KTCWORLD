
//change header when scroll down.
$(document).on('scroll', function() {
    if($(this).scrollTop()>=$('#head-trigger').position().top){
        $('.site-header').addClass('fixed-header');
        $('.ghost-footer').addClass('active');
    }else{
        $('.site-header').removeClass('fixed-header');
        $('.ghost-footer').removeClass('active');
    };

//something appeared on footer
    if($(this).scrollTop()>=$('#foot-trigger').position().top){
        $('.ghost-footer').addClass('active-mobile');
    }else{
        $('.ghost-footer').removeClass('active-mobile');
    };
});

//for menu mobile


$(document).ready(function() {
	$('.footer-menu h3').on('click touch', function () {
      $('.footer-menu h3').not(this).each(function(){
        $(this).removeClass('active');
    });
      $(this).toggleClass('active');
  });

  $(".to-top").on('click touch', function () {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    return false;
  });


  //search-category selected
  $(".subcat-wrap label").on('click touch', function () {
    $(this).parent().siblings().prop("checked", false);
  });
  $(".search-cat-wrap > label").on('click touch', function () {
    $(".subcat-wrap input").prop("checked", false);
  });
    
	$('.menu-responsive-dropdown h3').on('click touch', function () {
    $('.menu-responsive-dropdown h3').not(this).each(function(){
	    $(this).removeClass('active');
	  });
    $(this).toggleClass('active');
  });

  $('body').on('click touch', function (e) {
      $('.scrolled-menu > li').removeClass('active');
      $('.logged-in').removeClass('active');
  });
  
  $('.scrolled-menu > li').on('click', function (e) {
    	console.log('do!!');
      e.stopPropagation();
      $('.scrolled-menu > li').not(this).each(function(){
          $(this).removeClass('active');
      });
      $(this).toggleClass('active');
      $('.logged-in').removeClass('active');
  });
  
  $('.logged-in').on('click touch', function (e) {
      e.stopPropagation();
      $(this).toggleClass('active');
      $('.scrolled-menu > li').removeClass('active');
  });

  $('.menu-mobile.only-mobile').on('click touch', function () {
      $('#scrolled-menu-responsive').addClass('active');
  });
  $('.menu-resp-close').on('click touch', function () {
      $('#scrolled-menu-responsive').removeClass('active');
  });

});
