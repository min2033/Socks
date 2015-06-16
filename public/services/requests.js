angular.module('vizu.reqs',[])
  .factory('reqs',function($http){

    var getData = function(data){
      return $http({
        method: 'POST',
        url: '/data',
        data: data
      });
    };

    return {
      getData: getData
    };
  });