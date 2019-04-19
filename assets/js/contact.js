var config = {
    apiKey: "AIzaSyD3Oielphk3Lo6jChsJuCKuruWe_2Pcsm0",
    authDomain: "avaz-be565.firebaseapp.com",
    databaseURL: "https://avaz-be565.firebaseio.com",
    projectId: "avaz-be565",
};

firebase.initializeApp(config);

var database = firebase.database();

function reset() {
    var name = $("#name").val("")
    var email = $("#email").val("")
    var messages = $("#message").val("")

}


$("#sendmessages").on("click", function (event) {
    event.preventDefault()
    var name = $("#name").val()
    console.log(name)
    var email = $("#email").val()
    var messages = $("#message").val()
    if (messages.length > 0) {
        database.ref("messages/").push({
            fullname: name,
            email: email,
            message: messages,
            isRead: false,
            
        })
        reset()
       
    } else {
        alert("Message does not send!!")
    }

})