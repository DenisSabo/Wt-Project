// Load user images, at the beginning of user log in and if somebody clicks button "all" at his personal page
//TODO Attach click events to generated page numbers


$( document ).ready(function() { //DOM loaded
	getMyImages(); //AJAX request for getting images ... Dirty solution: loads all images of user at once ...
});

var generatedPages = 0;

function getMyImages(){
	//AJAX request to route
	$.ajax({
			url: "images/filter/user/all",
			method: "GET"
		})
		.done(function( data ){
			console.log(data);

			var numberOfImages = data.length;
			console.log("Number of images is: " + numberOfImages);

			//Generate pages, depending on number of existing images
			generatePageNumbers(numberOfImages, data);
			//attachEventsToPageNumbers(generatedPages, data, parentContainer);
			
			//will load images in parentContainer
			var parentContainer = '#parentOfImages';
			loadImages(data, parentContainer, 1);

		})
		.fail(function( jqXHR, textStatus ){
			alert( "Request failed: " + textStatus );
		});
}


/**
function attachEventsToPageNumbers(numberOfGeneratedPages, data, parentContainer){

	var i = 1;
	while(numberOfGeneratedPages > 0){
		var page = '#pageNumber' + i;
		$(page).click(funtion(){
			loadImages(data, parentContainer, i);
		});
		i++;
		numberOfGeneratedPages--;
	}
}
*/

/** GENERATE PAGE NUMBERS DEPENDING ON NUMBER OF EXISTING IMAGES*/
function generatePageNumbers(numberOfImages, images){
	//first child of div 
	$("#numberOfPages").append('<a href="#" class="bar-item button hover-black">«</a>'); //TODO add functionality

	for(var i = 1; numberOfImages > 0; i++){
		//other childs, generated relatively to number of images
		//$("#numberOfPages").append('<a href="#" class="bar-item button hover-black">'+ i +'</a>');

		$("#numberOfPages").append($('<a>', {
			href: '#',
			class: 'bar-item button hover-black',
			id: 'pageNumber' + i
		}));
		var currPage = '#pageNumber' + i;

		console.log("Current page number: "  + i);

		$(currPage).text(i);
		//Attach click event to page numbers
		$(currPage).click(function(){
			var parent = "#parentOfImages";
			console.log(this);
			//for example: clickedElementsId = "pageNumber1"
			var clickedElementsId = this.id;
			//last char of it, is number of page "pageNumber1" lastChar: "1"
			var numberOfPage = clickedElementsId.slice(-1);
			//empty parent of images and load new images in container
			$(parent).empty();
			loadImages(images, parent, numberOfPage); 
		});

		numberOfImages = numberOfImages - 9; //One page has 9 images
	}

	//last child of div
	$("#numberOfPages").append('<a href="#" class="bar-item button hover-black">»</a>'); //TODO add functionality


}



function loadImages(images, parentContainer, numberOfPage){
	//GENERATES HTML CONTENT WITH GIVEN IMAGE DATA AND APPENDS IT TO PARENT CONTAINER

	/** <div class="row-padding">
        <div class="third container margin-bottom">
            <img src="https://w3schools.com/w3images/mountains.jpg" alt="Norway" style="width:100%" class="hover-opacity">
            <div class="container white">
                <p><b id="titleOfImage1">Lorem Ipsum</b></p>
                <p id="description1">Praesent tincidunt sed tellus ut rutrum. Sed vitae justo condimentum, porta lectus vitae, ultricies congue gravida diam non fringilla.</p>
            </div>
    	</div>
    </div>

        */
    numberOfPage = ((numberOfPage - 1) * 9); //If current number of page is two, result will be 9. 9 Means that 9 pictures are already shown on previous page. So load images[10], images[11], ...
	//appends div container to parentContainer, that representing a row
	$(parentContainer).append($('<div>', {
		class: 'row-padding',
		id: 'row' + 0
	})); //first row is now open

	// for each i, image html will be generated and appended to parentContainer
	for(var i = 0, x = 0; i < 9; i++){
		if(i !== 0 && i % 3 === 0){ //if i is divisible by 3, there are 3 elements safed in current row, so append new row
			x++; //increment row counter
			$(parentContainer).append($('<div>', {
				class: 'row-padding',
				id: 'row' + x
			}));
		}

		var currentRow = '#row' + x; // id of current row

		$(currentRow).append($('<div>', { //append image container to row
			class: 'third container margin-bottom',
			id: 'imgContainer' + i
		}));
		var elToAppendTo;
		elToAppendTo = '#imgContainer' + i; // id of current image container
		$(elToAppendTo).append($('<img>', { // append image element
    		src : images[i + numberOfPage].path, 	
    		alt : images[i + numberOfPage].description, 
    		style: 'width:100%',
    		class: 'hover-opacity'
		}), $('<div>', {
			class: 'container white',
			id: 'metaContainer' + i
		}));

		elToAppendTo = '#metaContainer'+ i;
		$(elToAppendTo).append($('<p>', {
			id: 'title' + i
		}), $('<p>' , {
			id: 'description' + i
		}));

		elToAppendTo = '#title' + i;
		$(elToAppendTo).text(images[i + numberOfPage].title).wrapInner('<b></b>'); 

		elToAppendTo = '#description' + i;
		$(elToAppendTo).text(images[i + numberOfPage].description);

	}

}

