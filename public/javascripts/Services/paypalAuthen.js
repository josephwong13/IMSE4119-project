angular.module('paypalAuthen',[])

.factory('PaypalAuthen',['$window','$http','$base64', function($window, $http, $base64){

    var url = "https://api.sandbox.paypal.com/v1/oauth2/token";
    var id = "AbY3KrjQZggapr1kLzLeQopMxX7Zow7WzL4CbxKC4otpdhJcg9XoxwBRTKUo1XDiW23M6I3LQ2bgRdC8";
    var secret = "ECGGBiNekoBHASMN8QsgT8wOOWAyhr1e-p7wbCxXLzL_KH6k9x34izQFtpfXto2iQ6uJGiKDd48rcwp_";


    function encode(){
        var fullstring = id + ":" + secret;
        var encoded = "Basic " + $base64.encode(fullstring);
        return encoded;
    }

    function getPaypalToken(){
        $http({
            method: "POST",
            url: url,
            headers: {
            "Authorization":encode(),
            'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: 'grant_type=client_credentials'
        })
        .then(
        function(data){
            console.log("Successfully get paypal token!");
            return data.data.access_token;
        },
        function(err){
            console.log('Fail due to unexpected error');
        })
    }
    /*
    function saveToken(token, _id, username,admin){
        $window.localStorage['mytoken'] = token;
        $window.localStorage['status'] = true;
        $window.localStorage['_id'] = _id;
        $window.localStorage['username'] = username;
        $window.localStorage['admin'] = admin;
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

    function logout(){
        $window.localStorage.removeItem('mytoken');
        $window.localStorage.removeItem('status');
        $window.localStorage.removeItem('_id');
        $window.localStorage.removeItem('username');
        $window.localStorage.removeItem('admin');
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
                saveToken(data.data.token, data.data._id, data.data.username,data.data.admin);
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
    */

    return {
        getPaypalToken: getPaypalToken
    }
}])

