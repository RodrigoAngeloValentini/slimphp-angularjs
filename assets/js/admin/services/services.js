angular.module('admin')
    .factory('PhotosService', PhotosService);

    PhotosService.$inject = ['appConfig','$resource'];
    function PhotosService(appConfig, $resource) {
        return $resource(appConfig.apiUrl+"/photos/:id");
    }