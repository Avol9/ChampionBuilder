var kayleRead = angular.module("kayleJson", []);
kayleRead.controller("kayleCtrl", function ($scope, $http) {
    $http.get("https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion/10?champData=stats&api_key=ba5c1405-42bb-4e90-bfc7-ee33f98df4bf").then(function (response) {
        $scope.myData = response.data.stats;
        console.log($scope.myData);
    });
});

var kledRead = angular.module("kledJson", []);
kledRead.controller("kledCtrl", function ($scope, $http) {
    $http.get("https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion/240?champData=stats&api_key=ba5c1405-42bb-4e90-bfc7-ee33f98df4bf").then(function (response) {
        $scope.info = response;
        $scope.myData = $scope.info.data.stats;

    });
});

var khazixRead = angular.module("khazixJson", []);
khazixRead.controller("khazixCtrl", function ($scope, $http) {
    $http.get("https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion/121?champData=stats&api_key=ba5c1405-42bb-4e90-bfc7-ee33f98df4bf").then(function (response) {
        $http.get("https://global.api.pvp.net/api/lol/static-data/na/v1.2/item?itemListData=stats&api_key=ba5c1405-42bb-4e90-bfc7-ee33f98df4bf").then(function (responseItem) {
            $scope.info = response;
            $scope.myData = response.data.stats;
            $scope.itemData = responseItem.data.data;
            $scope.stats = {
                isMelee: true,
                health: 0,
                healthRegen: 0,
                attackDamage: 0,
                abilityPower: 0,
                attackSpeed: 0
            }
            var itemBuild = [-1, -1, -1, -1, -1, -1];

            $scope.checkItem = function (id) {
                if (id == 3077 || id == 3074 || id == 3748) {
                    if (!$scope.stats.isMelee) {
                        return false;
                    }
                }
                if (id == 3085) {
                    if ($scope.stats.isMelee) {
                        return false;
                    }
                }
                return true;
            }

            $scope.addItem = function (id) {
                if ($scope.checkItem(id)) {
                    console.log("addItem() works");
                    for (var i = 0; i < itemBuild.length; i++) {
                        if (itemBuild[i] == -1) {
                            itemBuild[i] = id;
                            $scope.updateStats();
                            break;
                        }
                    }
                }
            }

            $scope.removeItem = function (id) {
                itemBuild[id] = -1;
                $scope.updateStats();
            }

            $scope.updateStats = function () {
                $scope.stats.health = 0;
                $scope.stats.healthRegen = 0;
                $scope.stats.attackDamage = 0;
                $scope.stats.attackSpeed = 0;
                $scope.stats.abilityPower = 0;
                for (var i = 0; i < itemBuild.length; i++) {
                    if (itemBuild != -1) {

                    }
                }
                console.log(itemBuild);
                console.log("updateStats() works");
            }

            console.log($scope.itemData[3089].stats);
        });
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
        $http.get("https://global.api.pvp.net/api/lol/static-data/na/v1.2/item?itemListData=stats&api_key=ba5c1405-42bb-4e90-bfc7-ee33f98df4bf").then(function (responseItem) {
            $scope.myData = response.data.stats;
            $scope.itemData = responseItem.data.data;
            console.log($scope.myData);
            console.log($scope.itemData[3089]);
        });
    });
});

var mfRead = angular.module("mfJson", []);
mfRead.controller("mfCtrl", function ($scope, $http) {
    $http.get("https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion/21?champData=stats&api_key=ba5c1405-42bb-4e90-bfc7-ee33f98df4bf").then(function (response) {
        $scope.myData = response.data.stats;
        console.log($scope.myData);
    });
});
