angular.module('userLoginController', [])
    .controller('userLoginCtrl', ['$scope', '$http', 'toaster', '$location', '$localStorage', '$timeout', '$window', function($scope, $http, toaster, $location, $localStorage, $timeout, $window) {

        $scope.emailPattern = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
        $scope.passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;

        $scope.loginUser = function() {
            $http.post('/api/login/', $scope.user)
                .then(function onSuccess(response) {
                    toaster.success('Successfully', "User Logged In", "text");
                    console.log(response.data);
                    $localStorage.user_id = response.data.data._id;
                    $localStorage.user_login = true;

                    $timeout(function() {
                        $location.path('/addArticle');
                    }, 2000);


                }, function onError(response) {
                    console.log(response.data);
                });
        }

        $window.localStorage.clear();

    }]);