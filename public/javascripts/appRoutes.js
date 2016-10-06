angular.module('appRoutes', ['ui.router','ngResource'])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {


        $stateProvider

            .state('home', {
                url:'/home',
                        templateUrl : '../views/home.html',
                        controller : ''
            })

            .state('login', {
                url:'/login',
                        templateUrl : '../views/login.html',
                        controller : ''
            })

            $urlRouterProvider.otherwise("/home");

    }])
;