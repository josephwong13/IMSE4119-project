angular.module('projectDetailCtrl',[])

.controller('projectDetailController', ['$scope','Project','User','$state','$stateParams','Authentication','$location', '$anchorScroll','$window', function($scope,Project,User,$state,$stateParams,Authentication,$location, $anchorScroll,$window){

    //get login status
    $scope.status = !Authentication.getStatus();

    $scope.myPic = Authentication.getPic();

    //get a single project
    $scope.project = Project.get({id:$stateParams.id},
        function(data){
            $scope.owner = User.get({id:data.owner_id},
                function(){
                    console.log("Get owner successfully")
                })
    });

    //verify id
    $scope.isOwner = function(){
        return Authentication.getId()==$scope.project.owner_id;
    }

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


    getStartDate = function(){
        d = new Date();
        return d;
    }

    $scope.update = {
        date:getStartDate(),
        title:"",
        content:"",
        picture:""
    }
    //put a single project
    $scope.updateProject = function(){
        var newupdate = {update: $scope.project.update.concat([$scope.update])};
        Project.update({id:$stateParams.id}, newupdate, function(){
            console.log("Successfully updated");
            $window.alert('successfully updated project : ' + $scope.project.name);
        });
    }

    $scope.comment = {
        username:Authentication.getName(),
        userpic:Authentication.getPic(),
        content: "",
        date: getStartDate()
    }

    $scope.postComment = function(){
        var update = {
            backer:$scope.project.backer,
            currentFund:$scope.project.currentFund,
            comment:$scope.project.comment.concat([$scope.comment])
        };
        Project.comment({id:$stateParams.id},update,
        function(){
            console.log("Successfully comment")
            $window.alert("Comment successful. Please refresh to see your comment")
        },
        function(){
            console.log("comment fail")
            $window.alert("Comment fail. Please login and try again")
        })
    }

    $scope.toBackup = function() {
      $location.hash('backup');
      $anchorScroll();
    };

    $scope.haveComment = function(){
        if($scope.project.comment.length == 0){
            return false
        }
        return true
    };

    $scope.haveUpdate = function(){
        if($scope.project.update.length == 0){
            return false
        }
        return true
    };

/*
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