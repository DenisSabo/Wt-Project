$(document).ready(function() {
    $(".fancybox").fancybox();
    $(".number a").click(function(){
        console.log('scroll to destination');

        $('html, body').animate({
            scrollTop: $($("#galery")).offset().top + "px"
            }, 1000);
    });
});


// Script to _open and _close sidebar
new Vue({
    el: '#app',
    data: {
        imagelist : [],
        paginate: ['imagelist']
    },
    created: function(){
        this.getPopularImages();
    },
    methods: {
        getPopularImages: function(){
            var self = this;
            $.getJSON(window.location.origin + "/images/filter/popular", function(result){ 
                self.imagelist = result;
            });
        },
        getRecentImages: function(){
            var self = this;
            $.getJSON(window.location.origin + "/images/filter/newest", function(result){ 
                self.imagelist = result;
            });
        },
        getAllImages: function(){
            var self = this;
            $.getJSON(window.location.origin + "/images/filter/all", function(result){ 
                self.imagelist = result;
            });
        },
        wt_open: function() {
            document.getElementById("mySidebar").style.display = "block";
            document.getElementById("myOverlay").style.display = "block";
        },
        wt_close: function() {
            document.getElementById("mySidebar").style.display = "none";
            document.getElementById("myOverlay").style.display = "none";
        },
        GoogleRedirectLogin: function() {
            window.location = window.location.origin + "/auth/login";
        },
        GoogleRedirectRegister: function() {
            window.location = "https://accounts.google.com/SignUp";
        }
    }
})