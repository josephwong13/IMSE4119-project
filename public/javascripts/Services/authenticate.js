angular.module('authenticate',[])

.factory('Authentication',['$window','$http', function($window, $http){

    var url = "http://localhost:3000/users";

    function saveToken(token, _id, username){
        $window.localStorage['mytoken'] = token;
        $window.localStorage['status'] = true;
        $window.localStorage['_id'] = _id;
        $window.localStorage['username'] = username;
    }

    function getToken(){
        return $window.localStorage['mytoken'];
    }

    function getId(){
        return $window.localStorage['_id'];
    }

    function getName(){
        return $window.localStorage['username'];
    }

    function logout(){
        $window.localStorage.removeItem('mytoken');
        $window.localStorage.removeItem('status');
        $window.localStorage.removeItem('_id');
        $window.location.href = '/';
    }

    function register(user){
        $http.post(url + '/register', user).then(
            function(data){
                console.log('successfully register');
                $window.location.href = '/';
                $window.alert("Registration successful. Please login to use more function");
            },
            function(err){
                console.log('Fail to register user');
            })
    }

    function login(user){
        $http.post(url + '/login', user).then(
            function(data){
                console.log("successfully login");
                saveToken(data.data.token, data.data._id, data.data.username);
                $window.location.href = '/';
            },
            function(err){
                console.log('Fail to login user');
                $window.alert('Username or password incorrect');
            })
    }

    function getStatus(){
        return $window.localStorage['status'];
    }


    return {
        register: register,
        login: login,
        saveToken: saveToken,
        getToken: getToken,
        logout: logout,
        getStatus: getStatus,
        getId: getId,
        getName: getName
    }
}])

.factory('isUsernameAvailable', function($q, $http) {
  return function(username) {
    var deferred = $q.defer();
    var url = "http://localhost:3000/users";

    $http.get(url + '/username/' + username).then(function(data) {
        if(data.data==null){
            deferred.resolve();
        }
        else{
            deferred.reject();
        }
      // Found the user, therefore not unique.
      
    });

    return deferred.promise;
  }
});