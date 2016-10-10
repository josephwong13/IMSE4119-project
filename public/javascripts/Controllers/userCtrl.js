angular.module('userCtrl',[])

.controller('userController', ['$scope','Authentication','$state','$window','$http', function($scope,Authentication,$state,$window,$http){

    //get login status
    $scope.status = Authentication.getStatus();
    $scope.failLogin = false;

    //register user
    $scope.reguser = {
        username: "",
        password: ""
    };

    $scope.allUser = [];

    $scope.registerUser = function(){
        Authentication.register($scope.reguser);
        //$window.location.href = '/';
        //$state.go("app.exhibits", {}, {reload: true});
    };

    //login user
    $scope.user = {
        username: "",
        password: ""
    };

    $scope.loginUser = function(){
        Authentication.login($scope.user);
        if(Authentication.login($scope.user)){
            $scope.failLogin = true;
        }
        //$window.location.href = '/';
        //$state.go("app.exhibits", {}, {reload: true});
    };

    $scope.logoutUser = function(){
        Authentication.logout();
        //$window.location.href = '/';
    }



    $scope.reset = function(){
        $scope.reguser = {
            username: "",
            password: ""
    };
        $scope.user = {
        username: "",
        password: ""
    };
    }


}])

.directive('uniqueUsername', function(isUsernameAvailable) {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
      ngModel.$asyncValidators.unique = isUsernameAvailable;
    }
  };
});