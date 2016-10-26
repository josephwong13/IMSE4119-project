angular.module('paypalCtrl',[])

.controller('paypalController', ['$scope','PaypalAuthen','$http','$window','$timeout','$stateParams','Project','Authentication', function($scope,PaypalAuthen,$http,$window,$timeout,$stateParams,Project,Authentication){


    getStartDate = function(){
        d = new Date();
        return d;
    }

    $scope.preapproval = function(){

        if(Authentication.getId() == $scope.project.owner_id){
          window.alert("You can't back your own project!");
          return "";
        }
        var url = "https://svcs.sandbox.paypal.com/AdaptivePayments/Preapproval";
        $http({
            method: "POST",
            url: url,
            headers: {
            "Authorization":"Bearer "+PaypalAuthen.getPaypalToken(),
            "Coneten-Type":"application/json",
            "X-PAYPAL-SECURITY-USERID":"adminfortest2_api2.gmail.com",
            "X-PAYPAL-SECURITY-PASSWORD":"QC5VPMVMXCEHGF8Q",
            "X-PAYPAL-SECURITY-SIGNATURE":"AFcWxV21C7fd0v3bYYYRCpSSRl31AZ1-uPEogsPXrJPoQfgoFGub15S1",
            "X-PAYPAL-REQUEST-DATA-FORMAT": "NV",
            "X-PAYPAL-RESPONSE-DATA-FORMAT":"NV",
            "X-PAYPAL-APPLICATION-ID":"APP-80W284485P519543T",
            "X-PAYPAL-REQUEST-DATA-FORMAT":"JSON",
            "X-PAYPAL-RESPONSE-DATA-FORMAT":"JSON"
            },
            data: {              
              "returnUrl":"http://www.example.com/success.html",
              "cancelUrl":"http://www.example.com/failure.html",  
              "requestEnvelope":{
                  "errorLanguage":"en_US",                          
                  "detailLevel":"ReturnAll"                        
              },
              "startingDate": getStartDate(),
              "endingDate": "2017-06-25T14:36:38.007+00:00",
              "maxTotalAmountOfAllPayments": 2000,
              "maxNumberOfPayments": 20,
              "currencyCode": "USD"
            }
        })
        .then(
        function(data){
            console.log("Successfully created preapproval");
            //console.log("First" + JSON.stringify(data));
              var supportProject = {
                backer: $scope.project.backer.concat([{ 
                                                  username:Authentication.getName(),
                                                  rewardname:$scope.myreward,
                                                  donate:$scope.support,
                                                  donateToOwner:Math.floor($scope.support*0.9),
                                                  donateToSystem:Math.floor($scope.support*0.1),
                                                  preapproval:data.data.preapprovalKey
                                                }]),
                currentFund: $scope.project.currentFund + $scope.support,
                comment: $scope.project.comment
              };            
              Project.support({id:$stateParams.id},supportProject, 
                function(){
                    console.log("Back up project successful");
                    //console.log("Second");
                    $window.location.href = "https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_ap-preapproval&preapprovalkey=" + data.data.preapprovalKey;
                },
                function(){
                    console.log("Fail due to unexpected error");
                });
        },
        function(){
            console.log('Fail to create preapproval due to unexpected error');
        })

    }




    $scope.payment = function(){

      var iteration = $scope.project.backer.length;
        for(var i=0;i<iteration;i++){
          if($scope.project.backer[i].preapproval == undefined){
           continue;
         }
        var paymentUrl = "https://svcs.sandbox.paypal.com/AdaptivePayments/Pay";
        $http({
            method: "POST",
            url: paymentUrl,
            headers: {
            "Authorization":"Bearer "+PaypalAuthen.getPaypalToken(),
            "Coneten-Type":"application/json",
            "X-PAYPAL-SECURITY-USERID":"adminfortest2_api2.gmail.com",
            "X-PAYPAL-SECURITY-PASSWORD":"QC5VPMVMXCEHGF8Q",
            "X-PAYPAL-SECURITY-SIGNATURE":"AFcWxV21C7fd0v3bYYYRCpSSRl31AZ1-uPEogsPXrJPoQfgoFGub15S1",
            "X-PAYPAL-REQUEST-DATA-FORMAT": "NV",
            "X-PAYPAL-RESPONSE-DATA-FORMAT":"NV",
            "X-PAYPAL-APPLICATION-ID":"APP-80W284485P519543T",
            "X-PAYPAL-REQUEST-DATA-FORMAT":"JSON",
            "X-PAYPAL-RESPONSE-DATA-FORMAT":"JSON"
            },
            data: {
              "actionType":"PAY",
              "preapprovalKey":$scope.project.backer[i].preapproval,
              "feesPayer": "EACHRECEIVER",
                "receiverList":{
                  "receiver":[
                    {
                      "amount":$scope.project.backer[i].donateToSystem,
                      "email":"adminfortest2@gmail.com"
                    },
                    {
                      "amount":$scope.project.backer[i].donateToOwner,
                      "email":"dummyfortest@gmail.com"
                    }
                  ]
                },
              "returnUrl":"http://www.example.com/success.html",
              "cancelUrl":"http://www.example.com/failure.html",  
              "requestEnvelope":{
              "errorLanguage":"en_US"                        
              },
              "currencyCode": "USD"
              
            }
        }).then(
        function(data){
          console.log("Successfully created payment");
          console.log(JSON.stringify(data));
        },
        function(){
          console.log("Fil to created payment due to unexpected error.")
        });
        }
    }


    /*$scope.redirect = function(){
    var url = "https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_ap-preapproval&preapprovalkey=" + preapproval();
    console.log(preapproval());
    /*$timeout(function () {
        $window.location.href = url;
    }, 5000)
    }*/



    //$scope.getPaypalToken = function(){
    //   console.log(PaypalAuthen.getPaypalToken());
    //}




}])