(function ($)
{
    $.fn.carousel = function (options)
    {
        //声明默认配置项
        let defaultSet =
        {
            content: "#page_home .banner",
            time: 500,
            keep: 3000,
            num: 1
        };

        //合并用户的配置项
        let setting = $.extend(defaultSet, options || {});
        let intervalId;
        let index = 0;

        return this.each(function()
        {
            //console.log(setting.num);

            buildHTML(setting.num);

            //句柄点击事件
            $(setting.content + " ul.page li").on('click',function()
            {
                swich_banner($(this).index());
            });

            //自动播放
            intervalId = setInterval(function()
            {
                swich_banner(index);

                if(index > 4)
                {
                    index = 0;
                }
            }, setting.keep);

        });

        /**
         * 轮播切换函数
         * @param i
         */
        function swich_banner(i)
        {
            index = i
            $(setting.content + " ul.pic li").each(function()
            {
                if(index === $(this).index())
                {
                    //console.log($(this).index());
                    $(this).hide().fadeToggle(setting.time);
                    $(this).siblings().show().fadeToggle(setting.time);
                    $(this).parent().parent().find(".page li").eq(index).addClass("focus");
                    $(this).parent().parent().find(".page li").eq(index).siblings().removeClass("focus");
                }
            });
            index++;
        }

        /**
         * 构建page翻页
         * @param i
         */
        function buildHTML(i)
        {
            for (let j=0; j<i; j++)
            {
                $(setting.content).find(".page").append("<li></li>");
            }
            $(setting.content).find(".page li").first().addClass("focus");
        }

    };
})(jQuery);