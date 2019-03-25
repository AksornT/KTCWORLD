var cardData = [
    {
        id: "1",
        label: "1234  56xx  xxxx  1231",
        title: "KTC X VISA SIGNATURE",
        img: "img/card-img-1.png"
    },{
        id: "2",
        label: "1234  56xx  xxxx  1232",
        title: "KTC WORLD REWARD MASTERCARD",
        img: "img/card-img-2.png"
    },{
        id: "3",
        label: "1234  56xx  xxxx  1233",
        title: "KTC X WORLD",
        img: "img/card-img-3.png"
    },{
        id: "4",
        label: "1234  56xx  xxxx  1234",
        title: "KTC X VISA SIGNATURE",
        img: "img/card-img-4.png"
    }
];

$(document).ready(function() {

    $(".to-register").on('click touch', function () {
        $("html, body").animate({ scrollTop: $('.register-wrapper').position().top + $('.site-header').outerHeight(true) }, "slow");
        return false;
    });

    $('.form-register input').focus(function(){
        $(this).parents('.input-ico').addClass('focus');
    }).blur(function(){
        $(this).parents('.input-ico').removeClass('focus');
    });

    $('.form-register input').change(function(){
        if($(this).val().length > 0){
            $(this).parents('.input-ico').addClass('filled');
        }
        else{
            $(this).parents('.input-ico').removeClass('filled');
        }
    });

    $('.form-register .input-date-picker').datepicker({
        maxDate: 0,
    });

    $('.form-register .input-card-picker').autocomplete({
        source: cardData,
        minLength: 0,
        position: { my: "right+0 top+0", at:'right bottom' },
        classes: { 
            'ui-autocomplete': 'form-dropdown',
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
        select: function (e, ui) {
            e.preventDefault();
            $(this).val(ui.item.label).trigger('change');
            $(this).autocomplete('close');
        },
        create: function() {
            $(this).data('ui-autocomplete')._renderItem = function (ul, item) {
                return $('<li class="ui-menu-item ui-card-item"><div><img src="'+item.img+'"></div><div class="info"><span class="title">'+item.title+'</span><span>'+item.label+'</span></div></li>').appendTo(ul);
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

});
