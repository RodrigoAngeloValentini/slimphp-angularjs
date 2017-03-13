angular.module('app',['site','ui.router','angular-loading-bar','ngAnimate'])
    .config(function ($stateProvider, $urlRouterProvider, cfpLoadingBarProvider) {

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: './assets/views/site/home.html',
                controller: 'HomeController',
                controllerAs: 'vm'
            })
            .state('contato', {
                url: '/contato',
                templateUrl:'./assets/views/site/contato.html',
                controller: 'ContatoController',
                controllerAs: 'vm'
            });

        $urlRouterProvider.otherwise('/');

        cfpLoadingBarProvider.includeSpinner = true;
        cfpLoadingBarProvider.includeBar = true;
    });