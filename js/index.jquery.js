$( document ).ready(function() {
    console.log( "Start!" );

    window.my_config =
    {
        menu_num : $("#menu").children(".item").length,
        menu_width : $("#menu").width(),
        menu_item_width : $("#menu").width() / $("#menu").children(".item").length
    };


    let menu_focus_width = $("#menu .bgc").width();

    //console.log(menu_item_width);
    //$("#page_bingo").load("bingo.html");
    init_page();

    $("#menu .item").click(function(){
        console.log( $(this).index() );
        move_bgc(this);
        swich_menu_style(this);
        select_page(this);
    });

    $("#page_promo").find("div.close").click(function(){
        $("#page_promo").hide();
        init_page();
    });


    $("#marquee").marquee();


});

function init_page() {
    swich_menu_style($("#menu .item").eq(0));
    move_bgc($("#menu .item").eq(0));
    select_page($("#menu .item").eq(0));
}

function move_bgc(obj) {
    console.log($(".bgc").width());
    let coordinate = $(obj).index()* my_config.menu_item_width - my_config.menu_item_width;
    $(".bgc").animate({left: coordinate + 'px'}, 1000, 'easeOutBounce',function(){ $(".bgc").removeClass("shadow_change"); });
    $(".bgc").addClass("shadow_change");
}


function swich_menu_style(obj){
    $(obj).addClass("focus");
    $(obj).siblings().removeClass("focus");
    $(obj).children().addClass("focus");
    $(obj).siblings().children().removeClass("focus");
}


function select_page(obj) {
    console.log($(obj).children(".ico").attr("name"));
    let $name = $(obj).children(".ico").attr("name");
    $("#wrap").find("#page_"+ $name).show();
    $("#wrap").find("#page_"+ $name).siblings().hide();
}



