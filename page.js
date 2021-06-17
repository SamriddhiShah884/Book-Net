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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");
book_name = localStorage.getItem("book_name");
document.getElementById("header_label").innerHTML = book_name.replace(/_/g, ' ');
var uid = localStorage.getItem("User");
console.log(book_name)



function getData() {
    firebase.database().ref("/books/" + book_name).on('value', function(snapshot) {
        document.getElementById("output").innerHTML = "";
        image_src = snapshot.val().cover;
        //Start code
        var Owner = snapshot.val().Owner;
        var ownerkey = Object.keys(Owner);
        var book_name = snapshot.val().Name;
        var genre = snapshot.val().Genre;
        var other = snapshot.val().Other;
        var author = snapshot.val().Author;
        var review = snapshot.val().Review;
        var status_display = snapshot.val().Status;
        
       
     


        //https://www.commonsensemedia.org/book-reviews/the-bfg

        var id = Owner[ownerkey[ownerkey.length - 1]];
        console.log(id);
       var lastFive = id.substr(id.length - 10); // => "Tabs1"
       console.log(lastFive);
       var a="tel:+"+lastFive;
       //tel:+900300400
       document.getElementById("callAnchor").href = a;
document.getElementById("callAnchor").text="Call "+lastFive;
    


        console.log(status_display);
        var display = "<br><br><h4 class='text-display'>"  +"Owner's Credentials :  " + Owner[ownerkey[ownerkey.length - 1]] + "<br><br>" +
            "Author : " + author + "<br>" + "Genre : " + genre + "<br><br>" + "Book Review : " + review + "<br>" +
            "Any Other Details : " + other + "</h4>";
        message_with_tag = "<h4 class='message_h4'>" + Owner.owner + "</h4>";
        row = display;
        console.log(Owner.owner);
        document.getElementById("output").innerHTML += row;
        document.getElementById("pic").src = image_src;
        if (status_display == "active") {
            document.getElementById("status_button").innerHTML = "Available";
        } else {
            document.getElementById("status_button").innerHTML = "UnAvailable";
        }

        if (ownerkey[ownerkey.length - 1] != uid) {
            var inactivebutn = document.getElementById('inactive')
            inactivebutn.style.display = "none";
        }
    })

}
getData();




function logout() {
    localStorage.removeItem("user_name");

    window.location.replace("recently_added.html");
}

function Inactive() {
    firebase.database().ref('/books/' + book_name).update({ 'Status': 'InActive' });
    window.location = "recently_added.html"
}

function logOut() {
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        window.location = "main_page.html";
    }).catch(function(error) {
        // An error happened.
    });
}

//   <a href="tel:+900300400">Phone: 900 300 400</a>

function openLink(){
    var b=book_name.replace(/_/g, ' ');;
    console.log("var b= "+b);
    var bl = b.toLowerCase();
    console.log("var bl= "+bl);
    var bd= bl.replace(/ /g, '-');
    console.log("var bd= "+bd);
    var link_review="https://www.commonsensemedia.org/book-reviews/"+bd;
   

    var first= b.charAt(0);
    var pf=first.toLowerCase();
    console.log(pf+" first");
    var nd=bd;
    console.log("book trust= "+ nd);
    var bookTrust="https://www.booktrust.org.uk/book/"+pf+"/"+nd+"/";
    //https://www.booktrust.org.uk/book/t/the-bfg/

console.log(bookTrust); 
    window.open(bookTrust);
   //window.open(link_review);
    document.getElementById("review_anchor").href=link_review;
    console.log(link_review);
}
