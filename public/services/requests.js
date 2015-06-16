angular.module('vizu.reqs',[])
  .factory('reqs',function($http){

    var getData = function(){
      return $http({
        method: 'GET',
        url: '/data'
      });
    };

    return {
      getData: getData
    };
  });