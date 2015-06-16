angular.module('vizu',[
  'ui.router',
  'vizu.ctrl',
  'vizu.reqs',
  'ngAnimate',
  'ngFx'
  ])
  .config(function($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise('/');
    
    $stateProvider
      .state('/',{
        url:'/',
        templateUrl: 'views/view.html',
        controller: 'vizuCtrl'
      });
  });