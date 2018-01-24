//uses jQuery. Found in "root/lib/jQuery"
//uses image.js class. Found in "root/APIs/image.js"

document.addEventListener("DOMContentLoaded", function(event) { 

	//attack click event to button with id 'uploadImage'
	$("#imageUploadForm").submit(function( event ){
		//disables button, until upload was successfull or upload fails ...
		$("#uploadImage").attr('disabled','disabled');

		//cancels submit action calling
		event.preventDefault(); 

		/* COLLECT ALL DATA OF FORM IN VARIABLES */
		var title = $("input[name=title]").val(), author = $("input[name=author]").val(), description = $("input[name=description]").val(), 
		
		tags = stringTagsToArray($("input[name=tags]").val());

		
		/** CATEGORIES: 3 CHECKBOXES; NOT REQUIRED -> VAL CAN BE EMPTY */
		var categories = getValuesCheckbox();

		var file = $( "#pic" )[0].files[0];
		
		//var dataFile = new FormData(); //data of picture 
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
			//reload page so client can see uploaded images directly
			location.reload();
			//enables disabled upload button.
			$("#uploadImage").removeAttr('disabled');
		})
		.fail(function( jqXHR, textStatus ){
			alert( "Request failed: " + jqXHR.responseText );
			$("#uploadImage").removeAttr('disabled');
		});
		
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


function getValuesCheckbox(){
	var categories = [];
	/** Three different categories to classify image */
	//categories[0] can be "photographic", or "non-photographic"
	if($('#photographic').is(":checked")){
 		 categories.push("photographic"); 
	}
	else if($('#non_photographic').is(":checked")){
		categories.push("non-photographic"); 
	}
	else{
		categories.push("else"); 
	}

	//categories[1] can be "people", "nature" or "urban"
	if($('#people').is(":checked")){
 		 categories.push("people"); 
	}
	else if($('#nature').is(":checked")){
		categories.push("nature"); 
	}
	else if($('#urban').is(":checked")){
		categories.push("urban"); 
	}
	else{
		categories.push("else"); 
	}

	//categories[2] can be "science", technology", or "entertainment"
	if($('#science').is(":checked")){
 		 categories.push("science"); 
	}
	else if($('#tech').is(":checked")){
		categories.push("tech"); 
	}
	else if($('#entertainment').is(":checked")){
		categories.push("entertainment"); 
	}
	else{
		categories.push("else"); 
	}
	return categories;
}