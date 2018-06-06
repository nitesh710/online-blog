angular.module('userRegisterController', [])
    .controller('userRegisterCtrl', ['$scope', '$http', '$location', 'toaster', '$timeout', function($scope, $http, $location, toaster, $timeout) {
        
        $scope.emailPattern = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
        $scope.onlyTextPattern = /^[a-zA-Z]*$/;
        $scope.passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;

        $scope.registerUser = function() {
            $http.post('/api/register/', $scope.user)
                .then(function onSuccess(response) {
                    toaster.success('Successfully', "User registered", "text");
                    console.log(response.data);
                    $timeout(function() {
                        $location.path('/addArticle');
                    }, 2000);
                }, function onError(response) {
                    console.log(response.data);
                });
        }

    }]);