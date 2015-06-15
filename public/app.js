angular.module('vizu',['ui.router'])
  .config(function($stateProvider){
    $stateProvider
      .state('data',{
        url:'/data',
        template: '{{something}}',
        controller: 'vizuCtrl'
      });
  })
  .controller('vizuCtrl',function($scope){
    $scope.something = 'some data';
  })
  .directive('vizuView',function(){
    return {
      restrict: 'E',
      controller: 'vizuCtrl',
      template: '{{something}} <a href="/data">click</a>'
    };
  });