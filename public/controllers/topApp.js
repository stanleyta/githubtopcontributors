
var mainApp = angular.module('topApp', ['ngGrid']);

mainApp.controller('githubGridCtrl', ['$scope', 'mainInfoFactory', function($scope, mainInfoFactory) {
    $scope.urlInput = '/repos/stanleyta/githubtopcontributors/contributors';
    $scope.retrieve = function() {
        mainInfoFactory.get($scope.urlInput).then(function (res) {
            console.log(res.data);
            var array = $.makeArray(res.data);
            //filter the data
            $.each(res.data, function (key, value) {
                $.each(value, function (in_key, in_value) {
                    if (in_key != "login" && in_key != "id" && in_key != "contributions") {
                        delete res.data[key][in_key];
                    }
                });
            });

            //sort the data
            array.sort(function (a, b) {
                return b.contributions - a.contributions
            });

            //trim the data
            var i = 1;
            $.each(array, function (key, value) {
                if (i <= 10) {
                    value["rank"] = i;
                } else {
                    delete array[key];
                }
                i++;
            });

            $scope.myData = array;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        }, function (err) {
            console.error('Error', err);
        });

        console.log(mainInfoFactory);
    }
    $scope.gridOptions = { data: 'myData', plugins: [new ngGridFlexibleHeightPlugin()] };

}]);

mainApp.factory('mainInfoFactory', ['$http', function($http) {
    var factory = {};

    factory.get = function(url) {
        return $http({method: 'GET', url: '/api/get', params: {url: url, "url": url }});
    };

    return factory;
}]);
//mainApp.service('mainInfoService', ['$http', function($http) {
//    this.get = function(url) {
//        return $http({method: 'GET', url: '/api/get/', data: url});
//    };
//}]);