var config = {
    apiKey: "AIzaSyD3Oielphk3Lo6jChsJuCKuruWe_2Pcsm0",
    authDomain: "avaz-be565.firebaseapp.com",
    databaseURL: "https://avaz-be565.firebaseio.com",
    projectId: "avaz-be565",
};
firebase.initializeApp(config);

var database = firebase.database()

var fullnames=[];
var users=[];
database.ref("/messages").on("value", function (snap) {


    let messages = snap.val();
    for (let i in messages) {
        let message = messages[i];
        if(fullnames.indexOf(message.fullname)==-1){
            fullnames.push(message.fullname)

        }
    }
    loadMessages(fullnames)
})


function loadMessages(arr) {
    $(".messages-container").empty();

    for(let i in arr){
        let li=$("<li>");

        let a =$("<a>");
        $(a).html(arr[i])
        $(li).append(a);
        $(li).data("email",arr[i])
    
        $(".messages-container").append(li)
    }
}

$(document).on("click","li",function(){
    
    $(".chat-window").show();

    $(".user-msg").html($(this).data("email"))
})

$(document).on('click', '.panel-heading span.icon_minim', function (e) {
    var $this = $(this);
    if (!$this.hasClass('panel-collapsed')) {
        $this.parents('.panel').find('.panel-body').slideUp();
        $this.addClass('panel-collapsed');
        $this.removeClass('fa-minus').addClass('fa-plus');
    } else {
        $this.parents('.panel').find('.panel-body').slideDown();
        $this.removeClass('panel-collapsed');
        $this.removeClass('fa-plus').addClass('fa-minus');
    }
});
$(document).on('focus', '.panel-footer input.chat_input', function (e) {
    var $this = $(this);
    if ($('#minim_chat_window').hasClass('panel-collapsed')) {
        $this.parents('.panel').find('.panel-body').slideDown();
        $('#minim_chat_window').removeClass('panel-collapsed');
        $('#minim_chat_window').removeClass('fa-plus').addClass('fa-minus');
    }
});
$(document).on('click', '#new_chat', function (e) {
    var size = $( ".chat-window:last-child" ).css("margin-left");
     size_total = parseInt(size) + 400;
    alert(size_total);
    var clone = $( "#chat_window_1" ).clone().appendTo( ".container" );
    clone.css("margin-left", size_total);
});
$(document).on('click', '.icon_close', function (e) {
    $( "#chat_window_1" ).hide();
});
