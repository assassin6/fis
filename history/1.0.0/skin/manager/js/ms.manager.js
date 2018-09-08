<<<<<<< HEAD
ms.manager = {
    initMenu: function(e) {
        $("#ms-menu-parent-tmpl").tmpl(e).appendTo(".ms-menu"), $(".ms-menu-parent").each(function(n) {
            var t = new Array;
            for (i = 0; i < e.length; i++) e[i].modelModelId == $(this).data("model-id") && t.push(e[i]);
            $("#ms-menu-child-tmpl").tmpl(t).appendTo($(this).find("ul:first"))
        }), 
        $('[data-toggle="tooltip"]').tooltip();
        $("body").delegate('.ms-menu-parent > div', 'click', function(){
            if ($(this).siblings(".ms-menu-child").hasClass("openMenuChild")) {
                $(this).removeClass("nav-title");
                $(this).addClass("ms-menu-parent-header");  
                $(this).siblings(".ms-menu-child").slideUp();
                $(this).siblings(".ms-menu-child").removeClass("openMenuChild");              

            } else {
                $(".ms-menu-parent").children('div').removeClass("nav-title");
                $(".ms-menu-parent").children('div').addClass("ms-menu-parent-header");
                $(".ms-menu-child").slideUp();
                $(".ms-menu-child").removeClass("openMenuChild");   
                $(this).addClass("nav-title");
                $(this).removeClass("ms-menu-parent-header");
                $(this).siblings(".ms-menu-child").slideDown();
                $(this).siblings(".ms-menu-child").addClass("openMenuChild");
                $(this).siblings(".ms-menu-child > li").click(function(){
                    $(this).siblings(".ms-menu-child").show();
                    $(".ms-menu-parent").siblings(".ms-menu-child > li >a").css("color","#e4e4e4")
                    $(this).siblings(".ms-menu-child > li > a").css("color","#1CAF9A")
                })     
                //$(".ms-menu-child").slideToggle();
            } 
        });



    }
};

$(function(){

    $("body").delegate('.ms-menu-parent', 'mouseover', function(){
        $(this).children('div').addClass("nav-title");
        $(this).children('div').removeClass("ms-menu-parent-header")
    });
    $("body").delegate('.ms-menu-parent', 'mouseout', function(){
        if ($(this).children(".ms-menu-child").hasClass("openMenuChild")){
            $(this).children('div').addClass("nav-title");
            $(this).children('div').removeClass("ms-menu-parent-header")               
        }else{
            $(this).children('div').removeClass("nav-title");
            $(this).children('div').addClass("ms-menu-parent-header")
        }
    });

    /*提示*/
    $('[data-toggle="tooltip"]').tooltip();
});


=======
ms.manager = {
    initMenu: function(e) {
        $("#ms-menu-parent-tmpl").tmpl(e).appendTo(".ms-menu"), $(".ms-menu-parent").each(function(n) {
            var t = new Array;
            for (i = 0; i < e.length; i++) e[i].modelModelId == $(this).data("model-id") && t.push(e[i]);
            $("#ms-menu-child-tmpl").tmpl(t).appendTo($(this).find("ul:first"))
        }), 
        $('[data-toggle="tooltip"]').tooltip();
        $("body").delegate('.ms-menu-parent > div', 'click', function(){
            if ($(this).siblings(".ms-menu-child").hasClass("openMenuChild")) {
                $(this).removeClass("nav-title");
                $(this).addClass("ms-menu-parent-header");  
                $(this).siblings(".ms-menu-child").slideUp();
                $(this).siblings(".ms-menu-child").removeClass("openMenuChild");              

            } else {
                $(".ms-menu-parent").children('div').removeClass("nav-title");
                $(".ms-menu-parent").children('div').addClass("ms-menu-parent-header");
                $(".ms-menu-child").slideUp();
                $(".ms-menu-child").removeClass("openMenuChild");   
                $(this).addClass("nav-title");
                $(this).removeClass("ms-menu-parent-header");
                $(this).siblings(".ms-menu-child").slideDown();
                $(this).siblings(".ms-menu-child").addClass("openMenuChild");
                $(this).siblings(".ms-menu-child > li").click(function(){
                    $(this).siblings(".ms-menu-child").show();
                    $(".ms-menu-parent").siblings(".ms-menu-child > li >a").css("color","#e4e4e4")
                    $(this).siblings(".ms-menu-child > li > a").css("color","#1CAF9A")
                })     
                //$(".ms-menu-child").slideToggle();
            } 
        });



    }
};

$(function(){

    $("body").delegate('.ms-menu-parent', 'mouseover', function(){
        $(this).children('div').addClass("nav-title");
        $(this).children('div').removeClass("ms-menu-parent-header")
    });
    $("body").delegate('.ms-menu-parent', 'mouseout', function(){
        if ($(this).children(".ms-menu-child").hasClass("openMenuChild")){
            $(this).children('div').addClass("nav-title");
            $(this).children('div').removeClass("ms-menu-parent-header")               
        }else{
            $(this).children('div').removeClass("nav-title");
            $(this).children('div').addClass("ms-menu-parent-header")
        }
    });

    /*提示*/
    $('[data-toggle="tooltip"]').tooltip();
});


>>>>>>> commit
