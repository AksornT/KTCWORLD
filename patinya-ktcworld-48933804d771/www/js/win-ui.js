
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

  //for styling form
    function stylinginputFunction() {
    $('.form-register input[type="text"], .form-wrap input[type="password"]').each(function(){
      var fLabel = $(this).attr('placeholder');
      $(this).after( '<label>' + fLabel + '</label>' );
      $(this).change(function(){
        if ($(this).val().length == 0){
            $(this).removeClass("hasText");
        } else {
            $(this).addClass("hasText");
        }
      });
     });
    }
    stylinginputFunction();
    $('.form-register input[type="text"], .form-register input[type="password"]').each(function(){
        if ($(this).val().length == 0){
            $(this).removeClass("hasText");
        } else {
            $(this).addClass("hasText");
        }
     });

  //For custom dropdown
    $('.custom-select-form select.form-control').each(function(){
        $(this).after('<input class="required custom-dropdown" type="text" value="' + $(this).find('option:nth-child(1)').text() + '"><ul class="custom-option"></ul>');
    });

    $('.custom-select-form select.form-control option').each(function(){
      $(this).parent().siblings('.custom-option').append('<li value="' + $(this).val() + '"><div><img src="img/card-img-4.png"></div><div class="info"><span class="title">KTC</span>'+$(this).text()+'</div></li>');
    });

    $('.custom-option > li:nth-child(1)').addClass('active');

    $(".custom-dropdown").on('click touch', function () {
        $(this).siblings('ul').addClass('active');
        $("body").on('click touch', function () {
            $('.custom-dropdown + ul').removeClass('active');
        });
        return false;
    });

    $(".custom-dropdown").keypress(function(e) {
        e.preventDefault();
    });
    $(".custom-dropdown").keydown( function(e){  
      if( e.which == 8){   
        e.preventDefault();  
        return false;   
      } 
    }); 

    $(".type-or-selected .custom-dropdown").on('click touch', function () {
      if( $(this).val() == $(this).siblings('select').find('option:nth-child(1)').text()){ 
        $(this).val('');
        return true;
      }
    });
    $(".type-or-selected .custom-dropdown").focusout(function() {
      if( $(this).val().length == 0) { 
        var defaultText = $(this).siblings('select').find('option:nth-child(1)').text();
        $(this).val(defaultText);
        return true;
      }
    });
    $('.type-or-selected .custom-dropdown').unbind('keypress');
    $('.type-or-selected .custom-dropdown').unbind('keydown');
    $('.type-or-selected .custom-dropdown').keydown( function(e){  
        if($(this).hasClass("byClicked")) {
            if(e.which == 8){   
                $(this).val('');
                $(this).removeClass("byClicked");
                return true;
            } 
        }
        $(this).removeClass("byClicked");
    });

    $(".custom-dropdown + ul li").on('click touch', function () {
      var dropdownText = $(this).html();
      $(this).addClass('active');
      $(this).siblings().removeClass('active');
      $(this).parent().parent().find('.custom-dropdown').val(dropdownText).addClass('byClicked');
      $(this).parent().removeClass('active');
    });

    $("body").on('click touch', function () {
      $('.before-dropdown').removeClass('text-focus');
    });
    $(".custom-dropdown").on('click touch', function () {
      $(this).siblings('.before-dropdown').addClass('text-focus');
    });



