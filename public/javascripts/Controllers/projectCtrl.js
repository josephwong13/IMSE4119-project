angular.module('projectCtrl',[])

.controller('projectController', ['$scope','Project','$state','Authentication', function($scope,Project,$state,Authentication){

    //get method
    $scope.allProjects = Project.query(function(){
        console.log('get projects successfully');
    })

    //put method
    $scope.updateProject = function(project,projectid,bool){
        project.approve = bool;
        Project.approve({id:projectid},project,
        function(){
            console.log("Update successful");
        },
        function(){
            console.log("Update fail due to unexpected error");
        })
    };


    //post method
    $scope.project = {
        name: "",
        description: "",
        summary: "",
        category: "",
        goalFund: "",
        startDate: "",
        endDate: "",
        location: "",
        picture: ""
    };

    $scope.category = ["Technology","Design","Community","Food","Game","Other"]

    //{name:String,fund:Number,description:String,shipment:Boolean}

    getStartDate = function(){
        d = new Date();
        return d;
    }

    $scope.convertDate = function(d){
        return d.slice(0,10);
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
                      "category": $scope.project.category,
                      "owner_id": Authentication.getId(),
                      "owner_username": Authentication.getName(),
                      "location": $scope.project.location,
                      "goalFund": $scope.project.goalFund,
                      "startDate": getStartDate(),
                      "endDate": $scope.project.endDate,
                      "reward": $scope.rewardslist,
                      "picture": $scope.project.picture
                    };
        Project.save(newProject,function(){
            console.log('successfully post project');
            $scope.project = {
                name: "",
                description: ""
            };
            window.alert("Project created! It will take 2-3 working days to approve your project.");
            //$state.go($state.current, {}, {reload: true});
        }, function(){
            console.log('fail to create project. Please try again later.');
            window.alert("Please login to create project");
        });        
    }

    $scope.reset = function(){
        $scope.project = {
            name: "",
            description: ""
        }
    }

    //delete method on project
    $scope.deleteProject = function(id){
        Project.delete({id:id},
            function(){
            console.log('successfully delete project');
            window.alert("Project deleted! (Please refresh to see the effect)");
        })
    }

    //General
    $scope.search = "";

}])