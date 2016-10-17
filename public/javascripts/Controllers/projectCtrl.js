angular.module('projectCtrl',[])

.controller('projectController', ['$scope','Project','$state','Authentication', function($scope,Project,$state,Authentication){

    
    //get method
    $scope.allProjects = Project.query(function(){
        console.log('get projects successfully');
    })

    //post method
    $scope.project = {
        name: "",
        description: "",
        summary: "",
        goalFund: "",
        startDate: "",
        endDate: "",
        location: ""
    };

    //{name:String,fund:Number,description:String,shipment:Boolean}

    getStartDate = function(){
        d = new Date();
        return d;
    }



    $scope.rewardslist = [{
        name: "",
        fund: "",
        description: "",
        shipment: ""
    }];


    $scope.addReward = function(){
        console.log()
        $scope.rewardslist.push({
        name: "",
        fund: "",
        description: "",
        shipment: ""
    });
        console.log($scope.rewardslist);
    }

    $scope.postProject = function(){
        console.log("Start creating the project...");
        var newProject = new Project();
        console.log(Authentication.getId());
        newProject = {"name": $scope.project.name,
                      "description":$scope.project.description,
                      "summary": $scope.project.summary,
                      "owner_id": Authentication.getId(),
                      "owner_username": Authentication.getName(),
                      "location": $scope.project.location,
                      "goalFund": $scope.project.goalFund,
                      "startDate": getStartDate(),
                      "endDate": $scope.project.endDate,
                      "reward": $scope.rewardslist
                    };
        Project.save(newProject,function(){
            console.log('successfully post project');
            $scope.project = {
                name: "",
                description: ""
            };
            window.alert("Project created! Please check in the explore page");
            //$state.go($state.current, {}, {reload: true});
        }, function(){
            console.log('fail to post project');
            window.alert("Please login to create project");
        });        
    }

    $scope.reset = function(){
        $scope.project = {
            name: "",
            description: ""
        }
    }
/*
    //delete method on exhibit
    $scope.deleteProject = function(id){
        Project.delete({id:id},
            function(){
            console.log('successfully delete project');
            $state.go($state.current, {}, {reload: true});
        })
    }
    */
    //General

    $scope.progress = 70;

}])