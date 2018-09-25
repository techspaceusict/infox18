// $(window).load(function(){
// 	$('.loader-section').hide();
// });
// window.onload = function(){
// 	$(".loader-section").hide(); 
// }
// $('body').append('<div class="loader-section"><img class="loader" src="obj/plain-logo1.svg"></div>');
$(window).on('load', function(){
    
    setTimeout(function(){
        $('.sub-containers, .icons').css({display:'inline-block'})

    },500)
    // alert('bing bong');
setTimeout(removeLoader, 800); //wait for page load PLUS two seconds.
});
function removeLoader(){
    $( '.loader-section').fadeOut(500, function() {
    // fadeOut complete. Remove the loading div
    $( '.loader-section' ).remove(); //makes page more lightweight 
});
}
$(function(){

    // anm.on(); //for parallax affect

    if($(window).width()<480){
        // alert('appended')
        $('.timer-wrapper').append('<div class="screen glitch">'+
        '<p class="glitch"></p>'+
        '<div class="clock is-off"><span class="time" data-time=""></span></div>'+
    '</div>')
    }
    else{
        // alert('no glitch')
        $('.screen').remove();
    }

    setTimeout(function(){
        $('.logo-container').animate({opacity:1, top:'4%'});
        $('.hero-text').css({display:'flex'});
        $('.layer').animate({
            bottom:'0px'
            // '-webkit-transform':'translate(0,-100%)'
        },1200,'easeOutQuad');
    },3000)
    // setTimeout(function(){
    //     $('.tagline').css({opacity:1});
    //     $('.date-container').css({opacity:1});
    // },2200);
});
$(".know-more").click(function(){
    $(".cross").removeClass('rotate')
    $("#test2").css({display:'none'});
    $(".menu, .toggle-btn").css({display:'none'});
    $('.heading-wrapper').css({display:'block'});
    // $('.tail').css({display:'inline-block'}).promise().done(function(){
    // 	$('.tail').addClass('animated-tail');
    // })
    // $('.arrow').animate({top:'59px'},'linear',function(){
    //     setTimeout(function(){
            $('.logo-container').animate({
                top:'-17%',
                opacity:0
            },400,'easeInQuart');

            $('.date-container').animate({
                // left:'0%',
                opacity:0
            },400,'easeInQuart');

            $('.ggsipu-container').animate({
                // left:'0%',
                opacity:0
            },400,'easeInQuart');

            $('.tagline-container').animate({
                // left:'100%',
                opacity:0
            },400,'easeInQuart');

            $('.sub-containers, .icons').css({display:'none'});

            $('.layer').animate({
                bottom:'-500px'
                // transform:'translate(0,100%)'
            },400,'easeInQuart',function(){
                $('.know-block').animate({
                    top:'50%'
                },function(){

                })
            })
    //     },200);
    // })
});
$(".cross").click(function(){
    $(".cross").addClass('rotate')
    setTimeout(function(){
        $(".menu, .toggle-btn").css({display:'block'});
        $('.sub-containers, .icons').css({display:'inline-block'})
        $('.heading-wrapper').css({display:'none'});
        if($(window).width()<768){
            $("#test2").css({display:'block'});
        }
        $('.arrow').animate({top:'12px'},200,'easeInQuart')
        $('.tail').css({display:'none'})
        $('.logo-container').animate({
            top:'4%',
            opacity:1
        },600,'easeInQuart');

        $('.date-container').animate({
            // left:'50%',
            opacity:1
        },600,'easeInQuart');

        $('.ggsipu-container').animate({
            // left:'50%',
            opacity:1
        },600,'easeInQuart');

        $('.tagline-container').animate({
            // left:'50%',
            opacity:1
        },600,'easeInQuart');
        $('.know-block').animate({
            top:'-50%'
        },400,'easeOutQuart',function(){
            $('.layer').animate({
                bottom:'0'
            },function(){

            })
        })
    },200);

});

$(window).resize(function(){
    if($(window).width()<480){
        // alert('appended')
        if(!$('.screen').length){
            $('.timer-wrapper').append('<div class="screen glitch">'+
            '<p class="glitch"></p>'+
            '<div class="clock is-off"><span class="time" data-time=""></span></div>'+
        '</div>')
        }
    }
    else{
        // alert('no glitch')
        $('.screen').remove();
    }
});