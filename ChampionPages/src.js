var kayleRead = angular.module("kayleJson", []);
kayleRead.controller("kayleCtrl", function ($scope, $http) {
    $http.get("https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion/10?champData=stats&api_key=ba5c1405-42bb-4e90-bfc7-ee33f98df4bf").then(function (response) {
        $scope.myData = response.data.stats;
        console.log($scope.myData);
    });
});

var aatroxRead = angular.module("aatroxJson", []);
aatroxRead.controller("aatroxCtrl", function ($scope, $http) {
    $http.get("https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion/266?champData=stats&api_key=ba5c1405-42bb-4e90-bfc7-ee33f98df4bf").then(function (response) {
        $scope.myData = response.data.stats;
        console.log($scope.myData);
    });
});

var yasuoRead = angular.module("yasuoJson", []);
yasuoRead.controller("yasuoCtrl", function ($scope, $http) {
    $http.get("https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion/157?champData=stats&api_key=ba5c1405-42bb-4e90-bfc7-ee33f98df4bf").then(function (response) {
        $scope.myData = response.data.stats;
        console.log($scope.myData);
    });
});

var mfRead = angular.module("mfJson", []);
mfRead.controller("mfCtrl", function ($scope, $http) {
    $http.get("https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion/21?champData=stats&api_key=ba5c1405-42bb-4e90-bfc7-ee33f98df4bf").then(function (response) {
        $scope.myData = response.data.stats;
        console.log($scope.myData);
    });
});
