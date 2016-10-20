angular.module('userCtrl',[])

.controller('userController', ['$scope','Authentication','$state','$window','$http', 'User', function($scope,Authentication,$state,$window,$http,User){

    //get method
    $scope.allUser = User.query(function(){
        console.log('get users successfully');
    });

    //put method
    $scope.updateUser = function(user,userid){
        User.update({id:userid},user,
        function(){
            console.log("Update successful");
        },
        function(){
            console.log("Update fail due to unexpected error");
        })
    };

    //delete method
    $scope.deleteUser = function(userid){
        User.delete({id:userid},
        function(){
            console.log("Delete user successful");
        }),
        function(){
            console.log("Delete fail due to unexpected error");
        }
    }

    //get login status
    $scope.status = Authentication.getStatus();
    $scope.failLogin = false;

    //register user
    $scope.reguser = {
        username: "",
        password: ""
    };

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