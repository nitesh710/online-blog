angular.module('imageService', [])
.factory('imgService', function(){
	var imgUrl = { };

	return{
		getImgUrl: function(){
			return imgUrl;
		},
		setImgUrl: function(value){
			imgUrl = value;
		}
	}
});