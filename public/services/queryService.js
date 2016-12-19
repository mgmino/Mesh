angular.module("services")
.service("queryService", ["$http", function($http) {

    var mockContacts = [
        {
            id: 0,
            name: "Brandon Mino",
            favorite: true,
            job: "Sparc",
            email: "bmino@aol.com",
            phone: "1231234"
        },
        {
            id: 1,
            name: "Michael Mino",
            favorite: false,
            job: "Sabai Technology",
            email: "mmino@aol.com",
            phone: "1231234"
        },
        {
            id: 2,
            name: "Lynn Mino",
            favorite: false,
            job: "Retired",
            email: "lmino@aol.com",
            phone: "1231234"
        },
        {
            id: 3,
            name: "Erika Mino",
            favorite: true,
            job: "IBM",
            email: "emino@aol.com",
            phone: "1231234"
        }
    ];

    this.getAllContacts = function() {
        return $http({
            method : "GET",
            url : "/api/db/getContacts"
        }).then(function mySucces(response) {
            return response.data;
        });
    };

    this.getFavoriteContacts = function() {
        return new Promise(function(resolve, reject) {
            var favorites = [];
            angular.forEach(mockContacts, function(contact) {
                if (contact.favorite) favorites.push(contact);
            });
            resolve(favorites);
        });
    };

    this.getContactById = function(id) {
       return $http({
            method : "GET",
            url : "/api/db/getContactById/" + id
        }).then(function mySucces(response) {
            return response.data[0];
        });
    };

}]);