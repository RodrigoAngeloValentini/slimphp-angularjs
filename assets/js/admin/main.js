angular.module('app',['admin','ui.router','ngResource','angular-loading-bar','ngAnimate'])
    .config(function ($stateProvider, $urlRouterProvider,cfpLoadingBarProvider) {

        $stateProvider

            .state('login',{
                url: '/login',
                cache: 'false',
                views:{
                    'content':{
                        templateUrl: './../assets/views/admin/login/login.html',
                        controller: 'LoginController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('admin',{
                url:'/',
                cache: 'false',
                views:{
                    'content':{
                        templateUrl: './../assets/views/admin/admin.html',
                        controller: 'AdminController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('dashboard', {
                url: 'dashboard',
                cache: 'false',
                parent:'admin',
                views:{
                    'menuContent':{
                        templateUrl: './../assets/views/admin/dashboard/dashboard.html',
                        controller: 'DashboardController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('photos', {
                url: 'photos',
                cache: 'false',
                parent:'admin',
                views:{
                    'menuContent':{
                        templateUrl: './../assets/views/admin/photos/photos.html',
                        controller: 'PhotosController',
                        controllerAs: 'vm'
                    }
                }
            });

        $urlRouterProvider.otherwise('/');

        cfpLoadingBarProvider.includeSpinner = true;
        cfpLoadingBarProvider.includeBar = true;
    })
    .constant('appConfig',{
        'apiUrl':'http://localhost/site-desbravador/api'
    })
    .directive('icheck', ['$timeout', '$parse', function($timeout, $parse) {
        return {
            require: 'ngModel',
            link: function($scope, element, $attrs, ngModel) {
                return $timeout(function() {
                    var value;
                    value = $attrs['value'];

                    $scope.$watch($attrs['ngModel'], function(newValue){
                        $(element).iCheck('update');
                    });

                    return $(element).iCheck({
                        checkboxClass: 'icheckbox_square-blue',
                        radioClass: 'iradio_square-blue'

                    }).on('ifChanged', function(event) {
                        if ($(element).attr('type') === 'checkbox' && $attrs['ngModel']) {
                            $scope.$apply(function() {
                                return ngModel.$setViewValue(event.target.checked);
                            });
                        }
                        if ($(element).attr('type') === 'radio' && $attrs['ngModel']) {
                            return $scope.$apply(function() {
                                return ngModel.$setViewValue(value);
                            });
                        }
                    });
                });
            }
        };
    }]);