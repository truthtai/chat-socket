var app = angular.module('App', 
	[			
		'ngAnimate',		
		'ngMaterial',
		'ui.router',
		'lbServices',
        'HomeModule',
        'LoginModule',	
        'SignupModule',	
	]
);

app.config(function($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider, LoopBackResourceProvider) {  
    
    $urlRouterProvider.otherwise( function($injector) {
        	var $state = $injector.get("$state");
            $state.go("home");
        }); // Mọi đường dẫn không hợp lệ đều được chuyển đến state home
    $stateProvider
		.state('home', {    // Định ngĩa 1 state home
            url: '/home',  // khai báo Url hiển thị
            templateUrl: 'components/home/home.html',  // đường dẫn view
            controller: 'HomeCtrl', 
            controllerAs: 'home',
            requireLogin: true
        })
    .state('login', {    // Định ngĩa 1 state home
            url: '/login',  // khai báo Url hiển thị
            templateUrl: 'components/login/login.html',  // đường dẫn view
            controller: 'LoginCtrl',  
            controllerAs: 'login'
        })
    .state('signup', {    // Định ngĩa 1 state home
            url: '/signup',  // khai báo Url hiển thị
            templateUrl: 'components/signup/signup.html',  // đường dẫn view
            controller: 'SignupCtrl', 
            controllerAs: 'signup'
        });
		
   $httpProvider.defaults.useXDomain = true;
   delete $httpProvider.defaults.headers.common['X-Requested-With'];

});
app.run(function ($rootScope, $state, $http, LoopBackAuth) {
 
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, error) {
    var requireLogin = toState.requireLogin;
    if (requireLogin && !LoopBackAuth.accessTokenId) {
      event.preventDefault();
      $state.go('login');
    }
    
  });

});


app.controller('AppCtrl', AppCtrl);

function AppCtrl (){
	
}

var socket = io();