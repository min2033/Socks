angular.module('vizu.ctrl',[])
  .controller('vizuCtrl',function($scope,reqs){
    $scope.data = [];

    $scope.getData = function(){
      reqs.getData().then(function(res){
        $scope.data = res.data;
      });
    };

    $scope.initialize = function(){
      reqs.getData().then(function(res){
        $scope.render(res.data);
      })
    };

    $scope.render = function(data){
      var vis = d3.select("#svgVisualize");

      var xRange = d3.scale.linear()
                    .range([40,800])
                    .domain([d3.min(data,function(d){
                      return d.price;
                    }), d3.max(data,function(d){
                      return d.price;
                    })]);

      var yRange = d3.scale.linear()
                    .range([40,500])
                    .domain([d3.max(data,function(d){
                      return d.volume;
                    }), d3.min(data,function(d){
                      return d.volume;
                    })]);

      var xAxis = d3.svg.axis().scale(xRange);
      var yAxis = d3.svg.axis().scale(yRange).orient("left");

      vis.selectAll('g').remove();

      vis.append('svg:g').call(xAxis).attr("transform","translate(0,500)");
      vis.append('svg:g').call(yAxis).attr("transform","translate(40,0)");

      var elem = vis.selectAll('g').data(data);

      var elemEnter = elem.enter().append('g');


      var circle = elemEnter.append("circle")
              .attr('r',0)
              .transition()
              .duration(200)
              .attr("r", function(d){return (d.volume/3);} )
              .attr('cx',function(d){return xRange(d.price);})
              .attr('cy',function(d){return yRange(d.volume);})
              .attr("stroke","black")
              .attr("fill", "white")
              .style('fill',function(d){return "hsl(" + d.price + ",100%,50%)";});

      elemEnter.append("text")
              .attr("dx", function(d){return xRange(d.price)-(d.volume/2);})
              .attr('dy', function(d){return yRange(d.volume);})
              .text(function(d){return d.name});
    };

    $scope.reDraw = function(data){
      var xRange = d3.scale.linear()
                    .range([40,800])
                    .domain([d3.min(data,function(d){
                      return d.price;
                    }), d3.max(data,function(d){
                      return d.price;
                    })]);

      var yRange = d3.scale.linear()
                    .range([40,500])
                    .domain([d3.max(data,function(d){
                      return d.volume;
                    }), d3.min(data,function(d){
                      return d.volume;
                    })]);

      var circle = d3.selectAll('circle')
        .data($scope.data)
        .transition()
        .duration(750)
        .attr("r", function(d){return (d.volume/3);} )
        .attr('cx',function(d){return xRange(d.price);})
        .attr('cy',function(d){return yRange(d.volume);});

      var text = d3.selectAll('text')
        .data($scope.data)
        .transition()
        .duration(750)
        .attr("dx", function(d){return xRange(d.price)-(d.volume/2);})
        .attr('dy', function(d){return yRange(d.volume);})
        .text(function(d){return d.name});
    };

    $scope.initialize();
    setInterval($scope.getData,2000);

    $scope.$watch('data',function(){
      $scope.reDraw($scope.data);
    },true);
  });