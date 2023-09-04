(function ($)
{
    $.fn.game = function (options)
    {
        let $bingo_game_fav = [];

        //声明默认配置项
        let defaultSet =
        {
            data_domain: 'http://localhost:8888/',
            //data_domain: 'https://okbingo-e2222cbc833d.herokuapp.com/',
            data_domain_path:'/public/index.php',
            bingo_game_fav: $bingo_game_fav
        };

        //合并用户的配置项
        let setting = $.extend(defaultSet, options || {});

        return this.each(function()
        {
            get_game_list();

        });


        /**
         * 获取news_list数据
         */
        function get_game_list()
        {
            $.ajax
            ({
                url:setting.data_domain + setting.data_domain_path + "/game/get_game_list",
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
            let content = "#page_bingo .all_games ul li.list";

            let i = 0;

            do {
                $(content).eq(i).find("img").attr("src",JSON.parse(data[i].info).imgur);
                $(content).eq(i).find(".name").text(data[i].name);
                $(content).first().clone().appendTo($(content).parent());
                $(content).eq(i).find("span").css("animation-delay",100*i + "ms");
                i++;
            }
            while (i < data.length);

            //隐藏模板
            $(content).last().hide();
            click();
        }

        function click()
        {
            //bingo主页bingo游戏列表加入收藏相关操作动画
            $("#page_bingo").find("b.fav").on('click',function()
            {
                let $index = $(this).parent().parent().index()
                //console.log($index);
                //判断是否已经收藏
                if(-1 === $.inArray($index, setting.bingo_game_fav))
                {
                    //当前游戏加入收藏列表
                    setting.bingo_game_fav.push($index);
                    $(this).text("♥");
                }
                else
                {
                    //取消收藏，从收藏列表里删除
                    setting.bingo_game_fav.splice($.inArray($index,setting.bingo_game_fav),1);
                    $(this).text("♡");
                }

                //查看目前收藏的游戏索引
                console.log(setting.bingo_game_fav);

                //克隆一个元素做动画
                let $clone = $(this).clone(true);
                $clone.appendTo($(this));
                $clone.css({
                    "position":"absolute",
                    "margin-left":$clone.width()*-1
                });
                $clone.addClass("moving_zoom_opacity");
                //动画播放完毕删除克隆元素
                $clone.on('animationend', function(){
                    $clone.removeClass("moving_zoom_opacity");
                    $clone.remove();
                });
            });
        }

    };
})(jQuery);