angular.module('projectDetailCtrl',[])

.controller('projectDetailController', ['$scope','Project','$state','$stateParams','Authentication', function($scope,Project,$state,$stateParams,Authentication){

    //get login status
    $scope.status = !Authentication.getStatus();

    //get a single project
    $scope.project = Project.get({id:$stateParams.id});

    //put a single project
    $scope.putProject = function(){
        Project.update({id:$stateParams.id}, $scope.project, function(){
            console.log("Successfully updated");
            alert('successfully updated project : ' + $scope.project.name);
        });

    }
/*
    //delete a single project
    $scope.deleteProject = function(){
        Project.delete({id:$stateParams.id},
            function(){
            console.log('successfully delete project');
            $state.go("app.projects", {}, {reload: true});
        })
    }
*/
}])