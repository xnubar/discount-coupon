$(document).ready(function () {
    $(".sections").on("click", function () {
        let target = $(this).data('value');
        console.log(target)
        $('html, body').stop().animate({
            scrollTop: $(target).offset().top
        }, 1000);
        let arr=$(".sections");
        for(let i=0; i<arr.length; i++){
            $(arr[i]).removeClass("active")
        }
        $(this).addClass("active")
    })
})