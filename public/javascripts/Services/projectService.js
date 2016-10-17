angular.module('projectService',[])

.factory('Project',['$resource','Authentication', function($resource,Authentication){
    var url = "http://localhost:3000/projects/:id";
    return $resource(url,{ id: '@_id' },{
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
        }
    });
}])
