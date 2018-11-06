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

    /* FILTER FORM */
    $('#filter-modal input').change(function(){
        var hasChecked = false;
        $('#filter-modal').find('input').each(function(){
            if($(this).prop('checked')){
                hasChecked=true;
            }
        });
        if(hasChecked){
            $('#filter-modal').find('.submit-filter-btn').removeAttr('disabled');
        }
        else{
            $('#filter-modal').find('.submit-filter-btn').attr('disabled','disabled');
        }
    });

    $('#filter-modal .select-all-btn').click(function(e){
        e.preventDefault();
        e.stopPropagation();
        $('#filter-modal').find('input').prop('checked', true); 
        $('#filter-modal').find('.submit-filter-btn').removeAttr('disabled');
    });

    $('#filter-modal .reset-btn').click(function(e){
        e.preventDefault();
        e.stopPropagation();
        $('#filter-modal').find('input').prop('checked', false); 
        $('#filter-modal').find('.submit-filter-btn').attr('disabled','disabled');
    });

    $('.form-register .input-date-picker').datepicker();

    $('.form-register .input-card-picker').autocomplete({
        source: ['บัตร 1', 'บัตร 2', 'บัตร 3', 'บัตร 4'],
        minLength: 0,
        position: { my: "right+0 top+20", at:'right bottom' },
        classes: { 
            'ui-autocomplete': 'form-bubble',
            'ui-menu': 'list-no-wrap'
        },
        select: function(e, ui) {
            e.preventDefault();
            $(this).val(ui.item.label).trigger('change');
        },
        create: function() {
            $(this).data('ui-autocomplete')._renderItem = function (ul, item) {
                return $('<li class="ui-menu-item"></li>').data('item.autocomplete', item ).append(item.label).appendTo(ul);
            };
        }
    }).bind('focus', function(){ 
        $(this).autocomplete('search', ''); 
    });

    $('.form-register .input-file').click(function(){
        $(this).siblings('input[type=file]').trigger('click');
    });

    $('.form-register input[type=file]').change(function(){
        $(this).siblings('.input-file').val($(this).val());
    });

    $('.form-check-required input').change(function(){
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
			form.find('.btn-submit-form').removeClass('disabled');
		}
		else {
			form.find('.btn-submit-form').addClass('disabled');
		}
    });

    $('.form-check-required input').keyup(function(){
        $(this).trigger('change');
    })    

});
