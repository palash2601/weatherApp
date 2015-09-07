angular.module('WeatherApp',['ngRoute','ngResource','CtrlWeatherApp','ngTagsInput'])
/*.factory('CityDataService',['$http','$q',function($http, $q){
	//var defer = $q.defer();

	var promise = $http.get('city.list.json')
	 	.success(function(data){
	 	return data;
	 });	


	return promise;
}])*/
.config(['$routeProvider',function($routeProvider){
	$routeProvider
	.when('/',{
		templateUrl:'partials/home.html'
	})
	.when('/weather/:lat?/:lon?',{
		templateUrl:'partials/weather.html',
		controller: 'WeatherController'
	})
	.otherwise({
	    redirectTo: '/'
	  });

}]);