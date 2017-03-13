angular.module('admin',[])
    .controller('AdminController', AdminController)
    .controller('DashboardController', DashboardController)
    .controller('LoginController', LoginController)
    .controller('PhotosController', PhotosController);

    function AdminController(){
        var vm = this;

        vm.usuario = "Rodrigo";
    }

    function DashboardController() {
        var vm = this;

        vm.msg = "Dashboard";
    }

    function LoginController(){
        var vm = this;

        vm.remenber = false;
        vm.msg = "Login";
    }

    PhotosController.$inject = ['PhotosService','cfpLoadingBar'];
    function PhotosController(PhotosService,cfpLoadingBar){
        var vm = this;

        vm.init = function () {
            cfpLoadingBar.start();
            PhotosService.query().$promise.then(function (response) {
                vm.list = response;
            }).finally(function () {
                cfpLoadingBar.complete();
            });
        };
        vm.init();

    }