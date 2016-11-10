angular.module('appRoutes', ['ui.router','ngResource'])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {


        $stateProvider

            .state('home', {
                url:'/home',
                        templateUrl : '../views/home.html',
                        controller : 'appController'
            })

            .state('login', {
                url:'/login',
                        templateUrl : '../views/login.html',
                        controller : 'userController'
            })

            .state('register', {
                url:'/register',
                        templateUrl : '../views/register.html',
                        controller : 'userController'
            })

            .state('project', {
                url:'/project',
                        templateUrl : '../views/project.html',
                        controller : 'projectController'
            })

            .state('createProject', {
                url:'/createProject',
                        templateUrl : '../views/createProject.html',
                        controller : 'projectController'
            })

            .state('projectDetail',{
                url: '/project/:id',
                        templateUrl : 'views/projectDetail.html',
                        controller  : 'projectDetailController', 
            })

            .state('manageUser',{
                url: '/manageUser',
                        templateUrl : 'views/manageUser.html',
                        controller  : 'userController', 
            })

            .state('manageProject',{
                url: '/manageProject',
                        templateUrl : 'views/manageProject.html',
                        controller  : 'projectController', 
            })

            .state('userProfile',{
                url: '/userProfile/:id',
                        templateUrl : 'views/userProfile.html',
                        controller  : 'userProfileController', 
            })

            .state('confirm',{
                url: '/confirm',
                        templateUrl : 'views/confirm.html',
                        controller  : 'paypalController', 
            })

            .state('reject',{
                url: '/reject',
                        templateUrl : 'views/reject.html',
                        controller  : 'paypalController', 
            })

            $urlRouterProvider.otherwise("/home");

    }])
;