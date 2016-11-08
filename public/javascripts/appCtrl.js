angular.module('appCtrl',['ngMaterial','ui.router','ngMessages','appRoutes','base64','authenticate','userCtrl','projectService','projectCtrl','projectDetailCtrl','userService','paypalCtrl','paypalAuthen','userProfileCtrl'])

.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('teal')
    .accentPalette('amber')
    .warnPalette('red');
    //.backgroundPalette('blue-grey');
})


.controller('appController',['$scope','$mdSidenav', 'Authentication', function($scope, $mdSidenav, Authentication) {
  

  $scope.openRightMenu = function() {
    $mdSidenav('right').toggle();
  };

  $scope.status = Authentication.getStatus();
  $scope.admin = Authentication.getAdmin();
  $scope.user_id = Authentication.getId();

  $scope.logout = Authentication.logout;

}]);