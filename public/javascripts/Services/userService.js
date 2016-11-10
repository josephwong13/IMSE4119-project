angular.module('userService',[])

.factory('User',['$resource','Authentication', function($resource,Authentication){

    var baseurl = "https://imse4119project.herokuapp.com";
    //var baseurl = "http://localhost:3000";

    var url = baseurl + "/users/:id";

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
            url: baseurl + "/users/userupdate/:id",
            method: 'PUT',
            headers: { 'x-access-token': Authentication.getToken(),
                        'user-id': Authentication.getId()}
        }
    });
}])