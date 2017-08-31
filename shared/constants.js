angular.module('meshApp')

.constant('API_URL', {
    REMOTE: 'http://mgm2.trakmark.com/mesh-api.php',
    LOCAL: 'http://localhost:80/mesh-api/mesh-api.php'
})

//.constant('PIX_URL', 'http://mgm.trakmark.com/mesh/photos');
.constant('PIX_URL', '../../inc/photos');