angular.module('appCtrl',['ngMaterial','ui.router','ngMessages','appRoutes','authenticate','userCtrl'])

.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('teal')
    .accentPalette('blue-grey')
    .warnPalette('red')
    .backgroundPalette('blue-grey');
})


.controller('appController',['$scope','$mdSidenav', function($scope, $mdSidenav) {
  $scope.openRightMenu = function() {
    $mdSidenav('right').toggle();
  };
}]);