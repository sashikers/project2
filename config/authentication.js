// Code for User Authentication through firebase

function configFirebase() {
	  // Initialize Firebase
  	var config = {
    	apiKey: "AIzaSyDBFI0Oe2mZ-uONgbHecQgco3cypSlQsKk",
    	authDomain: "beerapp-c1e25.firebaseapp.com",
    	databaseURL: "https://beerapp-c1e25.firebaseio.com",
    	projectId: "beerapp-c1e25",
    	storageBucket: "beerapp-c1e25.appspot.com",
    	messagingSenderId: "882732018398"
  	};

	if (!firebase.apps.length) {
      	var app = firebase.initializeApp(config);
  	}
  	signOn();
}


// function prompts user for login
function signOn() {
	// creates instance of Google's provider object
	var provider = new firebase.auth.GoogleAuthProvider();
	console.log(provider);

	// prompts user to sign in with google account by redirecting to signin page
	firebase.auth().signInWithRedirect(provider);

	// retrieve the Google provider's OAuth token by calling getRedirectResult when your page loads
	firebase.auth().getRedirectResult().then(function(result) {
	  	if (result.credential) {
	    	// This gives us Google Access Token. can be used to access the Google API.
	    	var token = result.credential.accessToken;
	    	console.log(token);
	  
	  	}
		// The signed-in user info.
	  	var user = result.user;
	  	console.log(user);
	  	var email = user.email;

	  	// send POST req to backend
		$.ajax({
			type: 'POST',
			url: '/',
			data: { user: user,
			        email: email },
			async: false,
			success: function(data) {
			}
		})
	// error handling
	}).catch(function(error) {
		var errorCode = error.code;
		var errorMessage = error.message;
		// The email of the user's account used.
		var email = error.email;
		// The firebase.auth.AuthCredential type that was used.
		var credential = error.credential;
	});
}


// sign out 
function signOut() {
	firebase.auth().signOut().then(function() {
  	// Sign-out successful.
	}).catch(function(error) {
  		console.error(error);
	});
}


