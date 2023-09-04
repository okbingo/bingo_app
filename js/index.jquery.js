$( document ).ready(function()
{
    //开始咯
    console.log( "Start!" );

    $("#page_home").home();
    $("#page_news").news();
    $("#page_bingo").game();
    $("#page_my").my();

    //一些公共变量
    let $bingo_game_fav = [];
    let $menu = $("#menu");
    window.my_config =
    {
        menu_num : $menu.children(".item").length,
        menu_width : $menu.width(),
        menu_item_width : $menu.width() / $menu.children(".item").length,
        bingo_game_fav: $bingo_game_fav,
        //data_domain: 'http://localhost:8888/',
        data_domain: 'https://okbingo-e2222cbc833d.herokuapp.com/',
        data_domain_path:'/public/index.php'
    };

    //swich_banner(0);
    //console.log(menu_item_width);
    //$("#page_bingo").load("bingo.html");

    //初始化页面
    init_page(4);

    //绑定菜单按钮点击事件
    $("#menu .item").on('click',function(){
        //console.log( $(this).index() );
        move_bgc(this);
        swich_menu_style(this);
        select_page(this);
    });

    //活动页面返回按钮特殊处理
    $("#page_promo").find("div.close").on('click',function(){
        $("#page_promo").hide();
        init_page(0);
    });



    //Bingo游戏列表淡入特效
    $("#page_bingo .all_games ul li").each(function(){
        let $index = $(this).index();
        $("#page_bingo .all_games li").eq($index).find("span.pic").css("animation-delay",100*$index + "ms");
    });

});




/**
 * 初始化页面
 */
function init_page(index)
{
    swich_menu_style($("#menu .item").eq(index));
    move_bgc($("#menu .item").eq(index));
    select_page($("#menu .item").eq(index));
}


/**
 * 移动菜单焦点图形
 * @param obj
 */
function move_bgc(obj) {
    //console.log($(".bgc").width());
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
    //console.log($(obj).children(".ico").attr("name"));
    let $name = $(obj).children(".ico").attr("name");
    $("#wrap").find("#page_"+ $name).show();
    $("#wrap").find("#page_"+ $name).siblings().hide();
}



