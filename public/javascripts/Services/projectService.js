angular.module('projectService',[])

.factory('Project',['$resource','Authentication', function($resource,Authentication){
    var url = "http://localhost:3000/projects/:id";
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
            url: "http://localhost:3000/projects/:id/admin",
            method: 'PUT',
            headers: { 'x-access-token': Authentication.getToken() }
        },
        support: {
            url: "http://localhost:3000/projects/:id/backer",
            method: 'PUT',
            headers: { 'x-access-token': Authentication.getToken() ,
                        'user-id': Authentication.getId()
                     }
        },
        comment: {
            url: "http://localhost:3000/projects/:id/comment",
            method: 'PUT',
            headers: { 'x-access-token': Authentication.getToken()}
        },
    });
}])
