(function ($)
{
    $.fn.home = function (options)
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
            get_banner();
        });

        /**
         * 获取banner数据
         */
        function get_banner()
        {
            $.ajax
            ({
                url:setting.data_domain + setting.data_domain_path + "/index/get_banner",
                type:"get",
                dataType:"json",
                success: function(data)
                {
                    console.log(data);
                    init_banner(data);
                },
                error: function(){},
            })
        }

        /**
         * 初始化banner
         * @param data
         */
        function init_banner(data)
        {
            for (let i=0;i<data.length;i++)
            {
                $("#page_home .banner ul.pic").append("<li><img src='"+ data[i].url +"'/></li>");
            }

            $("#page_home .banner").carousel({ num: data.length });
        }

    };
})(jQuery);