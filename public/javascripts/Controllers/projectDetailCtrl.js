angular.module('projectDetailCtrl',[])

.controller('projectDetailController', ['$scope','Project','$state','$stateParams','Authentication', function($scope,Project,$state,$stateParams,Authentication){

    //get login status
    $scope.status = !Authentication.getStatus();

    //get a single project
    $scope.project = Project.get({id:$stateParams.id});

    $scope.convertDate = function(d){
        return d.slice(0,10);
    }

    //for support form
    $scope.showDonate = false;
    $scope.minSupport = 0;
    $scope.support = null;
    $scope.selected = false;
    $scope.myreward = null;

    $scope.choose = function(n,name){
        $scope.showDonate = true;
        $scope.minSupport = n;
        $scope.selected = true;
        $scope.myreward = name;

    }

    $scope.cancel = function(){
        $scope.showDonate = false;
        $scope.minSupport = 0;
        $scope.selected = false;
        $scope.myreward = null;

    }
    //put a single project
    $scope.putProject = function(){
        Project.update({id:$stateParams.id}, $scope.project, function(){
            console.log("Successfully updated");
            alert('successfully updated project : ' + $scope.project.name);
        });
    }


    //put a single project as a backer
    $scope.backProject = function(){    

    $scope.supportProject = {
        backer: $scope.project.backer.concat([{username:Authentication.getName(),rewardname:$scope.myreward,donate:$scope.support}]),
        currentFund: $scope.project.currentFund + $scope.support,
        comment: $scope.project.comment
    };

    if(Authentication.getId() == $scope.project.owner_id){
        window.alert("You can't back your own project!");
        return "";
    }

        Project.support({id:$stateParams.id}, $scope.supportProject, 
        function(){
            console.log("Back up project successful");
            alert('successfully support project : ' + $scope.project.name + "!");
        },
        function(){
            console.log("Fail due to unexpected error");
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