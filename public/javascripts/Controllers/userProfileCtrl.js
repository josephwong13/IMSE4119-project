angular.module('userProfileCtrl',[])

.controller('userProfileController', ['$scope','$state','$stateParams','Authentication','User', function($scope,$state,$stateParams,Authentication,User){

    $scope.myuser = User.get({id:$stateParams.id}, function(){
        console.log("Get user successful");
    });



    $scope.update = function(){
        User.userupdate({id:$stateParams.id},$scope.myuser,function(){
            console.log("update successful");
            window.alert("Updated your account profile");
        },function(){
            console.log("update fail");
            window.alert("Fail to update. Please login again");
        })
    }

    $scope.checkList = function(projectId){
        return $scope.myuser.mysupportproject.indexOf(projectId) >= 0;
    }



}])