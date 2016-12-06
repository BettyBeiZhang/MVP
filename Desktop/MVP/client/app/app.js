var app = angular.module('app',[
	'app.services',
	'ngRoute'
]);

app.config(function($routeProvider) {
	$routeProvider
	.when('/homepage', {
		templateUrl:"app/home/home.html",
		controller:"homePageController"
	})
	.when('/takeNote', {
		templateUrl:"app/takeNotes/takeNote.html",
		controller:"noteController"
	})
	.when('/', {
		templateUrl:"app/signin/signin.html",
		controller:"signinController"
	})
	.when('/rendernotes', {
		templateUrl:"app/rendernotes/rendernotes.html",
		controller:"rendernotesController"
	})
	.otherwise({
      redirectTo: '/'
    });
});

app.controller("homePageController", function($scope, $location, DateFactory){
	$scope.homepage = function() {
		$location.path('/homepage');
	};
    
    $scope.clickEle = function(day) {
    	$location.path('/takeNote');
        DateFactory.setDay(day); 	
	};

	$scope.dates = DateFactory.getDates();
	$scope.userName = DateFactory.getName(); 

});


app.controller("noteController", function($scope, $location, DateFactory){
	$scope.notePage = function() {
		$location.path('/takeNote');
	};

    $scope.date = DateFactory.getDate();
    $scope.userName = DateFactory.getName(); 


    $scope.collectNotes= {}; 

    $scope.all = function() {
    	console.log($scope.titleArea, $scope.textArea, $scope.date);
    	// note = {titleArea : $scope.titleArea, textArea : $scope.textArea}
	    DateFactory.getNotes({
	    	titleArea : $scope.titleArea, 
	    	textArea : $scope.textArea,
	    	date: $scope.date
	    })
	    .then(function(data) { 
	   	  $scope.collectNotes = data; 
	    });
    };
  
	
});

app.controller("rendernotesController", function($scope, $location,$http, DateFactory){
	$scope.others = function() {
		$location.path('/rendernotes');
	};

	// $scope.render = function() {
	// 	$http.get('/rendernotes').success(function(res) {
	// 		console.log(res);
	// 		$scope.textArea = res[res.length - 1].EntryText;
	// 	});
	// };
	$scope.render = function() {
		DateFactory.rendernotes(DateFactory.getDate()).then(function(data) {
			$scope.data = data;
		});
		//console.log("in render");
	};

});

app.controller("signinController",function($scope, $location, DateFactory) {

	$scope.user = {};
	$scope.setName = function(name) {	
		DateFactory.setName(name);
		$location.path('/homepage');
	};
	

});


// app.controller("others", function($scope){
// 	$scope.others = function() {
// 		$location.path("/others");
// 	};

// });