angular.module('vizu.ctrl',['ngFx','ngAnimate'])
  .controller('vizuCtrl',function($scope,reqs){
    $scope.data = [];
    $scope.details = [];
    $scope.showDetail = false;
    $scope.startDate = "2015-01-01";
    $scope.endDate = "2015-01-15";
    var volumeAdj = 1000000;
    var priceAdj = 1;


    $scope.sendForm = function(){
      $scope.showDetail = false;
      reqs.getData({startDate:$scope.startDate,endDate:$scope.endDate,stocks:$scope.stocks})
        .then(function(res){
          var data = res.data;
          for (var i = 0; i < data.length; i++) {
            data[i].Volume = data[i].Volume / volumeAdj;
            data[i].Close = data[i].Close / priceAdj;
            data[i].Date = parseInt(data[i].Date.slice(-2));
          }
          $scope.data = data;
          $scope.render(data);
        });
    };

    $scope.getDetail = function(){
      reqs.getData({startDate:$scope.startDate,endDate:$scope.endDate,stocks:$scope.searchText})
        .then(function(res){
          var data = res.data;
          $scope.renderDetail(data);
        });
    };

    $scope.renderDetail = function(data,$animate){
      // remove any svg tags.
      $('svg').remove();
      $scope.details = data;
      $scope.showDetail = true;
      // $animate.animate('fx-fade-down');
      // get data,
        // make something out of it
        // append to dom.
    };

    $scope.render = function(data){
      var node = $('svg');
      if(!node.length){ // if node doesn't exist
        var svgNode = $('<svg id="svgVisualize" width="1000" height="1000" style="margin:auto auto"></svg>');
        $('#container').append(svgNode);
      }

      var vis = d3.select("#svgVisualize");
      vis.selectAll('g').remove();

      var xRange = d3.scale.linear()
                    .range([40,800])
                    .domain([d3.min(data,function(d){
                      return d.Date;
                    }), d3.max(data,function(d){
                      return d.Date;
                    })]);

      var yRange = d3.scale.linear()
                    .range([40,500])
                    .domain([d3.max(data,function(d){
                      return d.Close;
                    }), d3.min(data,function(d){
                      return d.Close;
                    })]);

      var gs = vis.selectAll('g').data(data).enter().append('g');

      var circle = gs
              .append('circle')
              .attr('r',0)
              .transition()
              .duration(200)
              .attr("r", function(d){return d.Volume/3;})
              .attr('cx',function(d){return xRange(d.Date);})
              .attr('cy',function(d){return yRange(d.Close);})
              .attr("stroke","black")
              .attr("fill", "white")
              .style('fill',function(d){return "hsl(" + d.Close*10 + ",100%,50%)";});

      var text = gs.append("text")
              .attr("text-anchor", "middle")
              .attr("dx", function(d){return xRange(d.Date);})
              .attr('dy', function(d){return yRange(d.Close);})
              .text(function(d){return d.Symbol;});


      var xAxis = d3.svg.axis().scale(xRange);
      var yAxis = d3.svg.axis().scale(yRange).orient("left");


      vis.append('svg:g').call(xAxis).attr("transform","translate(0,500)")
        .append('text').attr("transform","translate(400,50)").text('Days');
      vis.append('svg:g').call(yAxis).attr("transform","translate(40,0)")
        .append('text').attr("transform","translate(0,20)").text('Price');

    };

  });