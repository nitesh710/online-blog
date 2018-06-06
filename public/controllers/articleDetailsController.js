angular.module('articleDetailsController', [])
    .controller('articleDetailsCtrl', ['$scope', '$http', '$window', 'articleService', '$localStorage', '$routeParams', function($scope, $http, $window, articleService, $localStorage, $routeParams) {

        console.log($routeParams.article_id);
        $scope.article = {};

        function getArticle() {

            $http.get('/api/getArticle/' + $routeParams.article_id)
                .then(function onSuccess(response) {

                    // $scope.user_idd = response.data.data.user_id;
                    
                    // getImage();

                    // $http.get('/api/getImage/' + $scope.user_idd)
                    //     .then(function onSuccess(response) {
                    //         console.log("Image from db", response.data.img);
                    //         $scope.img = response.data.img;
                    //     }, function onError(response) {
                    //         console.log(response.data);
                    //     });

                    console.log("article", response.data);
                    $scope.article = response.data.data;

                    $http.get('/api/getUser/' + $scope.article.user_id)
                    .then(function onSuccess(response){
                        console.log("user",response.data);
                        $scope.article.author = response.data.data.name;
                    },function onError(response){
                        console.log(response.data);
                    })

                    getComments();

                }, function onError(response) {
                    console.log(response.data);
                });
        }
        getArticle();
        var heading = articleService.getArticleName();
        var articles = null;

        $http.get('/api/getArticles/')
            .then(function onSuccess(response) {
                articles = response.data;

            }, function onError(response) {
                console.log(response.data);
            });

        console.log($scope.article_id);



        $scope.addComment = function() {

            $scope.comment.user_id = $localStorage.user_id;
            $scope.comment.article_id = $scope.article._id;

            $http.post('/api/addComment/', $scope.comment)
                .then(function onSuccess(response) {
                    getArticle();
                    console.log(response.data);

                    $scope.comment = {};

                }, function onError(response) {
                    console.log(response.data);
                })
        }

        function getComments() {

            $http.get('/api/getAllComments/' + $scope.article._id)
                .then(function onSuccess(response) {
                    console.log(response.data);
                    var comments = response.data;
                    $scope.commentList = comments;
                }, function onError(response) {
                    console.log(response.data);
                });
        }

        // function getImage() {

        //     $http.get('/api/getImage/' + $localStorage.user_id)
        //         .then(function onSuccess(response) {
        //             console.log("Image from db", response.data.img);
        //             $scope.img = response.data.img;
        //         }, function onError(response) {
        //             console.log(response.data);
        //         });
        // }
    }]);