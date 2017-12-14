module.exports = {

	Image: function (title, author, description, tags, categories,  imageType, binaryData) {
    	this.title = title;
    	this.author = author;
    	this.description = description;
    	this.imageType = imageType;
    	//String or array
    	this.tags = tags;
    	this.binaryData = binaryData;

    	var self = this;

    	//for parsing to JSON 
    	convertToJsObject: function (){
    		if(isValid()){
    			var image = {
    				title: self.title,
    				author: self.author,
    				description: self.description,
   					tags: self.tags,
					imageType: self.imageType,
					binaryData: self.binaryData
				}
				return image;
    		}
    		else{
    			throw "Image is not valid. Check console log.";
    		}
    	},

    	isValid: function (){
    		var errMessage = "Image contains invalid values or types: ";

    		if(typeof(self.title) !== "string"){
    			console.log(errMessage + "title is not a string!");
    			return false;
    		}
    		else if(self.title.length > 20){
    			console.log(errMessage + "title of image is too long! (Max. 20 chars)");
    			return false;
    		}
    		else if(typeof(self.author) !== "string"){
    			console.log(errMessage + "title is not a string!");
    			return false;
    		}
    		else if(self.author.length > 15){
    			console.log(errMessage + "author of image is too long! (Max. 15 chars)")
    			return false;
    		
    		else if(typeof(self.description) !== "string"){
    			console.log(errMessage + "title is not a string!");
    			return false;
    		}
    		else if(self.description.length > 200){
    			console.log(errMessage + "title of image is too long! (Max. 200 chars)")
    			return false;
    		}
    		//tags has to be a array of strings
    		else if(typeof(self.tags) !== "object"){
    			console.log(errMessage + "field tags has to be an array with string values!");
    			return false;
    		}
    		//there should be at least one tag, so image can be searched later on
    		else if(self.tags.length < 1){
    			console.log(errMessage + "field tags must contain at least one value!");
    			return false;
    		}
    		else if(self.imageType !== "image/png" || imageType !== "image/jpg" || imageType !== "image/gif"){
    			console.log(errMessage + "Image type has to be 'image/png' or 'image/jpg' or 'image/gif'");
    				return false;
    		}
    		//check if all values in tags are strings
    		for(int i = 0; i < self.tags.length; i++){
    			if(typeof(self.tags[i]) !== "string"){
    				console.log(errMessage + "All values in tag have to be strings");
    				return false;
    			}
    			else if(self.tags[i].length < 3 || self.tags[i]).length > 15){
					console.log(errMessage + "Invalid length of tags (Min. 3 chars, Max. 15 chars)");
					return false;
				}
    		}
    	
    		//TODO: check binary data!!!


    		else
    			return true;
   	 	}
	}
}