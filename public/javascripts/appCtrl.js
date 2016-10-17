angular.module('appCtrl',['ngMaterial','ui.router','ngMessages','appRoutes','authenticate','userCtrl','projectService','projectCtrl','projectDetailCtrl'])

.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('teal')
    .accentPalette('deep-orange')
    .warnPalette('red');
    //.backgroundPalette('blue-grey');
})


.controller('appController',['$scope','$mdSidenav', 'Authentication', function($scope, $mdSidenav, Authentication) {
  

  $scope.openRightMenu = function() {
    $mdSidenav('right').toggle();
    $scope.Menuopen = !$scope.Menuopen;
  };

  $scope.status = Authentication.getStatus();

  $scope.logout = Authentication.logout;

}]);