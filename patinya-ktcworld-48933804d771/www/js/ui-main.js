$(document).on('scroll', function() {
    //change header when scroll down.
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

    // STICKY FOOTER BOOKING
    if ($('.sticky-footer-booking').length > 0){
        var scroll = $(this).scrollTop() + $(window).height();
        var trigger = $('#sticky-trigger').position().top + $('.sticky-footer-booking').outerHeight(true) + 130 - $('#menu-mobile-bottom').outerHeight(true);

        if (scroll > trigger) {
            $('.sticky-footer-booking').removeClass('fixed');
        }else{
            $('.sticky-footer-booking').addClass('fixed');
        }
    }

    if ($(".share-btn")[0]){ 
        $(".share-btn").removeClass('active');
    }

});


$(document).ready(function() {
    //for menu mobile
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

    //for switch language
    $(".lang-wrap").on('click touch', function () {
        $(".lang-wrap").toggleClass('active');
    });

    //search-category selected
    $(".subcat + label").on('click touch', function () {
        $("#all-cat").prop('checked', false).checkboxradio('refresh');
    });
    $("#all-cat + label").on('click touch', function () {
        $(".subcat").prop('checked', false).checkboxradio('refresh');
    });


    //for search
    $(".suggess-list").on('click touch', function () {
        $("#fake-result").empty();
        $(this).clone().appendTo("#fake-result");
        var searchtext = $(this).find("p").text();
        $("#search").val(searchtext);
        $("#suggest-box").blur();
    });
    $("#search").on('click touch', function () {
        $("#fake-result").empty();
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

    /* FILTER FORM */
    $('#filter-modal input').change(function(){
        var hasChecked = false;
        var checkedAll = true;
        $('#filter-modal').find('input').each(function(){
            if($(this).prop('checked')){
                hasChecked=true;
            }
            else{
                checkedAll=false;
            }
        });
        if(checkedAll){
            $('#filter-modal').find('.select-all-btn').attr('disabled', 'disabled');
        }
        else{
            $('#filter-modal').find('.select-all-btn').removeAttr('disabled');
        }
        if(hasChecked){
            $('#filter-modal').find('.submit-filter-btn').removeAttr('disabled');
            $('#filter-modal').find('.reset-btn').removeAttr('disabled');
        }
        else{
            $('#filter-modal').find('.submit-filter-btn').attr('disabled','disabled');
            $('#filter-modal').find('.reset-btn').attr('disabled', 'disabled');
        }
    });

    $('#filter-modal .select-all-btn').click(function(e){
        e.preventDefault();
        e.stopPropagation();
        $('#filter-modal').find('input').prop('checked', true).trigger('change'); 
    });

    $('#filter-modal .reset-btn').click(function(e){
        e.preventDefault();
        e.stopPropagation();
        $('#filter-modal').find('input').prop('checked', false).trigger('change'); 
    });

    $('.form-check-required .required').change(function(){
        //Check if all required input has filled
        var filledAll = true;
        var form = $(this).parents('form');
        form.find('.required').each(function(){
            if($(this).is(':checkbox')){
                if(!$(this).prop('checked')){
                    filledAll = false;
                }  
            }
            else{
                if($(this).val().length <= 0){
                    filledAll = false;
                }  
            } 
        });
        if(filledAll) {
            form.find('.btn-submit-form').removeClass('disabled').removeAttr('disabled');
		}
		else {
            form.find('.btn-submit-form').addClass('disabled').attr('disabled', 'disabled');
		}
    });

    $('.form-check-required .required').keyup(function(){
        $(this).trigger('change');
    });  
    
    $(document).on('touch click', '.fav-btn', function(e){
        $(this).toggleClass('active');
    });
    $(document).on('touch click', '.share-btn', function (e) {
        $(this).toggleClass('active');
    });


    // owlCarousel init

    $('.index-slide-member').owlCarousel({
        slideBy: 'page',
        loop: true,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                nav: true,
                margin: 10
            },
            576: {
                items: 2,
                nav: true,
                margin: 20
            }
        }
    });

    $('.index-slide1-full').owlCarousel({
        loop: true,
        items: 1,
        nav: true,
        margin: 10
    });

    $('.index-slide1-default').owlCarousel({
        loop: true,
        dots: false,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                nav: true,
                margin: 10
            },
            576: {
                items: 1,
                nav: true,
                margin: 20
            },
            1000: {
                items: 2,
                nav: true,
                margin: 20
            }
        }
    });

    $('.index-slide2-default').owlCarousel({
        loop: true,
        dots: false,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                nav: true,
                margin: 10
            },
            576: {
                items: 2,
                nav: true,
                margin: 20
            },
            1000: {
                items: 3,
                nav: true,
                margin: 20
            }
        }
    });

    $('.index-slide2-normal').owlCarousel({
        loop: true,
        dots: false,
        responsiveClass: true,
        responsive: {
            0: {
                items: 2,
                nav: true,
                margin: 10
            },
            576: {
                items: 2,
                nav: true,
                margin: 20
            },
            1000: {
                items: 4,
                nav: true,
                margin: 20
            }
        }
    });

    $('.index-slide2-mobile').owlCarousel({
        dots: false,
        responsiveClass: true,
        responsive: {
            0: {
                items: 2,
                nav: true,
                loop: true,
                mouseDrag: true,
                margin: 10
            },
            576: {
                items: 2,
                nav: true,
                loop: true,
                mouseDrag: true,
                margin: 20
            },
            1000: {
                items: 4,
                nav: false,
                loop: false,
                mouseDrag: false,
                margin: 20
            }
        }
    });

    $('.index-slide2-mobile-b').owlCarousel({
        dots: false,
        responsiveClass: true,
        responsive: {
            0: {
                items: 2,
                nav: true,
                loop: true,
                mouseDrag: true,
                margin: 10
            },
            576: {
                items: 2,
                nav: true,
                loop: true,
                mouseDrag: true,
                margin: 20
            },
            1000: {
                items: 3,
                nav: false,
                loop: false,
                mouseDrag: false,
                margin: 20
            }
        }
    });

    $('.index-slide2-mobile-c').owlCarousel({
        dots: false,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                nav: true,
                loop: true,
                mouseDrag: true,
                margin: 10
            },
            576: {
                items: 1,
                nav: true,
                loop: true,
                mouseDrag: true,
                margin: 20
            },
            1000: {
                items: 4,
                nav: false,
                loop: false,
                mouseDrag: false,
                margin: 20
            }
        }
    });

});
