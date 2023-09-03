(function ($)
{
    $.fn.news = function (options)
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
        });


        /**
         * 获取news_list数据
         */
        function get_news_list()
        {
            $.ajax
            ({
                url:setting.data_domain + setting.data_domain_path + "/news/get_news_list",
                type:"get",
                dataType:"json",
                success: function(data)
                {
                    console.log(data);
                    buildHTML(data);
                },
                error: function(){},
            })
        }

        /**
         * 构建page翻页
         * @param i
         */
        function buildHTML(data)
        {
            let news_list_content = "#page_news .news_list ul li.list";

            let i = 0;

            do {
                $(news_list_content).eq(i).find("img").attr("src",JSON.parse(data[i].info).imgur);
                $(news_list_content).eq(i).find("b.tit").text(data[i].name);
                $(news_list_content).first().clone().appendTo($(news_list_content).parent());
                $(news_list_content).eq(i).find("span").css("animation-delay",100*i + "ms");
                i++;
            }
            while (i < data.length);

            //隐藏模板
            $(news_list_content).last().hide();

        }

    };
})(jQuery);