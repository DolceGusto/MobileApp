angular.module('App', ['ionic'])
.config(function($urlRouterProvider,$stateProvider){

  $stateProvider
    .state('login',{
    url:'/login',
    templateUrl:'views/login/login.html'
  })
    .state('home',{
      url:'/home',
      templateUrl:'views/home/home.html'
    })
    .state('home.dashboard',{
      url:'/dashboard',
      templateUrl:'views/dashboard/dashboard.html',
      abstract:true
    })
    .state('home.dashboard.profile',{
      url:'/profile',
      views:{
        'profile-tab':{
          templateUrl:'views/profile/profile.html'
        }
      }
    })
    .state('home.dashboard.stat',{
      url:'/stat',
      views:{
        'stat-tab' : {
          templateUrl:'views/stat/stat.html'
        }
      }
    })
    .state('home.comptes',{
      url:'/comptes',
      templateUrl:'views/comptes/comptes.html',
      controller:'ComptesController'
    })
    .state('home.entrees',{
      url:'/entrees',
      templateUrl:'views/transactions/entrees/entrees.html',
      controller:'EntreesController'
    })
    .state('home.depenses',{
      url:'/depenses',
      templateUrl:'views/transactions/depenses/depenses.html',
      controller:'DepensesController'
    })
    .state('home.transferts',{
      url:'/transferts',
      templateUrl:'views/transferts/transferts.html'
    })
    .state('home.categories',{
      url:'/categories',
      templateUrl:'views/categories/categories.html',
      controller:'CategoriesController'
    })
    .state('home.budget',{
      url:'/budget',
      templateUrl:'views/budget/budget.html'
    })
  ;

  $urlRouterProvider.otherwise('/login');
})
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
