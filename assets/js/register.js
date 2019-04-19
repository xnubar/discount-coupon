var config = {
    apiKey: "AIzaSyD3Oielphk3Lo6jChsJuCKuruWe_2Pcsm0",
    authDomain: "avaz-be565.firebaseapp.com",
    databaseURL: "https://avaz-be565.firebaseio.com",
    projectId: "avaz-be565",
};
firebase.initializeApp(config);

var database = firebase.database();

class User {
    constructor(firstName, lastName, email, password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = this.encrypt(password);
    }
    encrypt(password) {
        let key = 'm';
        let encryptedPassword = "";
        for (let i in password) {
            encryptedPassword += password[i] ^ (key.charCodeAt() + i) % 255;
        }
        return encryptedPassword;
    }
}

class UserService {
    static register(user) {
        let emailExists = false;
        database.ref("users/").once("value", function (snap) {
            let value = snap.val();

            for (let id in value) {
                if (value[id].email === user.email) {
                    emailExists = true;
                }
            }

        })

        if (!emailExists) {

            database.ref("users/").push({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: user.password
            })
            return true;
        }
        return false;

    }
}

function reset() {
    $("#first-name").val("");
    $("#last-name").val("");
    $("#email").val("");
    $("#password").val("");

}


$("#register").on("click", function (e) {
    e.preventDefault();
    let firstName = $("#first-name").val().trim();
    let lastName = $("#last-name").val().trim();
    let email = $("#email").val().trim();
    let password = $("#password").val().trim();

    let user = new User(firstName, lastName, email, password);
    let result = UserService.register(user);
    if (!result) {
        $(".error-text").show();
    } else {
        $(".error-text").hide();
        window.localStorage.setItem("user", JSON.stringify(user));
        reset();
        if (user.email === "admin@mail.ru") {
            window.location = "admin.html";
        } else {
            window.location = 'profile.html';
        }
    }
})