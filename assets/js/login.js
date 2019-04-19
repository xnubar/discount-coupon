var config = {
    apiKey: "AIzaSyD3Oielphk3Lo6jChsJuCKuruWe_2Pcsm0",
    authDomain: "avaz-be565.firebaseapp.com",
    databaseURL: "https://avaz-be565.firebaseio.com",
    projectId: "avaz-be565",
};
firebase.initializeApp(config);

var database = firebase.database()




function encrypt(password) {
    let key = 'm';
    let encryptedPassword = "";

    for (let i in password) {
        encryptedPassword += password[i] ^ (key.charCodeAt() + i) % 255;

    }
    return encryptedPassword;
}

$(".btn").on("click", function () {

    var email = $("#email").val()

    var password = encrypt($("#password").val());

    database.ref("users/").once("value", function (snap) {
        let val = snap.val()
        for (let i in val) {
            let user = val[i];
            if (email === "admin@mail.ru" && user.password === password) {
                window.location = 'admin.html';
            } else if (user.email === email && user.password === password) {
                window.localStorage.setItem("user", JSON.stringify(user));
                window.location = 'profile.html';
            }
        }

    })

})

