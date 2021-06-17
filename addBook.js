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
var database = firebase.database();



// var NewfirebaseConfig = {
//     apiKey: "AIzaSyD5X6gA7e7jJR_GPX2V9-57BLUbaiwwssM",
//     authDomain: "booknetworknewchat.firebaseapp.com",
//     databaseURL: "https://booknetworknewchat-default-rtdb.firebaseio.com",
//     projectId: "booknetworknewchat",
//     storageBucket: "booknetworknewchat.appspot.com",
//     messagingSenderId: "245173289840",
//     appId: "1:245173289840:web:91212b0233fb15873c45b5",
//     measurementId: "G-QFCQMRBKR3"
//   };
//   // Initialize Firebase
//   firebase.initializeApp(NewfirebaseConfig);
// var chat=firebase.database();




// Initialize Firebase



var errorMessage=[];
errorNumber=0;
var userid = localStorage.getItem("User");

console.log(userid);


function addbook() {
    if (document.getElementById("i-book-name").value == "") {
        console.log(errorNumber);
        alert("Mentioning the name of the book is considered mandatory!");
      return false;
      }
  
      if (document.getElementById("i-author").value == "") {
       console.log(errorNumber);
          alert("Author of the book must be filled out!");
          return false;
        }
  
        if(document.getElementById("i-owner-fname").value==""){
                  alert("Your first name is required.");
                  return false;
              }
          
              if(document.getElementById("i-owner-lname").value==""){
                  alert("Please fill out your last name.");
                  return false;
              }
              
              if(document.getElementById("i-class-sec").value==""){
                  alert("Your class-section must be filled out!");
                  return false;
              }
          
              if(document.getElementById("i-mobile-number").value==""){
                  alert("Your mobile number must be mentioned! Make should contain 10 digits only.");
                  return false;} 
  
              if(document.getElementById("i-mobile-number").value!=""){
                  mobile=document.getElementById("i-mobile-number").value;
              
                 if(mobile.length>10){
                 alert("Your mobile number should have 10 digits only!");
                  return false;
                 }
  
                 if(mobile.length<10){
                  alert("Your mobile number contains less digits. It should have 10 digits only.");
                  return false;
                 }
  
              
  
              } 


    console.log("adding book");
    var canvas = document.getElementById("canvas");
    var dataurlV = canvas.toDataURL("image/png");
    var old_book_name = document.getElementById("i-book-name").value;
    var book_name = old_book_name.replace(/ /g, '_');


    var e = document.getElementById("drop-down-genre");
    //var timestamp = Date.now().toString()
    localStorage.setItem("book_name", book_name);
    var owner = document.getElementById("i-owner-fname").value + " " + document.getElementById("i-owner-lname").value + ", " + document.getElementById("i-class-sec").value.toString() + " " + document.getElementById("i-mobile-number").value.toString();
    console.log(owner);
    console.log(dataurlV);
    var book = {
        "Name": document.getElementById("i-book-name").value,
        "Author": document.getElementById("i-author").value,
        "Genre": e.options[e.selectedIndex].text,
        "Review": document.getElementById("i-review").value,
        "cover": dataurlV,
        "Other": document.getElementById("i-other").value,
        "Status": "active",
        "Owner": {
            [userid]: owner
        }
    };
    console.log(book);
    localStorage.setItem("book_name", book_name);
    firebase.database().ref('/books/' + book_name).set(book);

    // firebase.database().ref("books/" + book_name).push(book);

    document.getElementById("dispaly_label").innerHTML = "Your Book has Successfully been added to the Library!";

}




function logOut() {
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        window.location = "main_page.html";
    }).catch(function(error) {
        // An error happened.
    });
}
