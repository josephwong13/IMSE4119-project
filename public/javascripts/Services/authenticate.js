angular.module('authenticate',[])

.factory('Authentication',['$window','$http', function($window, $http){

    var url = "https://imse4119project.herokuapp.com/users";
    //var url = "http://localhost:3000/users";

    function saveToken(token, _id, username,admin,pic){
        $window.localStorage['mytoken'] = token;
        $window.localStorage['status'] = true;
        $window.localStorage['_id'] = _id;
        $window.localStorage['username'] = username;
        $window.localStorage['admin'] = admin;
        $window.localStorage['pic'] = pic;
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

    function getAdmin(){
        if($window.localStorage['admin'] == "false" || $window.localStorage['admin'] == null){
            return false;
        }
        return true;
    }

    function getPic(){
        return $window.localStorage['pic'];
    }

    function logout(){
        $window.localStorage.removeItem('mytoken');
        $window.localStorage.removeItem('status');
        $window.localStorage.removeItem('_id');
        $window.localStorage.removeItem('username');
        $window.localStorage.removeItem('admin');
        $window.localStorage.removeItem('pic');
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
                $window.alert("Username has been taken.")
            })
    }

    function login(user){
        $http.post(url + '/login', user).then(
            function(data){
                console.log("successfully login");
                saveToken(data.data.token, data.data._id, data.data.username,data.data.admin,data.data.pic);
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
        getName: getName,
        getAdmin: getAdmin,
        getPic: getPic
    }
}])

/*
.factory('isUsernameAvailable', function($q, $http) {
  return function(username) {
    var deferred = $q.defer();
    var url = url;

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