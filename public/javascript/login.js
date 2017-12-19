var vm = new Vue({
    el: "#profil",
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
                self.profilName = result.displayName;
                self.profilPicUrl = result.image;; 
                });
            }
      }
});