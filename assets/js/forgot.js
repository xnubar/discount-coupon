var config = {
    apiKey: "AIzaSyD3Oielphk3Lo6jChsJuCKuruWe_2Pcsm0",
    authDomain: "avaz-be565.firebaseapp.com",
    databaseURL: "https://avaz-be565.firebaseio.com",
    projectId: "avaz-be565",
};
firebase.initializeApp(config);

var database = firebase.database()
var user
var id
$("#submitemail").on("click", function () {
    let mail = $("#email").val()
    database.ref("users/").once("value", function (snap) {
        let val = snap.val()

        for (let i in val) {
            user = val[i]
            id = i
            if (user.email === mail) {
                $("#newpassword").css("display", "block")
                $("#confirm-newpassword").css("display", "block")
                $("#submitpassword").css("display", "block")
                $("#email").css("display", "none")
                $("#submitemail").css("display", "none")
            }
            else {
                alert("Please write your e-mail")
            }
    console.log(user)

            
        }
    })
})
function encrypt(password) {
    let key = "m"
    let encryptedPassword = ""
    for(let i in password){
        encryptedPassword+=password[i]^(key.charCodeAt()+i)%255
    }
    return encryptedPassword
}
$("#submitpassword").on("click", function () {
    console.log(user)
    var newpassword = $("#newpassword").val()
    var confirmnewpassword = $("#confirm-newpassword").val()

    if (newpassword === confirmnewpassword) {
        console.log('salam')
        let password=encrypt(newpassword);
        database.ref("users/"+id).set({
            email: user.email,
            password
        })
        window.location='login.html';
    }
})