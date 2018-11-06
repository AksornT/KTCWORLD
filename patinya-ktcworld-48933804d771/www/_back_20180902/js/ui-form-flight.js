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
            $('.featured-banner-row').removeClass('darken');
        }
        else{
            $('.featured-banner-row').addClass('darken');
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
            $('.form-flight').find('#returnDate').removeClass('required').removeAttr('data-selected').val('');
            $('.form-flight').find('#departureDate').removeAttr('data-mark');
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
        var input = $(this).parents('.input-ico').find('.input-people-picker');
        var popover = $(this).parents('.people-picker-popover');
        var selectArr = []; 
        popover.find('input[type=number]').each(function(index){
            if($(this).val() > 0){
                selectArr.push($(this).attr('title') + ' ' + $(this).val());
            }
        });
        input.val(selectArr.join(', '));
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

    $('.form-flight input').change(function(){
        if($(this).val().length > 0){
            $(this).parents('.input-ico').addClass('filled');
        }
        else{
            $(this).parents('.input-ico').removeClass('filled');
        }

        if($('#originAirport_0').val().length > 0 && $('#destinationAirport_0').val().length > 0){
            $('.form-flight .swap-btn').show();
        }
        else{
            $('.form-flight .swap-btn').hide();
        }
    });

    /* SWAP BTN */
    $('.form-flight .swap-btn').click(function(e){
        e.preventDefault();
        var ori = $('#originAirport_0').val();
        var des = $('#destinationAirport_0').val();
        $('#originAirport_0').val(des);
        $('#destinationAirport_0').val(ori);
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
            $('.f-multi-city .third-route input').addClass('required');
            $('.f-multi-city .fourth-route input').removeClass('required');
        }
        else if(currentRoute == 4){
            $('.f-multi-city').removeClass('view-route-3').addClass('view-route-4');
            $('.f-multi-city .third-route input').addClass('required');
            $('.f-multi-city .fourth-route input').addClass('required');
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
                $('.f-multi-city .fourth-route input').removeClass('required');
            }else{
                $('.form-flight .third-route').find('input').val('');
                $('.f-multi-city').removeClass('view-route-3');
                $('.f-multi-city .third-route input').removeClass('required');
            }
        }
        else if($(this).attr('data-delete') == '4'){
            $('.form-flight .fourth-route').find('input').val('');
            $('.f-multi-city').addClass('view-route-3').removeClass('view-route-4');        
            $('.f-multi-city .fourth-route input').removeClass('required');                       
        }
        $('.f-multi-city').attr('data-route',currentRoute-1);
    });


    /* JQUERY UI */
    /* */
    var autocomplete_option = {
        minLength: 0,
        //source: 'data-airport.php',
        source: airportData,
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
            var inputID = $(this).attr('id').split('_');
            // Focus siblings input airport if has no value yet
            if(inputID[0] == 'originAirport' && $('#destinationAirport_' + inputID[1]).val().length <= 0){
                setTimeout(function () {
                    $('#destinationAirport_' + inputID[1]).trigger('focus');
                }, 80);
            }
            else if(inputID[0] == 'destinationAirport' && $('#originAirport_' + inputID[1]).val().length <= 0){
                setTimeout(function () {
                    $('#originAirport_' + inputID[1]).trigger('focus');
                }, 80);
            }
            // Copy destination value to next route origin (only on multi-city)
            if($(this).parents('.form-flight').hasClass('f-multi-city')){
                var nextInput = parseInt(inputID[1])+1;
                if(nextInput >= 2 && nextInput <= 4){
                    if(nextInput == 3 && $(this).parents('.form-flight').find('.third-route').is(":hidden")){
                        return false;
                    }
                    else if(nextInput == 4 && $(this).parents('.form-flight').find('.fourth-route').is(":hidden")){
                        return false;
                    }
                    if(inputID[0] == 'destinationAirport'){
                        $('#originAirport_' + nextInput).val(ui.item.label).trigger('change');
                    }
                }
            }
        },
        create: function() {
            $(this).data('ui-autocomplete')._renderItem = function (ul, item) {
                var name = item.label.substring(0, item.label.indexOf('['));
                var meta = item.label.substring(item.label.indexOf('['));
                return $('<li class="ui-menu-item"></li>').data('item.autocomplete', item ).append('<b>'+name +'</b> '+meta).appendTo(ul);
            };
        }
    };

    $('.form-flight.f-one-city .input-airport-picker').autocomplete(autocomplete_option).bind('focus', function(){ 
        $(this).autocomplete('search', ''); 
    });;

    autocomplete_option.appendTo =  '.f-multi-city .box-airport-autocomplete';
    autocomplete_option.position =  '.f-multi-city .box-multi-autocomplete';

    $('.form-flight.f-multi-city .input-airport-picker').autocomplete(autocomplete_option).bind('focus', function(){ 
        $(this).autocomplete('search', ''); 
    });;


    $('.form-flight .input-select-seat').autocomplete({
        source: ['ชั้นประหยัด', 'ชั้นประหยัด พรีเมี่ยม', 'ชั้นธุรกิจ', 'ชั้นหนึ่ง'],
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
    
    var moved = false;
    var datepickerNumMonth = 2;

    var warningDateArr = [];
    for (var i = 0; i<=1; i++) {
        warningDateArr.push(getDateFromToday(i).toString());
    }

    if($(window).width() < 768){
        datepickerNumMonth = 1;
    }

    $('.form-flight .input-date-picker').datepicker({
        numberOfMonths: datepickerNumMonth,
        minDate: 0,
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
            // ALIGN BUBBLE ON MOBILE
            /*if($(this).attr('id') == 'departureDate'){
                $('#ui-datepicker-div').removeClass('mobile-align-right').addClass('mobile-align-left');
            }
            else if($(this).attr('id') == 'returnDate'){
                $('#ui-datepicker-div').removeClass('mobile-align-left').addClass('mobile-align-right');
            }*/
            // ADD WARNING TEXT
            setTimeout(function () {
                $('#ui-datepicker-div').append('<p class="warning">หากต้องการทำการจองตั๋วในวันดังกล่าว <br class="rpsbr">กรุณาติดต่อ KTC World Travel Service <br class="rpsbr">โทร. 02 123 5050</p>');
            }, 80);
        },
        onChangeMonthYear: function() {
            setTimeout(function () {
                $('#ui-datepicker-div').append('<p class="warning">หากต้องการทำการจองตั๋วในวันดังกล่าว <br class="rpsbr">กรุณาติดต่อ KTC World Travel Service <br class="rpsbr">โทร. 02 123 5050</p>');
            }, 80);
        },
        beforeShowDay: function(date) { 
            // MARKED DATE
            if(typeof $(this).attr('data-mark') !== typeof undefined && $(this).attr('data-mark') !== false){
                var mark = getDateFromString($(this).attr('data-mark'));
                if (mark.toString() == date.toString()) { 
                    return [true, 'ui-datepicker-mark', ''];
                }
                // DISABLE ALL DATE UNTIL MARKED ONLY ON RETURN
                if ($(this).attr('id') == 'returnDate' && date < mark) { 
                    var wClass = (jQuery.inArray(date.toString(), warningDateArr) !== -1) ? ' ui-datepicker-warning' : '';
                    return [true, 'ui-datepicker-unselectable' + wClass, ''];
                }
                // DATE RANGE BETWEEN MAKRED AND SELECTED
                if(typeof $(this).attr('data-selected') !== typeof undefined && $(this).attr('data-selected') !== false){
                    var selected = getDateFromString($(this).attr('data-selected'));
                    if(mark < selected){ 
                        var dFrom = mark;
                        var dTo = selected;
                    }
                    else if(mark > selected){ 
                        var dFrom = selected;
                        var dTo = mark;
                    }
                    if(date > dFrom && date < dTo){
                        return [true, 'ui-datepicker-range', ''];
                    }
                }
            }
            // WARNING DATE
            if(jQuery.inArray(date.toString(), warningDateArr) !== -1){
                return [true, ' ui-datepicker-warning', ''];
            }
            return [true, ''];
        },
       onSelect: function(dateText, inst) {  
            var selectedDate = getDateFromString(dateText);
            if(jQuery.inArray(selectedDate.toString(), warningDateArr) !== -1){
                $(this).val('');
                $(inst).datepicker('show');
            }
        },
        onClose: function(dateText, inst) {  
            moved = false;
            $(this).trigger('change');
            $(this).attr('data-selected', dateText).datepicker('refresh');
            // MARKED ONLY ON DEPART / RETURN
            if($(this).attr('id') == 'departureDate' && dateText.length > 0 && $('#returnDate').hasClass('required')){
                $('#returnDate').attr('data-mark', dateText).datepicker('refresh')
                if($('#returnDate').val().length <= 0){ 
                    $('#returnDate').datepicker('show');
                }
            }
            else if($(this).attr('id') == 'returnDate' && dateText.length > 0){
                $('#departureDate').attr('data-mark', dateText).datepicker('refresh');
                if($('#departureDate').val().length <= 0){
                    // SELECT FIRST AVALIABLE DATE (TODAY +4)
                    $('#departureDate').datepicker("setDate", getDateFromToday(2)).datepicker('show');
                }
            }
        }
    });

    $(document).on('mouseover','.ui-datepicker-warning a',function(){
        $('#ui-datepicker-div p.warning').addClass('show')
    });
    $(document).on('mouseout','.ui-datepicker-warning a',function(){
        $('#ui-datepicker-div p.warning').removeClass('show')
    });
    $(document).on('click','.ui-datepicker-warning a',function(e){
        e.stopPropagation();
        e.preventDefault();
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

function getDateFromToday(num){
    var today = new Date(new Date().setHours(0,0,0,0));
    return new Date(today.getTime() + (24 * 60 * 60 * 1000 * num));
}

function getDateFromString(str){
    var dateArr = str.split('/');
    return new Date(dateArr[2],dateArr[1]-1,dateArr[0]);
}