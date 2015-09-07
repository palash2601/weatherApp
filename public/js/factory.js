angular.module('WeatherService',[])
.factory('WeatherService',['$resource','$q','$http',function($resource,$q,$http){
	return {
		getWeatherForecast : function () {
			return $resource(
		        "http://api.openweathermap.org/data/2.5/forecast/daily",
		        {},
		        { query: {method: 'GET', isArray: false}}
		    );	
		},
		getIconImgPath : function (iconId) {
			return 'http://openweathermap.org/img/w/' + iconId +'.png';
		},
		getCityData : function (argument) {
			var deferred = $q.defer();
			var promise = $http.get('../city.list.json',{ cache: true})
			 	.success(function(data){
			 		deferred.resolve(data);
			 	})
			 	.error(deferred.reject);	
			return deferred.promise;
		}
	}
}]);