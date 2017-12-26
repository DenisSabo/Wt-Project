new vue({
    el: 'app',
    data: {
        profilName: 'test',
        profilPicUrl: '',
    },
    created: function(){
        this.fetchData()
    },
    methods: {
        fetchData: function () {
            var self = this;
            $.getJSON(window.location.origin + "/getAccount", function(result){ 
                if (result.hasOwnProperty('profilName')){
                    self.profilName = result.displayName;
                    self.profilPicUrl = result.image;; 
                    }
                });
            },
        wt_open(){
            document.getElementById("mySidebar").style.display = "block";
            document.getElementById("myOverlay").style.display = "block";
        },
        wt_close(){
            document.getElementById("mySidebar").style.display = "none";
            document.getElementById("myOverlay").style.display = "none";
        }
    }
})