(function (document, $, undefined) {
    $.fn.sm_select = function (options) {
        var defaults = $.extend({
            input_text: 'Select option...'
        }, options);
        return this.each(function (e) {
            $(this).select2(options);
            var select_state;
            var drop_down;
            var obj = $(this);
            $(this).on('select2:open', function (e) {
                drop_down = $('body>.select2-container .select2-dropdown');
                drop_down.find('.select2-search__field').attr('placeholder', (($(this).attr('placeholder') != undefined) ?
                    $(this).attr('placeholder') : defaults.input_text));
                drop_down.hide();
                setTimeout(function () {
                    var inputHeight = obj.next().offset().top;
                    var height = obj.next().height();
                    var dropHeight = parseFloat($('body>.select2-container').css('top'));
                    drop_down.parent().css('top', dropHeight + height * ((inputHeight < dropHeight) ? -1 : 1) + 'px');
                    drop_down.css('opacity', 0).slideDown(300, 'easeOutCubic', function () {
                        drop_down.find('.select2-search__field').focus();
                    }).animate(
                        {opacity: 1},
                        {queue: false, duration: 300}
                    )
                }, 10);
                select_state = true;
            });
            $(this).on('select2:closing', function (e) {
                if (select_state) {
                    e.preventDefault();
                    drop_down = $('body>.select2-container .select2-dropdown');
                    drop_down.slideUp(300, 'easeOutCubic', function () {
                        obj.select2('close');
                    }).animate(
                        {opacity: 0},
                        {queue: false, duration: 300, easing: 'easeOutSine'}
                    );
                    select_state = false;
                }
            });
        });
    };
})(document, jQuery);