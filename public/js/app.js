angular.module('WeatherApp',['ngRoute','ngResource','CtrlWeatherApp','ngTagsInput'])
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