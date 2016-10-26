angular.module('paypalService',[])

.factory('Paypal',['$resource', function($resource){
    return $resource({
        authenticate: {
            method: 'POST',
            headers: { 'x-access-token': "" }
        }
    });
}])