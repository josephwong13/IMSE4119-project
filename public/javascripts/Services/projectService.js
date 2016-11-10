angular.module('projectService',[])

.factory('Project',['$resource','Authentication', function($resource,Authentication){
    var baseurl = "https://imse4119project.herokuapp.com";
    //var baseurl = "http://localhost:3000";

    var url = baseurl + "/projects/:id";

    return $resource(url,{ id: '@_id' },{
        update: {
            method: 'PUT',
            headers: { 'x-access-token': Authentication.getToken(),
                        'user-id': Authentication.getId() }
        },
        save: {
            method: 'POST',
            headers: { 'x-access-token': Authentication.getToken() }
        },
        delete: {
            method: 'DELETE',
            headers: { 'x-access-token': Authentication.getToken() }
        },
        approve: {
            url: baseurl + "/projects/:id/admin",
            method: 'PUT',
            headers: { 'x-access-token': Authentication.getToken() }
        },
        support: {
            url: baseurl + "/projects/:id/backer",
            method: 'PUT',
            headers: { 'x-access-token': Authentication.getToken() ,
                        'user-id': Authentication.getId()
                     }
        },
        comment: {
            url: baseurl + "/projects/:id/comment",
            method: 'PUT',
            headers: { 'x-access-token': Authentication.getToken()}
        },
    });
}])
