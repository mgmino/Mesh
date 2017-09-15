angular.module('common')
.service('toggleService', [function() {

    var api, pix;
	var API_URL= {
		REMOTE: 'http://mgm2.trakmark.com/mesh-api.php',
		LOCAL: 'http://localhost:80/mesh-api/mesh-api.php'
	};
	var PIX_URL= {
		REMOTE: 'http://mgm.trakmark.com/mesh/photos',
		LOCAL: '../../inc/photos'
	};

    this.getAPI = function() {
        return api;
    };

    this.getPIX = function() {
        return pix;
    };

    this.setLocal = function() {
        api= API_URL.LOCAL;
		pix= PIX_URL.LOCAL;
    };

    this.setRemote = function() {
        api= API_URL.REMOTE;
		pix= PIX_URL.REMOTE;
    };

    this.isRemote = function() {
        return this.getAPI() == API_URL.REMOTE;
    };

    /* Defaults to remote */
	this.setRemote();

}]);
