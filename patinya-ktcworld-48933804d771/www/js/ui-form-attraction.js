
$(document).ready(function() {

    /* INPUT QTY - PEOPLE */
    $('.form-attraction .input-qty a').click(function(e){
        e.preventDefault();
        var input = $(this).siblings('input')
        var thisVal = parseInt(input.val());

        if($(this).hasClass('plus')){
            if (!isNaN(thisVal)) {
                input.val(thisVal + 1).trigger('change');
            }
        }
        else{
            if (!isNaN(thisVal)) {
                input.val(thisVal - 1).trigger('change');
            }
        }
    });
    
    $('.form-attraction .input-qty input').change(function(e) {
        var popover = $(this).parents('.people-picker-popover');
        popover.find('a').removeClass('disabled');

        popover.find('input[type=number]').each(function (index) {
            var thisVal = parseInt($(this).val());
            if (thisVal <= 0) {
                $(this).siblings('a.minus').addClass('disabled');
            }
            if (thisVal >= 5) {
                $(this).siblings('a.plus').addClass('disabled');
            }
        });

        var formInput = $(this).parents('.input-ico').find('.input-people-picker');
        var selectArr = []; 
        popover.find('input[type=number]').each(function(index){
            if($(this).val() > 0){
                selectArr.push($(this).attr('title') + ' ' + $(this).val());
            }
        });
        formInput.val(selectArr.join(', ')).trigger('change');
    });    

    $('.form-attraction .input-qty input').trigger('change');

    /* PEOPLE NUMBER PICKER */
    $('.form-attraction .input-people-picker').focus(function(){
        $(this).siblings('.people-picker-popover').show();
    });    

    $('.form-attraction .people-picker-popover button').click(function(e){
        e.preventDefault();
        e.stopPropagation();
        $(this).parents('.people-picker-popover').hide();
    });

    $(document).mouseup(function(e){
        var container = $('.form-attraction .input-people');
        // if the target of the click isn't the container nor a descendant of the container
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            $('.form-attraction .people-picker-popover').hide();
        }
    });

    /* FORM INPUT STATE */
    $('.form-attraction input').focus(function(){
        $(this).parents('.input-ico').addClass('focus');
    }).blur(function(){
        $(this).parents('.input-ico').removeClass('focus');
    });

    $('.form-attraction input').change(function(){
        if($(this).val().length > 0){
            $(this).parents('.input-ico').addClass('filled');
        }
        else{
            $(this).parents('.input-ico').removeClass('filled');
        }
    });

  
    /* JQUERY UI */

    $('.form-attraction .input-select-package').autocomplete({
        source: ['บัตรผ่าน 1 วัน', 'บัตรผ่าน 2 วัน'],
        minLength: 0,
        position: { my: "left top+20", at:'left bottom' },
        classes: { 
            'ui-autocomplete': 'form-bubble',
            'ui-menu': 'list-no-wrap'
        },
        open: function (result) {
            if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
                $(this).autocomplete('widget').off('menufocus hover mouseover');
            }
        },
        close: function (e, ui) {
            if (!navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
                $(this).blur();
            }
        },    
        select: function(e, ui) {
            e.preventDefault();
            $(this).val(ui.item.label).trigger('change');
            $(this).autocomplete('close');
        },
        create: function() {
            $(this).data('ui-autocomplete')._renderItem = function (ul, item) {
                return $('<li class="ui-menu-item"></li>').data('item.autocomplete', item ).append(item.label).appendTo(ul);
            };
        }
    }).bind('click', function () {
        if (!$(this).autocomplete('widget').is(':visible')) {
            $(this).autocomplete('search', '');
        }
    });
    
    var moved = false;
    var datepickerNumMonth = 2;

    if($(window).width() <= 768){
        datepickerNumMonth = 1;
    }

    $('.form-attraction .input-date-picker').datepicker({
        numberOfMonths: datepickerNumMonth,
        minDate: 0,
        position: { my: 'left top+20' , collision: 'none'},
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
        },
        onClose: function (dateText, inst) {
            moved = false;
            $(this).trigger('change');
            $(this).attr('data-selected', dateText).datepicker('refresh');
        }
    });

});

$(window).resize(function() {

    if($(window).width() <= 768){
        $('.form-attraction .input-date-picker').datepicker( "option", "numberOfMonths", 1 );
    }
    else{
        $('.form-attraction .input-date-picker').datepicker( "option", "numberOfMonths", 2 );
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