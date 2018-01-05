//uses jQuery. Found in "root/lib/jQuery"
//uses image.js class. Found in "root/APIs/image.js"

document.addEventListener("DOMContentLoaded", function(event) { 

	//attack click event to button with id 'uploadImage'
	$("#imageUploadForm").submit(function( event ){
		event.preventDefault(); //cancels submit action calling

		/* COLLECT ALL DATA OF FORM IN VARIABLES */
		var title = $("input[name=title]").val(), author = $("input[name=author]").val(), description = $("input[name=description]").val(), 
																			//Nur vorübergehend. Später: Nur bestimmte Kategorien erlaubt
		tags = stringTagsToArray($("input[name=tags]").val()), categories = stringTagsToArray($("input[name=categories]").val()); var file = $( "#pic" )[0].files[0];
		console.log("Collected data : " + title + author + description + tags + categories + file);
		
		//var dataFile = new FormData(); //data of picture 
		var stringData = new FormData();
		var data = new FormData();

		/* Data with type string will be appended to stringData: https://developer.mozilla.org/de/docs/Web/API/FormData/FormData */
		data.append("title", title);
		data.append("author", author);
		data.append("description", description);
		data.append("date", $.now());
		data.append("tags", tags);
		data.append("categories", categories);
		data.append("file", file);

		/* TODO: Client side validation */

		$.ajax({
			url: "/images/manage",
			method: "POST",
			processData: false,
			contentType: false, //https://stackoverflow.com/questions/29746727/upload-file-on-express-js-app
			data: data
		})
		.done(function( msg ){
			alert(msg + " String data was send to server");
		})
		.fail(function( jqXHR, textStatus ){
			alert( "Request failed: " + textStatus );
		});
		/* 
	$.ajax({
			url: "/images/manage",
			method: "POST",
			contentType: 'multipart/form-data',
			processData: false, // jQuery wont transform data in query string
			data: dataFile
		})
		.done(function( msg ){
			console.log(msg +" Data file was send to server");
		})
		.fail(function( jqXHR, textStatus ){
			alert( "Request failed: " + textStatus );
		});
		*/
	});
});

function stringTagsToArray(tags){
	if(typeof(tags) === "string"){
		var tagsToArray;
		//User should seperate tags simply by whitespace
		tagsToArray = tags.split(" ");
		return tagsToArray;

	}
	else{
		//Gute Idee?????
		throw TypeError;
	}

}

//gets image type by looking at ending of filename
function getImageType(pic){
	if(typeof(pic) === "string"){
		//splits String by using delimiter '.' for example: example.png -> [0]: example, [1]: png
		var res = pic.split(".");
		return res[1];
	}
	else{
		//Gute Idee?????
		throw TypeError;
	}
}