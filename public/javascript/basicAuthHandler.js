document.addEventListener("DOMContentLoaded", function(event) { 

	//attach click event to form with id "loginForm"
	$("#loginForm").submit(function( event ){
		event.preventDefault(); //cancels submit action calling

		/* COLLECT ALL DATA OF FORM IN VARIABLES */
		var loginMail = $("input[name=loginMail]").val(), loginPassword = $("input[name=loginPassword]").val();
		console.log("Collected data : " + loginMail + loginPassword);
		
		//var dataFile = new FormData(); //data of picture 
		var data = new FormData();

		/* Data with type string will be appended to stringData: https://developer.mozilla.org/de/docs/Web/API/FormData/FormData */
		data.append("mail", loginMail);
		data.append("password", loginPassword);

		/* TODO: Client side validation */

		$.ajax({
			url: "/images/manage",
			method: "POST",
			//processData: false,
			contentType: 'application/x-www-form-urlencoded; charset=UTF-8', 
			data: data
		})
		.done(function( msg ){
			alert(msg + " Login was send to server");
		})
		.fail(function( jqXHR, textStatus ){
			alert( "Request failed: " + textStatus );
		});
	});

	//attach click event to form with id "signupForm"
	$("#signupForm").submit(function( event ){
		event.preventDefault();

		/* COLLECT ALL DATA OF FORM IN VARIABLES */
		var signupUsername = $("input[name=signupUsername]").val(), signupMail = $("input[name=signupMail]").val(), signupPassword = $("input[name=signupPassword]").val();
		console.log("Collected data : " + signupUsername + signupMail + signupPassword);
		
		//var dataFile = new FormData(); //data of picture 
		var data = new FormData();

		/* Data with type string will be appended to stringData: https://developer.mozilla.org/de/docs/Web/API/FormData/FormData */
		data.append("username", signupUsername);
		data.append("mail", signupMail);
		data.append("password", signupPassword);

		/* TODO: Client side validation */

		$.ajax({
			url: "/images/manage",
			method: "POST",
			//processData: false,
			contentType: 'application/x-www-form-urlencoded; charset=UTF-8', 
			data: data
		})
		.done(function( msg ){
			alert(msg + " SignUp was send to server");
		})
		.fail(function( jqXHR, textStatus ){
			alert( "Request failed: " + textStatus );
		});
	});
});