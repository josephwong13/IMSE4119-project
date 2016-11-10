angular.module('userService',[])

.factory('User',['$resource','Authentication', function($resource,Authentication){
    var url = "mongodb://admin:1234@ds149577.mlab.com:49577/heroku_13mrtrxj/users/:id";
    //var url = "http://localhost:3000/users/:id";
    return $resource(url,{ id: '@_id' },{
        query: {
            method: 'GET',
            isArray: true,
            headers: { 'x-access-token': Authentication.getToken() }
        },

        update: {
            method: 'PUT',
            headers: { 'x-access-token': Authentication.getToken() }
        },
        save: {
            method: 'POST',
            headers: { 'x-access-token': Authentication.getToken() }
        },
        delete: {
            method: 'DELETE',
            headers: { 'x-access-token': Authentication.getToken() }
        },
        userupdate: {
            url: "http://localhost:3000/users/userupdate/:id",
            method: 'PUT',
            headers: { 'x-access-token': Authentication.getToken(),
                        'user-id': Authentication.getId()}
        }
    });
}])