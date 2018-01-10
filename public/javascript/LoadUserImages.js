//REGISTRATION
	Vue.component('my-image', {
		template: '\
    		<div class="third container margin-bottom" v-on:click="showContentMenu">\
      			<img v-bind:src="path" v-bind:alt="description" style="width:100%" class="hover-opacity">\
      			<div class="container white">\
      				<p><h4><b>{{ title }}</b></h4></p>\
        			<p>{{ description }}</p>\
       				<p><b>Tags:</b></p>\
       					<ul> <li v-for="tag in tags"> {{ tag.text }} </li> </ul>  \
        		<div class="bar" v-if="seenOnImageClick">\
        			<button class="bar-item button grey" v-bind:id="edit" style="width: 50%" v-on:click="showDropdown"><i class="fa fa-pencil" aria-hidden="true"></i>\
    					&nbsp;&nbsp;&nbsp;Edit Content\
    				</button>\
					\
    				<button class="bar-item button black" style="width: 50%;"><i class="fa fa-trash" aria-hidden="true"></i>\
    					&nbsp;&nbsp;&nbsp;Delete Content\
    				</button>\
    				<div class="dropdown-content" v-if="seenOnEditButtonClick">\
    					<a href="#" class="bar-item button" v-on:click="editTitle">Title</a>\
    					<a href="#" class="bar-item button" v-on:click="editDescription">Description</a>\
    					<a href="#" class="bar-item button" v-on:click="editTags">Tags</a>\
    					<a href="#" class="bar-item button" v-on:click="editCategories">Categories</a>\
    				</div>\
    			</div>\
    		</div>\
  		',
  		data: function(){
  			return {
    			title: image.title,
    			description: image.description,
    			path: image.path,
    			alt: image.description,
    			seenOnImageClick: false,
    			seenOnEditButtonClick: false
  			}
    	
  		},
  		methods: {
  			showContentMenu: function(){
  				if(seenOnImageClick === false){
  					seenOnImageClick = true;
  				}
  				else{
  					seenOnImageClick = false;
  				}
  			},
  			showDropdown: function(){
  				if(seenOnEditButtonClick === false){
  					seenOnEditButtonClick = true;
  				}
  				else{
  					seenOnImageClick = false;
  				}
  			},
  			editTitle: function(){
  				//TODO
  			},
  			editDescription: function(){
  				//TODO
  			},
  			editTags: function(){
  				//TODO
  			},
  			editCategories: function(){
  				//TODO
  			}


  		},
  		render() {
  			return <div class="third container margin-bottom" v-on:click="showContentMenu">
      			<img v-bind:src="path" v-bind:alt="description" style="width:100%" class="hover-opacity">
      			<div class="container white">
      				<p><h4><b>{{ title }}</b></h4></p>
        			<p>{{ description }}</p>
       				<p><b>Tags:</b></p>
       					<ul> <li v-for="tag in tags"> {{ tag.text }} </li> </ul>  
        		<div class="bar" v-if="seenOnImageClick">
        			<button class="bar-item button grey" v-bind:id="edit" style="width: 50%" v-on:click="showDropdown"><i class="fa fa-pencil" aria-hidden="true"></i>
    					&nbsp;&nbsp;&nbsp;Edit Content
    				</button>
					
    				<button class="bar-item button black" style="width: 50%;"><i class="fa fa-trash" aria-hidden="true"></i>
    					&nbsp;&nbsp;&nbsp;Delete Content
    				</button>
    				<div class="dropdown-content" v-if="seenOnEditButtonClick">
    					<a href="#" class="bar-item button" v-on:click="editTitle">Title</a>
    					<a href="#" class="bar-item button" v-on:click="editDescription">Description</a>
    					<a href="#" class="bar-item button" v-on:click="editTags">Tags</a>
    					<a href="#" class="bar-item button" v-on:click="editCategories">Categories</a>
    				</div>
    			</div>
    		</div>
  		}
	})

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
			//var parentContainer = '#parentOfImages';
			//loadImages(data, parentContainer, 1);

			loadImageWithVue(data[i]);


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


function loadImageWithVue(image){

	
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

		buildImageElement

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



		//metaContainer is child of imgContainer
		elToAppendTo = '#metaContainer'+ i;
		$(elToAppendTo).append($('<p>', {
			id: 'title' + i
		}), $('<p>' , {
			id: 'description' + i
		}), $('<div>' , {
			id: 'contentmenu' + i
		}));

		//, $('<p>' , {
		//	id: 'tags' + i
		//});

		//title is p element and child of metaContainer
		elToAppendTo = '#title' + i; //Adds title to images
		$(elToAppendTo).text(images[i + numberOfPage].title).wrapInner('<b></b>').wrapInner('<h4></h4>'); 

		//description is p element and child of metaContainer
		elToAppendTo = '#description' + i; //Adds description to images
		$(elToAppendTo).text(images[i + numberOfPage].description);


		//contentmenu is div element and child of metaContainer
		elToAppendTo = "#contentmenu" + i; 
		$(elToAppendTo).append($("<button>", {//Grey button at the end of current contentmenu
			class: "bar-item button grey",
			id: "edit" + i,
			style: "width: 50%"

		}), $("<button>", { //Black button at the end of current contentmenu
			class: "bar-item button black",
			id: "delete" + i,
			style: "width: 50%"

		}), $("<div>", {
			class: "dropdown-content",
			id: "editmenu" + i
		}));

		//editmenu is div and child of contentmenu
		elToAppendTo = "#editmenu" + i;
		$(elToAppendTo).append($('<a>', {
			href: "#",
			class: "bar-item button",
			id: "editTitle" + i
		}), $('<a>', {
			href: "#",
			class: "bar-item button",
			id: "editDescription" + i
		}), $('<a>', {
			href: "#",
			class: "bar-item button",
			id: "editTags" + i
		}), $('<a>', {
			href: "#",
			class: "bar-item button",
			id: "editCategories" + i
		}));

		//this elements are children of editmenu
		$("#editTitle"+i).text("Title");
		$("#editDescription"+i).text("Description");
		$("#editTags"+i).text("Tags");
		$("#editCategories" + i).text("Categories");


		//adds font awesome to child for edit (button that is child of contentmenu)
		$("#edit" + i).append('<i class="fa fa-pencil" aria-hidden="true"></i>'); //font awesome icon "pencil" added to grey button
		//adds click event to edit elements, so dropbox will be shown on click
		$("#edit" + i).click(function(){
			$("#editmenu" + i).toggle();
		});


		$("#delete" + i).append('<i class="fa fa-trash" aria-hidden="true"></i>');//font awesome icon "trash" added to black button
		//MAYBE ADD function

		//elToAppendTo = '#tags' + i;
		//$(elToAppendTo).text("TODO");

		//adds click event to img container
		$("#content" + i).click(function(){
			$("#contentmenu" + i).toggle();
		});

		//elToAppendTo = "#contentmenu" + i;
		//$(elToAppendTo).hide(); 

		//elToAppendTo = "#editmenu" + i;
		//$(elToAppendTo).hide(); //hides current contentmenu

	}

}

