angular.module('articleController', ['ckeditor'])
    .controller('articleCtrl', ['$rootScope', '$scope', '$http', 'toaster', '$location', '$localStorage', '$timeout', 'Upload', 'imgService', function($rootScope, $scope, $http, toaster, $location, $localStorage, $timeout, Upload, imgService) {

        if (!$localStorage.user_login) {
            $location.path('/login');
        }

        var id = null;

        // $scope.submit = function() {
        //     upload($scope.file); //call upload function
        // }

        // upload = function(file) {

        //     getArticleId();
        //     $scope.$on('eventName', function(event, args) {
        //         var ii;
        //         $scope.message = args.message;
        //         console.log("event",$scope.message);
        //     });

        //     Upload.upload({
        //         url: '/api/upload/',
        //         data: {
        //             file: file
        //         }
        //     }).then(function(resp) {

        //         // console.log(resp.data);
        //         $scope.img_path = resp.data.data;
        //         console.log("img_path", $scope.img_path);

        //         $scope.img = {};

        //         $scope.img.img = $scope.img_path;
        //         $scope.img.user_id = $localStorage.user_id;

        //         console.log("img", $scope.img);

        //         $http.post('/api/saveImage/', $scope.img)
        //             .then(function onSuccess(response) {
        //                 console.log(response.data);
        //             }, function onError(response) {
        //                 console.log(response.data);
        //             });

        //     }, function(resp) { //catch error
        //         console.log('Error status: ' + resp.status);
        //     });
        // };

        // $scope.getImage = function(){
        //     $http.get('/api/getImage/')
        //     .then(function onSuccess(response){
        //         console.log(response.data[0].img.data.data);
        //         $scope.img = response.data[0].img.data.data;
        //     },function onError(response){
        //         console.log(response.data);
        //     })
        // }

        upload = function(file) {

            Upload.upload({
                url: '/api/upload/',
                data: {
                    file: file
                }
            }).then(function(resp) {

                // console.log(resp.data);
                $scope.img_path = resp.data.data;
                console.log("img_path", $scope.img_path);

                $scope.article.file = $scope.img_path;

                // var dt = new Date();
                // var d = dt.toLocaleDateString();
                // $scope.article.date = d;

                $scope.article.user_id = $localStorage.user_id;

                console.log($scope.article);

                $http.post('/api/addArticle/', $scope.article)
                    .then(function onSuccess(response) {
                        toaster.success('Successfully', "Article Posted", "text");
                        console.log(response.data);

                        $scope.article = { };

                        $timeout(function() {
                            $location.path('/');
                        }, 1000);

                    }, function onError(response) {
                        console.log(response.data);
                    });

            }, function(resp) { //catch error
                console.log('Error status: ' + resp.status);
            });
        };


        $scope.addArticle = function() {

            upload($scope.article.file);

            // console.log($scope.article);

            // upload($scope.article.file); //call upload function
        }

        // Editor options.
        $scope.options = {
            language: 'en',
            allowedContent: true,
            entities: false
        };

        // Called when the editor is completely ready.
        $scope.onReady = function() {
            // ...
        };

        function getArticleId() {
            $http.get('/api/getArticleId/' + $localStorage.user_id)
                .then(function onSuccess(response) {

                    $scope.$emit('eventName', {
                        message: response.data.data
                    });

                    $rootScope.articleId = response.data.data;
                    article_iid = $rootScope.articleId;
                    console.log("article_id", $rootScope.articleId);
                }, function onError(response) {
                    console.log(response.data);
                })
        }

    }]);