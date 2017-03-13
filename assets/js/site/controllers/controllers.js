angular.module('site',[])
    .controller('HomeController', HomeController)
    .controller('ContatoController', ContatoController);

    HomeController.$inject = ["cfpLoadingBar"];
    ContatoController.$inject = [];

    function HomeController(cfpLoadingBar) {
        var vm = this;

        vm.msg = "Welcome";

        cfpLoadingBar.start();
    }

    function ContatoController(){
        var vm = this;

        vm.msg = "Contato";
    }