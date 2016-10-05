var kayleRead = angular.module("kayleJson", []);
kayleRead.controller("kayleCtrl", function($scope, $http) {
    $http.get("https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion/10?champData=stats&api_key=ba5c1405-42bb-4e90-bfc7-ee33f98df4bf").then(function(response) {
        $scope.myData = response.data.stats;
        console.log($scope.myData);
    });
});

var kledRead = angular.module("kledJson", []);
kledRead.controller("kledCtrl", function($scope, $http) {
    $http.get("https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion/240?champData=stats&api_key=ba5c1405-42bb-4e90-bfc7-ee33f98df4bf").then(function(response) {
        $scope.info = response;
        $scope.myData = $scope.info.data.stats;

    });
});

var khazixRead = angular.module("khazixJson", []);
khazixRead.controller("khazixCtrl", function($scope, $http) {
    $http.get("https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion/121?champData=stats&api_key=ba5c1405-42bb-4e90-bfc7-ee33f98df4bf").then(function(response) {
        $http.get("https://global.api.pvp.net/api/lol/static-data/na/v1.2/item?itemListData=stats&api_key=ba5c1405-42bb-4e90-bfc7-ee33f98df4bf").then(function(responseItem) {
            $scope.info = response;
            $scope.myData = response.data.stats;
            $scope.itemData = responseItem.data.data;
            $scope.stats = {
                isMelee: true,
                health: 0,
                healthRegen: 0,
                mana: 0,
                manaRegen: 0,
                armor: 0,
                magicResist: 0,
                movementSpeed: 0,
                cdr: 0,
                tenacity: 0,
                attackDamage: 0,
                attackSpeed: 0,
                critChance: 0,
                abilityPower: 0,
                lifeSteal: 0,
                flatArmorPen: 0,
                percentArmorPen: 0,
                flatMagicPen: 0,
                percentMagicPen: 0
            }
            var itemBuild = [-1, -1, -1, -1, -1, -1];

            $scope.checkItem = function(id) {
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

            $scope.addItem = function(id) {
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

            $scope.removeItem = function(id) {
                itemBuild[id] = -1;
                $scope.updateStats();
            }

            //This method updates the stats based on the item array
            $scope.updateStats = function() {
                //Nullifies all the stats
                $scope.stats.health = 0;
                $scope.stats.healthRegen = 0;
                $scope.stats.mana = 0;
                $scope.stats.manaRegen = 0;
                $scope.stats.armor = 0;
                $scope.stats.magicResist = 0;
                $scope.stats.movementSpeed = 0;
                $scope.stats.cdr = 0;
                $scope.stats.tenacity = 0;
                $scope.stats.attackDamage = 0;
                $scope.stats.attackSpeed = 0;
                $scope.stats.critChance = 0;
                $scope.stats.abilityPower = 0;
                $scope.stats.lifeSteal = 0;
                $scope.stats.flatArmorPen = 0;
                $scope.stats.percentArmorPen = 0;
                $scope.stats.flatMagicPen = 0;
                $scope.stats.percentMagicPen = 0;

                for (var i = 0; i < itemBuild.length; i++) {
                    var thing = "build" + i;
                    document.getElementById(thing).src = "";
                }

                //Cycles through the loop
                for (var i = 0; i < itemBuild.length; i++) {
                    if (itemBuild[i] != -1) {
                        var thing = "build" + i;
                        var itemImage = "http://ddragon.leagueoflegends.com/cdn/6.16.2/img/item/" + itemBuild[i] + ".png"
                        document.getElementById(thing).src = itemImage;

                        if ($scope.itemData[itemBuild[i]].stats.FlatHPPoolMod != null) {
                            $scope.stats.health += $scope.itemData[itemBuild[i]].stats.FlatHPPoolMod;
                        }

                        if ($scope.itemData[itemBuild[i]].stats.FlatHPRegenPoolMod != null) {
                            $scope.stats.healthRegen += $scope.itemData[itemBuild[i]].stats.FlatHPRegenPoolMod;
                        }

                        if ($scope.itemData[itemBuild[i]].stats.FlatMPPoolMod != null) {
                            $scope.stats.mana += $scope.itemData[itemBuild[i]].stats.FlatMPPoolMod;
                        }

                        if ($scope.itemData[itemBuild[i]].stats.FlatMPRegenMod != null) {
                            $scope.stats.manaRegen += $scope.itemData[itemBuild[i]].stats.FlatMPRegenMod;
                        }

                        if ($scope.itemData[itemBuild[i]].stats.FlatArmorMod != null) {
                            $scope.stats.armor += $scope.itemData[itemBuild[i]].stats.FlatArmorMod;
                        }

                        if ($scope.itemData[itemBuild[i]].stats.FlatSpellBlockMod != null) {
                            $scope.stats.magicResist += $scope.itemData[itemBuild[i]].stats.FlatSpellBlockMod;
                        }

                        if ($scope.itemData[itemBuild[i]].stats.FlatMovementSpeedMod != null) {
                            $scope.stats.movementSpeed += $scope.itemData[itemBuild[i]].stats.FlatMovementSpeedMod;
                        }

                        //5% cdr
                        if (itemBuild[i] == 3301) {
                            $scope.stats.cdr += 5;
                            if ($scope.stats.cdr > 40) {
                                $scope.stats.cdr = 40;
                            }
                        }

                        if (itemBuild[i] == 3504 || itemBuild[i] == 3060 || itemBuild[i] == 3133 || itemBuild[i] == 3812 || itemBuild[i] == 3508 || itemBuild[i] == 3108 || itemBuild[i] == 3069 || itemBuild[i] == 3401 || itemBuild[i] == 3157 || itemBuild[i] == 3050 || itemBuild[i] == 3024 || itemBuild[i] == 3065 || itemBuild[i] == 3096 || itemBuild[i] == 3067 || itemBuild[i] == 3100 || itemBuild[i] == 3190 || itemBuild[i] == 3001 || itemBuild[i] == 3092 || itemBuild[i] == 1412 || itemBuild[i] == 1400 || itemBuild[i] == 1408 || itemBuild[i] == 2301 || itemBuild[i] == 3222 || itemBuild[i] == 3083 || itemBuild[i] == 3114 || itemBuild[i] == 3101 || itemBuild[i] == 3158 || itemBuild[i] == 3142 || itemBuild[i] == 2302 || itemBuild[i] == 3057 || itemBuild[i] == 3056 || itemBuild[i] == 3152) {
                            $scope.stats.cdr += 10;
                            if ($scope.stats.cdr > 40) {
                                $scope.stats.cdr = 40;
                            }
                        }

                        if (itemBuild[i] == 3165 || itemBuild[i] == 3115 || itemBuild[i] == 3071 || itemBuild[i] == 3078 || itemBuild[i] == 3025 || itemBuild[i] == 3110 || itemBuild[i] == 3174) {
                            $scope.stats.cdr += 20;
                            if ($scope.stats.cdr > 40) {
                                $scope.stats.cdr = 40;
                            }
                        }

                        //Figure out what to do with tenacity. Probably cry


                        if ($scope.itemData[itemBuild[i]].stats.FlatPhysicalDamageMod != null) {
                            $scope.stats.attackDamage += $scope.itemData[itemBuild[i]].stats.FlatPhysicalDamageMod;
                        }

                        if ($scope.itemData[itemBuild[i]].stats.PercentAttackSpeedMod != null) {
                            $scope.stats.attackSpeed += $scope.itemData[itemBuild[i]].stats.PercentAttackSpeedMod;
                        }

                        if ($scope.itemData[itemBuild[i]].stats.FlatCritChanceMod != null) {
                            $scope.stats.critChance += $scope.itemData[itemBuild[i]].stats.FlatCritChanceMod;
                        }

                        if ($scope.itemData[itemBuild[i]].stats.FlatMagicDamageMod != null) {
                            $scope.stats.abilityPower += $scope.itemData[itemBuild[i]].stats.FlatMagicDamageMod;
                        }

                        if ($scope.itemData[itemBuild[i]].stats.PercentLifeStealMod != null) {
                            $scope.stats.lifeSteal += $scope.itemData[itemBuild[i]].stats.PercentLifeStealMod;
                        }

                        //Figure out what to do with flatArmorPen. Probably cry

                        //Figure out what to do with percentArmorPen. Probably cry

                        //Figure out what to do with flatMagicPen. Probably cry

                        //Figure out what to do with percentMagicPen. Probably cry
                    }
                }
                console.log(itemBuild);
            }
        });
    });
});


var aatroxRead = angular.module("aatroxJson", []);
aatroxRead.controller("aatroxCtrl", function($scope, $http) {
    $http.get("https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion/266?champData=stats&api_key=ba5c1405-42bb-4e90-bfc7-ee33f98df4bf").then(function(response) {
        $scope.myData = response.data.stats;
        console.log($scope.myData);
    });
});

var yasuoRead = angular.module("yasuoJson", []);
yasuoRead.controller("yasuoCtrl", function($scope, $http) {
    $http.get("https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion/157?champData=stats&api_key=ba5c1405-42bb-4e90-bfc7-ee33f98df4bf").then(function(response) {
        $http.get("https://global.api.pvp.net/api/lol/static-data/na/v1.2/item?itemListData=stats&api_key=ba5c1405-42bb-4e90-bfc7-ee33f98df4bf").then(function(responseItem) {
            $scope.myData = response.data.stats;
            $scope.itemData = responseItem.data.data;
            console.log($scope.myData);
            console.log($scope.itemData[3089]);
        });
    });
});

var mfRead = angular.module("mfJson", []);
mfRead.controller("mfCtrl", function($scope, $http) {
    $http.get("https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion/21?champData=stats&api_key=ba5c1405-42bb-4e90-bfc7-ee33f98df4bf").then(function(response) {
        $scope.myData = response.data.stats;
        console.log($scope.myData);
    });
});
