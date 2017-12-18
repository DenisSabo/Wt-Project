//uses jQuery. Found in "root/lib/jQuery"
//uses image.js class. Found in "root/APIs/image.js"

document.addEventListener("DOMContentLoaded", function(event) { 
	//attack click event to button with id 'uploadImage'
	$("#uploadImage").on("click", function(){
	var title = $("input[name=title]").val();
	var description = $("input[name=description]").val();
	var tags = $("input[name=tags]").val();
	var arrTags = stringTagsToArray(tags);
	var pic = $("input[name=pic]").val();
	var imageType = getImageType(pic);
	var categories = "TODO";
	var author = "TODO";

	//TODO get users name and send it with request

	
	//"Image image = new Image(title, author, description, arrTags, categories, imageType, pic);" 
	var image = {
		//can do it without "key" at the end as well
		titleKey: title,
		authorKey: author,
		descriptionKey: description,
		tagsKey: arrTags,
		categoriesKey: categories,
		imageTypeKey: imageType,
		binaryDataKey: pic

	};

	console.log(image);
		//make ajax request to imagesAPI
		var imageJson = JSON.stringify(image);
		$.ajax({
			url: "/images",
			method: "POST",
			contentType: "application/json",
			data: imageJson

			//TODO handle response!!!

		})
		.done(function( msg ){
			console.log(msg);
		})
		.fail(function( jqXHR, textStatus ){
			alert( "Request failed: " + textStatus );
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