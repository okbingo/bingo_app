$( document ).ready(function()
{
    //开始咯
    console.log( "Start!" );
    $.cookie("ddd","123");


    //初始化页面
    let $index_page = 0

    $("#page_home").home();
    $("#page_bingo").game();
    $("#page_news").news();
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

    //初始化页面
    init_page($index_page);

    //初始化图标
    menu_svg_ico($index_page);

    //绑定菜单按钮点击事件
    $("#menu").find(".item").on('click',function()
    {
        swich_menu_style(this);
        select_page(this);

        $(this).siblings().each(function(index)
        {
            animation[index].destroy();
            lottie(index,"normal");
        });

        animation[$(this).index()-1].destroy();
        lottie($(this).index()-1,"focus");
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

    $("#menu").find(".item").each(function(index)
    {
        //lottie(index,"focus");
    });




});


let animation = [];
let $page_name = ['home','bingo','promo','news','my'];

/**
 * 初始化页面
 */
function init_page(index)
{
    swich_menu_style($("#menu .item").eq(index));
    select_page($("#menu .item").eq(index));


}

/**
 * 菜单ico
 * @param index
 */
function menu_svg_ico(index)
{
    let i = 0;
    let $type = "normal";
    while (i<5)
    {
        if(i === index){$type = "focus"}else{$type = "normal"}
        lottie(i,$type);
        i++;
    }
}

/**
 * 切换菜单样式
 * @param obj
 */
function swich_menu_style(obj)
{
    //菜单文本样式
    $(obj).addClass("focus");
    $(obj).siblings().removeClass("focus");
    $(obj).children().addClass("focus");
    $(obj).siblings().children().removeClass("focus");

    //移动菜单游标
    let coordinate = $(obj).index()* my_config.menu_item_width - my_config.menu_item_width;
    $(".bgc").animate({left: coordinate + 'px'}, 1000, 'easeOutBounce',function(){ $(".bgc").removeClass("shadow_change"); });
    $(".bgc").addClass("shadow_change");
}


/**
 * 加载Lottie图标
 * @param index
 * @param status
 */
function lottie(index,status)
{
    let $index = index;
    let $path = status;

    let $container = $("#menu").find("span." + $page_name[$index])[0];

    if (window.bodymovin)
    {
        animation[$index] = window.bodymovin.loadAnimation
        ({
            container: $container,
            renderer: 'svg',
            loop: false,
            autoplay: true,
            path: "lottie/"+ $path +"/"+ $page_name[$index] +".json",
        });
    }
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



