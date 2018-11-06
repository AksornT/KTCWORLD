var airportData = [
    "Bangkok [BKK] - Thailand",
    "Chiang Mai [CNX] - Thailand",
    "Chiang Rai [CEI] - Thailand",
    "Hat Yai [HDY] - Thailand",
    "Khon Kaen [KKC] - Thailand",
    "Krabi [KBV] - Thailand",
    "Lampang [LPT] - Thailand",
    "Mae Hong Son [HGN] - Thailand",
    "Narathiwat [NAW] - Thailand",
    "Phitsanulok [PHS] - Thailand",
    "Phuket [HKT] - Thailand",
    "Koh Samui [USM] - Thailand",
    "Sukhothai [THS] - Thailand",
    "Surat Thani [URT] - Thailand",
    "Trang [TST] - Thailand",
    "Ubon Ratchathani [UBP] - Thailand",
    "Udon Thani [UTH] - Thailand",
    "Utapao [UTP] - Thailand"
  ]

$(document).ready(function() {

    /* FORM TOGGLE */
    $('#form-flight-toggle').click(function(e){
        e.stopPropagation();
        $(this).toggleClass('active');
        $('.form-flight').toggleClass('f-collapse');

        if($('.form-flight').hasClass('f-collapse')){
            $('.hero-panel').removeClass('darken');
        }
        else{
            $('.hero-panel').addClass('darken');
        }
    });

    $('#tab-flight').click(function(e){
        if($('.form-flight').hasClass('f-collapse')){
            $('#form-flight-toggle').trigger('click');
        }
    });

    $('.nav-flight .nav-link').click(function(){
        if($(this).attr('data-val') == 'return'){
            $('.form-flight.f-one-city').show();
            $('.form-flight.f-multi-city').hide();
            $('.form-flight').find('.disable-on-oneway').removeClass('disabled');
            $('.form-flight').find('#returnDate').addClass('required');
        }
        else if($(this).attr('data-val') == 'oneway'){
            $('.form-flight.f-one-city').show();
            $('.form-flight.f-multi-city').hide();
            $('.form-flight').find('.disable-on-oneway').addClass('disabled');
            $('.form-flight').find('#returnDate').removeClass('required').val('');
        }
        else if($(this).attr('data-val') == 'multi'){
            $('.form-flight.f-one-city').hide();
            $('.form-flight.f-multi-city').show();
        }
    });

    /* INPUT QTY */
    $('.input-qty .plus').click(function(e){
        e.preventDefault();
        var currentVal = parseInt($(this).siblings('input').val());   
        var maxVal = parseInt($(this).siblings('input').attr('max'));
        if(maxVal != null && currentVal >= maxVal){
	        return false;
        }
        if (!isNaN(currentVal)) {
            $(this).prev().val(currentVal + 1).trigger('change');
            var input = $(this).parents('.input-ico').find('.input-people-picker');
            var popover = $(this).parents('.people-picker-popover');
            input.val( "ผู้ใหญ่ " + popover.find('.p-adult').val() + ", เด็ก " + popover.find('.p-child').val() + ", ทารก " + popover.find('.p-infant').val() );
        }
    });
    
    $('.input-qty .minus').click(function(e) {
        e.preventDefault();
        var currentVal = parseInt($(this).siblings('input').val());   
        var minVal = parseInt($(this).siblings('input').attr('min'));
        if(minVal != null && currentVal <= minVal){
	        return false;
        }
        if (!isNaN(currentVal)) {
            $(this).siblings('input').val(currentVal - 1).trigger('change');
            var input = $(this).parents('.input-ico').find('.input-people-picker');
            var popover = $(this).parents('.people-picker-popover');
            input.val( "ผู้ใหญ่ " + popover.find('.p-adult').val() + ", เด็ก " + popover.find('.p-child').val() + ", ทารก " + popover.find('.p-infant').val() );
        }
    });

    $('.input-qty input').change(function(e) {
        var currentVal = parseInt($(this).val());   
        var maxVal = parseInt($(this).attr('max'));
        var minVal = parseInt($(this).attr('min'));
        $(this).siblings('a').removeClass('disabled');
        if(maxVal != null && currentVal >= maxVal){
            $(this).siblings('a.plus').addClass('disabled');
        }
        if(minVal != null && currentVal <= minVal){
            $(this).siblings('a.minus').addClass('disabled');
        }
    });    

    $('.input-qty input').trigger('change');

    /* PEOPLE NUMBER PICKER */
    $('.form-flight .input-people-picker').focus(function(){
        $(this).siblings('.people-picker-popover').show();
    });    

    $('.form-flight .people-picker-popover button').click(function(e){
        e.preventDefault();
        e.stopPropagation();
        $(this).parents('.people-picker-popover').hide();
    });

    $(document).mouseup(function(e){
        var container = $('.form-flight .input-people');
        // if the target of the click isn't the container nor a descendant of the container
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            $('.people-picker-popover').hide();
        }
    });

    /* FORM INPUT STATE */
    $('.form-flight input').focus(function(){
        $(this).parents('.input-ico').addClass('focus');
    }).blur(function(){
        $(this).parents('.input-ico').removeClass('focus');
    });

    $('.form-flight input').keyup(function(){
        $(this).trigger('change');
    })    

    $('.form-flight input').change(function(){
        if($(this).val().length > 0){
            $(this).parents('.input-ico').addClass('filled');
        }
        else{
            $(this).parents('.input-ico').removeClass('filled');
        }

        if($('#originAirport').val().length > 0 && $('#destinationAirport').val().length > 0){
            $('.form-flight .swap-btn').show();
        }
        else{
            $('.form-flight .swap-btn').hide();
        }

        //Check if all required input has filled
        var filledAll = true;
        var form = $(this).parents('form');
        form.find('.required').each(function(){
            if($(this).val().length <= 0){
                filledAll = false;
            }    
        })
        if(filledAll) {
			form.find('.btn-submit-form').removeClass('disabled');
		}
		else {
			form.find('.btn-submit-form').addClass('disabled');
		}
    });

    /* SWAP BTN */
    $('.form-flight .swap-btn').click(function(e){
        e.preventDefault();
        var ori = $('#originAirport').val();
        var des = $('#destinationAirport').val();
        $('#originAirport').val(des);
        $('#destinationAirport').val(ori);
    });

    /* MULTI CITY ROUTE TOGGLE */
    $('.f-multi-city .add-route-btn').click(function(){
        var currentRoute = parseInt($('.f-multi-city').attr('data-route'));
        if($(window).width() > 768){
            currentRoute += 2;
        }else{
            currentRoute += 1;
        }
        if(currentRoute > 4){ currentRoute = 4; }

        if(currentRoute == 3){
            $('.f-multi-city').addClass('view-route-3').removeClass('view-route-4');
        }
        else if(currentRoute == 4){
            $('.f-multi-city').removeClass('view-route-3').addClass('view-route-4');
        }
        else{
            $('.f-multi-city').removeClass('view-route-3').removeClass('view-route-4');
        }
        $('.f-multi-city').attr('data-route',currentRoute);
    });

    $('.f-multi-city .delete-route-btn').click(function(){
        var currentRoute = parseInt($('.f-multi-city').attr('data-route'));

        if($(this).attr('data-delete') == '3'){
            if(currentRoute == 4){
                // Copy value from route 4 to 3 before hide row
                $('.form-flight .third-route .input-origin input').val($('.form-flight .fourth-route .input-origin input').val());
                $('.form-flight .third-route .input-destination input').val($('.form-flight .fourth-route .input-destination input').val());
                $('.form-flight .third-route .input-date input').val($('.form-flight .fourth-route .input-date input').val());
                $('.form-flight .fourth-route').find('input').val('');
                $('.f-multi-city').addClass('view-route-3').removeClass('view-route-4');
            }else{
                $('.form-flight .third-route').find('input').val('');
                $('.f-multi-city').removeClass('view-route-3');
            }
        }
        else if($(this).attr('data-delete') == '4'){
            $('.form-flight .fourth-route').find('input').val('');
            $('.f-multi-city').addClass('view-route-3').removeClass('view-route-4');                               
        }
        $('.f-multi-city').attr('data-route',currentRoute-1);
    });


    /* JQUERY UI */
    /* */
    var autocomplete_option = {
        minLength: 0,
        source: 'data-airport.php',
        //source: airportData,
        appendTo: '.f-one-city .box-airport-autocomplete',
        position: { my:'left top+20', at:'left bottom' , of:'.f-one-city .box-airport-autocomplete', collision: 'none' },
        minLength: 0,
        change: function(event, ui) {
            if (ui.item == null) {
                $(this).val('').trigger('change');
            }
        },
        search: function (e, ui) {
            var inputbox = this;
            $(this).parents('.form-flight').find('.box-airport-autocomplete').show();
            $(this).parents('.form-flight').find('.box-airport-autocomplete .loading').show();
            $(this).parents('.form-flight').find('.box-airport-autocomplete').position({ 
	            my:'left top+20', at:'left bottom' , of:inputbox , collision: 'none'
	           }).stop(true,true);
        },
        response: function (e, ui) {
            $(this).parents('.form-flight').find('.box-airport-autocomplete .loading').hide();
            if (ui.content.length === 0) {
                $(this).parents('.form-flight').find('.box-airport-autocomplete').hide();
            }
        },
        close: function (e, ui) {
            $(this).parents('.form-flight').find('.box-airport-autocomplete').hide();
        },
        select: function(e, ui) {
            e.preventDefault();
            $(this).val(ui.item.label).trigger('change');
        },
        create: function() {
            $(this).data('ui-autocomplete')._renderItem = function (ul, item) {
                var name = item.label.substring(0, item.label.indexOf('['));
                var meta = item.label.substring(item.label.indexOf('['));
                return $('<li class="ui-menu-item"></li>').data('item.autocomplete', item ).append('<b>'+name +'</b> '+meta).appendTo(ul);
            };
        }
    };

    $('.form-flight.f-one-city .input-airport-picker').autocomplete(autocomplete_option);

    autocomplete_option.appendTo =  '.f-multi-city .box-airport-autocomplete';
    autocomplete_option.position =  '.f-multi-city .box-multi-autocomplete';

    $('.form-flight.f-multi-city .input-airport-picker').autocomplete(autocomplete_option);


    $('.form-flight .input-select-seat').autocomplete({
        source: ['ชั้นประหยัด', 'ชั้นประหยัด พรีเมี่ยม', 'ชั้นธุรกิจ', 'ชั้นหนึ่ง'],
        minLength: 0,
        position: { my: "right+0 top+20", at:'right bottom' },
        classes: { 
            'ui-autocomplete': 'form-bubble mobile-align-right',
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
    
    var moved = false;
    var datepickerNumMonth = 2;

    if($(window).width() < 768){
        datepickerNumMonth = 1;
    }

    $('.form-flight .input-date-picker').datepicker({
        numberOfMonths: datepickerNumMonth,
        minDate: 4,
        position: { my: 'left+0 top+20' , collision: 'none'},
        beforeShow: function() {
	        var target = $(this)
	        if(!moved){
	        	$('html, body').stop().animate({scrollTop:$(this).offset().top - $('#menu-world').height() - 80}, 300, function(){
		        	moved = true;
		        	target.datepicker('show');
	        	});
	        	return false;
	        }else{
		        moved = false;
	        }
            $('#ui-datepicker-div').addClass('form-bubble');
            setTimeout(function () {
                $('#ui-datepicker-div').append('<p class="warning">หากต้องการทำการจองในวันดังกล่าว <br class="rpsbr">กรุณาติดต่อ KTC World Travel Service <br class="rpsbr">โทร. 02 123 5050</p>');
            }, 80);
        },
        onChangeMonthYear: function() {
            setTimeout(function () {
                $('#ui-datepicker-div').append('<p class="warning">หากต้องการทำการจองในวันดังกล่าว <br class="rpsbr">กรุณาติดต่อ KTC World Travel Service <br class="rpsbr">โทร. 02 123 5050</p>');
            }, 80);
        },
        beforeShowDay: function(date) { 
            if(typeof $(this).attr('data-mark') !== typeof undefined && $(this).attr('data-mark') !== false){
                var dateArr = $(this).attr('data-mark').split('/');
                var mark = new Date(dateArr[2],dateArr[1]-1,dateArr[0]);
                if (mark.toString() == date.toString()) { 
                    return [true, 'ui-datepicker-mark', ''];
                }
            }
            for (var i = 1; i<=3; i++) {
                var today = new Date(new Date().setHours(0,0,0,0));
                var wDate = new Date(today.getTime() + (24 * 60 * 60 * 1000 * i));
                if (wDate.toString() == date.toString()) { 
                    return [true, 'ui-datepicker-warning', ''];
                }
            }
            return [true, ''];
        },
        onClose: function(dateText, inst) {  
            moved = false;
            $(this).trigger('change');
            if($(this).attr('id') == 'departureDate' && dateText.length > 0 && $('#returnDate').hasClass('required')){
                $('#returnDate').attr('data-mark', dateText).datepicker('refresh').datepicker('show');
            }
        }
    });

});

$(window).resize(function() {

    if($(window).width() < 768){
        $('.form-flight .input-date-picker').datepicker( "option", "numberOfMonths", 1 );
    }
    else{
        $('.form-flight .input-date-picker').datepicker( "option", "numberOfMonths", 2 );
    }

});