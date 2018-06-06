angular.module('routes', [])
.config(['$routeProvider', function($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl: '../views/homePage.html',
		controller: 'homePageCtrl'
	})
	.when('/register', {
		templateUrl: '../views/userSignUp.html',
		controller: 'userRegisterCtrl'
	})
	.when('/login', {
		templateUrl: '../views/userLogin.html',
		controller: 'userLoginCtrl'
	})
	.when('/logout',{
		templateUrl: '../views/userLogin.html',
		controller: 'userLoginCtrl'
	})
	.when('/addArticle', {
		templateUrl: '../views/articlePage.html',
		controller: 'articleCtrl'
	})
	.when('/details/:article_id', {
		templateUrl: '../views/articleDetailsPage.html',
		controller: 'articleDetailsCtrl'
	})
}]);