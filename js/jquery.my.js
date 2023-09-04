(function ($)
{
    $.fn.my = function (options)
    {
        //声明默认配置项
        let defaultSet =
        {
            //data_domain: 'http://localhost:8888/',
            data_domain: 'https://okbingo-e2222cbc833d.herokuapp.com/',
            data_domain_path:'/public/index.php'
        };

        //合并用户的配置项
        let setting = $.extend(defaultSet, options || {});

        return this.each(function()
        {
            get_news_list()

            $('#page_my .my_list ul li').mousedown(function(){
                $(this).css("background","rgba(0,0,0,0.03)");
            });

            $('#page_my .my_list ul li').mouseup(function(){
                $(this).css("background","none");
            });
        });


        /**
         * 获取news_list数据
         */
        function get_news_list()
        {
            $('#page_my .my_list ul li span.title').slideUp();

            $('#page_my .my_list ul li span.title').each(function(index)
            {
                $(this).delay(100 * index).slideDown(100);
            });



        }

    };
})(jQuery);