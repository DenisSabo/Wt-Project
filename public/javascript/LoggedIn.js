$(document).ready(function() {
    $(".fancybox").fancybox({
        afterLoad: function(current, previous) {
            var PicID = $(this.element).children().attr('id');
            $.ajax({
                url: "/images/manage/clicked/" + PicID,
                method: "POST",
                success: function(){
                    console.log("ajax request success");
                }
            }) 
        }
    });

    $(".number a").click(function(){
        console.log('scroll to destination');

        $('html, body').animate({
            scrollTop: $($("#galery")).offset().top + "px"
            }, 1000);
    });
});

new Vue({
    el: '#app',
    data: {
        profilName: '',
        profilPicUrl: '',
        imagelist : [],
        paginate: ['imagelist']
    },
    created: function(){
        this.fetchData()
    },
    methods: {
        fetchData: function () {
            var self = this;
            $.getJSON(window.location.origin + "/getAccount", function(result){ 
                if ('id' in result){
                    self.profilName = result.displayName;
                    self.profilPicUrl = result.image;
                    }
                });
            this.getMyImages();
        },
        wt_open: function() {
            document.getElementById("mySidebar").style.display = "block";
            document.getElementById("myOverlay").style.display = "block";
        },
        wt_close: function() {
            document.getElementById("mySidebar").style.display = "none";
            document.getElementById("myOverlay").style.display = "none";
        },
        GoogleLogout: function(){
            window.location = window.location.origin + "/auth/logout";
        },
        getMyImages: function(){
            var self = this;
            $.getJSON(window.location.origin + "/images/filter/user/all", function(result){ 
                self.imagelist = result;
            });
        },
        getRecentImages: function(){
            var self = this;
            $.getJSON(window.location.origin + "/images/filter/newest", function(result){ 
                self.imagelist = result;
            });
        },
        getPopularImages: function(){
            var self = this;
            $.getJSON(window.location.origin + "/images/filter/popular", function(result){ 
                self.imagelist = result;
            });
        },
        getAllImages: function(){
            var self = this;
            $.getJSON(window.location.origin + "/images/filter/all", function(result){ 
                self.imagelist = result;
            });
        },
    }
})
