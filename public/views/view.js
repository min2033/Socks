angular.module('vizu.view',[])
  .directive('vizuView',function(){
    return {
      restrict: 'E',
      controller: 'vizuCtrl',
      template: '<h1>Data</h2><input type="text"><svg id="svgVisualize" width="1000" height="1000"></svg>'
    };
  });