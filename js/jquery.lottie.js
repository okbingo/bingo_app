(function ($)
{
    $.fn.lottie = function (options)
    {
        //声明默认配置项
        let defaultSet =
        {
            name: '#menu span.home',
            action:'play'
        };

        //合并用户的配置项
        let setting = $.extend(defaultSet, options || {});

        return this.each(function()
        {
            play_lottie(setting.name,setting.action);

        });


        /**
         * 获取news_list数据
         */
        function play_lottie(name,action)
        {
            let $json_name = $(name).attr("name");
            let $container = $("#menu span."+$json_name)[0];

            if (window.bodymovin)
            {
                let animation = window.bodymovin.loadAnimation
                ({
                    container: $container,
                    renderer: 'svg',
                    loop: false,
                    autoplay: false,
                    path: "lottie/normal/"+ $json_name +".json",
                });
                if('play' === action)
                {
                    animation.play();
                }
                else if('stop' === action)
                {
                    animation.stop();
                }

            }
        }

    };
})(jQuery);