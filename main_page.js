// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCDLPOuFFdajRiH3TMIggemnurwPOw6yHk",
    authDomain: "booknetscreenshot.firebaseapp.com",
    databaseURL: "https://booknetscreenshot-default-rtdb.firebaseio.com",
    projectId: "booknetscreenshot",
    storageBucket: "booknetscreenshot.appspot.com",
    messagingSenderId: "1081596394469",
    appId: "1:1081596394469:web:fc5fe926f98de0ee910d0c"
};

firebase.initializeApp(firebaseConfig);

function Login() {
    var email = document.getElementById("UserName").value;
    var password = document.getElementById("Password").value;

    firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
        window.location = "loading_page.html";
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        console.log(email, password)
        document.getElementById("status").innerHTML = errorMessage;
        //
        // if(errorMessage.length ==0 ){
        //             console.log("There s no error");
        //             window.location="recently_added.html";
        //          }
        //          else{
        //              console.log(errorMessage);
        //          }
    });
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;

            console.log(uid);
            localStorage.setItem("User", user.uid);
            var providerData = user.providerData;
            console.log(user);

            //window.location = "recently_added.html";
            // ...
        } else {
            // User is signed out.
            // ...
        }
    });
}

function Signup() {
    var email = document.getElementById("UserName").value;
    var password = document.getElementById("Password").value;

    firebase.auth().createUserWithEmailAndPassword(email, password).then(function() {
            var user = firebase.auth().currentUser;
            user.sendEmailVerification().then(function() {
                // Email sent.

            }).catch(function(error) {
                // An error happened.
                document.getElementById("status").innerHTML = error.message;
            });
        }

    ).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        if (errorMessage) {
            document.getElementById("status").innerHTML = errorMessage;
        }




    });
}

function forgotPassword() {
    var auth = firebase.auth();
    var emailAddress = document.getElementById("UserName").value;

    auth.sendPasswordResetEmail(emailAddress).then(function() {
        // Email sent.
        document.getElementById("status").innerHTML = "Password Reset email has been sent to " + emailAddress + " .";
        console.log("Password Reset email has been sent to " + emailAddress + " .");
    }).catch(function(error) {
        // An error happened.
    });
}