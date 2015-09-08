angular.module('CtrlWeatherApp',['WeatherService'])
.controller('HomeController',['$scope','$location','$http','WeatherService',function($scope,$location,$http,WeatherService){
	$scope.tags = [];

	if ($location.search().cities != undefined){
		$scope.tags = $location.search().cities.split(',');
	}

	//function to load auto complete dropdown with city names
    $scope.loadTags = function($query) {
	    return WeatherService.getCityData().then(function(response) {
			      var cities = response;
			      return cities.filter(function(city) {
			        return city.name.toLowerCase().indexOf($query.toLowerCase()) != -1;
			      });
		    });
	  };

	
	
	//function to get current location weather
	$scope.getLocation = function () {
		function getWeatherByLocation(position) {
	    	$location.url('/weather/'+position.coords.latitude+'/'+position.coords.longitude);
	    	$scope.$apply();
		}
		function error() {
	    	alert("Unable to retrieve your location");
	  	};

		if (navigator.geolocation) {
	        navigator.geolocation.getCurrentPosition(getWeatherByLocation, error);
	    } else { 
	        alert("Geolocation is not supported by this browser.");
	    }
	}

	//function to get weather for seleted cities
	$scope.getWeather = function () {
		var selectedCities =[];
		angular.forEach($scope.tags,function(value){
		 selectedCities.push(value.name);
		});
		$location.url('/weather?cities=' + selectedCities);
	}
}])
.controller('WeatherController',['$scope','$location','WeatherService','$routeParams',function($scope,$location,WeatherService,$routeParams){
	$scope.weatherData = [];
	$scope.DAYS_COUNT = "14";
	$scope.UNIT = "metric";

	// this condition will be called when get weather for current location
	if ($routeParams.lat != undefined && $routeParams.lon != undefined){
		WeatherService.getWeatherForecast().query({lat:$routeParams.lat, lon:$routeParams.lon, units : $scope.UNIT, cnt : $scope.DAYS_COUNT}, function(data){
				data.show = false;
				$scope.weatherData.push(data);
	    	});
	}
	// this condition will be called when get weather for selected cities
	else{
		var citiesList  = $location.search().cities.split(',');
		
	    if (citiesList[0] != ""){
			angular.forEach(citiesList,function(value){
				WeatherService.getWeatherForecast().query({q:value, units : $scope.UNIT, cnt : $scope.DAYS_COUNT}, function(data){
					data.show = false;
					$scope.weatherData.push(data);
		    	});
			});
		}
	}

	// function to show or hide forecast div
	$scope.toogle = function (index) {
		$scope.weatherData[index].show = !$scope.weatherData[index].show;
		for (var i = 0; i < $scope.weatherData.length; i++)
	    {
	    	if (index != i)
	        $scope.weatherData[i].show = false;
	    }

	    //code to scroll page
	    $('html, body').animate({
	        scrollTop: $('.detailedForecast').eq(index).offset().top
	    }, 1500);
	}

	// function to get icon for weather forecast
	$scope.getIconSrc = function (iconId) {
	  return WeatherService.getIconImgPath(iconId);
	};
}]);