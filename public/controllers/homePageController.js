angular.module('homePageController', [])
    .controller('homePageCtrl', ['$scope', '$http', "toaster", 'NgTableParams', '$location', 'articleService', '$localStorage', function($scope, $http, toaster, NgTableParams, $location, articleService, $localStorage) {

        var articles = null;

        $http.get('/api/getArticles/')
            .then(function onSuccess(response) {
                toaster.success('Successfully', "Articles Loaded", "text");

                articles = response.data;

                $scope.headingList = articles;

                $scope.filter = {
                    heading: ''
                };

                $scope.tableParams = new NgTableParams({
                    page: 1,
                    count: 5,
                    filter: $scope.filter
                }, {
                    total: $scope.headingList.length,
                    counts: [],
                    dataset: $scope.headingList
                });


            }, function onError(response) {
                console.log(response.data);
            });
    }]);