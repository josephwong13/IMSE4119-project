angular.module('appCtrl',['ngMaterial','ui.router','ngMessages','appRoutes','authenticate','userCtrl','projectService','projectCtrl','projectDetailCtrl','userService'])

.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('teal')
    .accentPalette('deep-purple')
    .warnPalette('red');
    //.backgroundPalette('blue-grey');
})


.controller('appController',['$scope','$mdSidenav', 'Authentication', function($scope, $mdSidenav, Authentication) {
  

  $scope.openRightMenu = function() {
    $mdSidenav('right').toggle();
  };

  $scope.status = Authentication.getStatus();
  $scope.admin = Authentication.getAdmin();

  $scope.logout = Authentication.logout;

}]);