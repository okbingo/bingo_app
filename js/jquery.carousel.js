(function ($)
{
    $.fn.carousel = function (options)
    {
        //声明默认配置项
        let defaultSet =
        {
            content: "#page_home .banner",
            time: 500,
        };

        //合并用户的配置项
        let setting = $.extend(defaultSet, options || {});

        return this.each(function()
        {

            $(setting.content + " ul.page li").on('click',function()
            {
                console.log($(this).index());
                swich_banner($(this).index());
            });

        });

        function swich_banner(index)
        {
            let $index = index
            $(setting.content + " ul.pic li").each(function()
            {
                console.log($(this).index());
                if($index === $(this).index())
                {
                    $(this).hide().fadeToggle(setting.time);
                    $(this).siblings().show().fadeToggle(setting.time);
                    $(this).parent().parent().find(".page li").eq($index).addClass("focus");
                    $(this).parent().parent().find(".page li").eq($index).siblings().removeClass("focus");
                }
            });
        }

        function aaa(num)
        {
            console.log(setting.zIndex + num);
        }

    };
})(jQuery);