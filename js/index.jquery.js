$( document ).ready(function()
{
    //开始咯
    console.log( "Start!" );

    //一些公共变量
    window.my_config =
    {
        menu_num : $("#menu").children(".item").length,
        menu_width : $("#menu").width(),
        menu_item_width : $("#menu").width() / $("#menu").children(".item").length,
        bingo_game_fav: false
    };


    let menu_focus_width = $("#menu .bgc").width();

    //console.log(menu_item_width);
    //$("#page_bingo").load("bingo.html");

    //初始化页面
    init_page();

    //绑定菜单按钮点击事件
    $("#menu .item").on('click',function(){
        console.log( $(this).index() );
        move_bgc(this);
        swich_menu_style(this);
        select_page(this);
    });

    //活动页面特殊处理
    $("#page_promo").find("div.close").on('click',function(){
        $("#page_promo").hide();
        init_page();
    });

    //首页公告跑马灯
    $("#marquee").marquee();

    //延时新闻列表淡入特效
    $("#page_news .news_list .list").each(function(){
        let $index = $(this).index();
        $("#page_news .news_list .list").eq($index).find("span").css("animation-delay",100*$index + "ms");
    });

    //Bingo游戏列表淡入特效
    $("#page_bingo .all_games ul li").each(function(){
        let $index = $(this).index();
        $("#page_bingo .all_games li").eq($index).find("span.pic").css("animation-delay",100*$index + "ms");
    });

    //bingo主页bingo游戏列表加入收藏相关操作动画
    $("#page_bingo").find("b").on('click',function()
    {
        //判断是否已经收藏
        if(!my_config.bingo_game_fav)
        {
            $(this).text("♥");
            my_config.bingo_game_fav = true;
        }
        else
        {
            $(this).text("♡");
            my_config.bingo_game_fav = false;
        }

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


});

/**
 * 初始化页面
 */
function init_page() {
    swich_menu_style($("#menu .item").eq(0));
    move_bgc($("#menu .item").eq(0));
    select_page($("#menu .item").eq(0));
}

/**
 * 移动菜单焦点图形
 * @param obj
 */
function move_bgc(obj) {
    console.log($(".bgc").width());
    let coordinate = $(obj).index()* my_config.menu_item_width - my_config.menu_item_width;
    $(".bgc").animate({left: coordinate + 'px'}, 1000, 'easeOutBounce',function(){ $(".bgc").removeClass("shadow_change"); });
    $(".bgc").addClass("shadow_change");
}

/**
 * 切换菜单样式
 * @param obj
 */
function swich_menu_style(obj){
    $(obj).addClass("focus");
    $(obj).siblings().removeClass("focus");
    $(obj).children().addClass("focus");
    $(obj).siblings().children().removeClass("focus");
}

/**
 * 选择切换页面
 * @param obj
 */
function select_page(obj) {
    console.log($(obj).children(".ico").attr("name"));
    let $name = $(obj).children(".ico").attr("name");
    $("#wrap").find("#page_"+ $name).show();
    $("#wrap").find("#page_"+ $name).siblings().hide();
}



