angular.module('vizu',[])
  .controller('vizuCtrl',function($scope){
    $scope.something = 'some data';
  })
  .directive('vizuView',function(){
    return {
      restrict: 'E',
      controller: 'vizuCtrl',
      template: '{{something}}'
    };
  });