angular.module('articleNameService', [])
.factory('articleService', function(){
	var articleName = null;

	return{
		getArticleName: function(){
			return articleName;
		},
		setArticleName: function(value){
			articleName = value;
		}
	}
});