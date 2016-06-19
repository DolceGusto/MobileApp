angular.module('App')
.controller('StatController',function($scope,StatService,DepensesService,EntreesService){


    var userId = 2;

    var getDataFromBackend = function (userId){

      DepensesService.getDepenseOneUser(userId)
        .success(function(depenses){

          console.log("depenses");
          console.log(depenses);
          StatService.lineChartDataSetDepense = StatService.formateTransactionsToLineChartDataSet(depenses);
          console.log(StatService.lineChartDataSetDepense);
          $scope.changeChart($scope.selectedChart.nom);
        })
        .error(function(error){

          console.log("getDepensesOneUser error");
          console.log(error);
        });

      EntreesService.getEntreesOneUser(userId)
        .success(function(entrees){

          console.log("entrees");
          console.log(entrees);
          StatService.lineChartDataSetEntree = StatService.formateTransactionsToLineChartDataSet(entrees);
          console.log(StatService.lineChartDataSetEntree);
        })
        .error(function(error){

          console.log("getEntreesOneUser error");
          console.log(error);

        });

    };

    $scope.chartTypes = ['Depenses','Entrees','Entrees VS Depenses'];

    $scope.selectedChart = {
      nom: $scope.chartTypes[0]
    };

    Highcharts.theme = {
      colors: [],
      legend: {
        itemStyle: {
          font: '9pt Trebuchet MS, Verdana, sans-serif',
          color: 'black'
        },
        itemHoverStyle: {
          color: 'gray'
        }
      },
      lang: {
        decimalPoint: ',',
        thousandsSep: ' '
      }
    };

    $scope.chart = {
      options: {
        chart:{
          type:'line'
        },
        legend:{
          enabled: true
        }
      },
      title:{
        text:null
      },
      yAxis:{
        title:'Montant (DA)'

      },
      xAxis:{
        type:'datetime'
      },
      series:[] /*data to define */
    };

    $scope.changeChart = function (charteType){

      if(charteType == 'Depenses' ){

        Highcharts.theme.colors = ['#ff0000'];
        Highcharts.setOptions(Highcharts.theme);
        $scope.chart.series=[];
        $scope.chart.series.push(StatService.getSerieFromLineChartDataSet(StatService.lineChartDataSetDepense,'Depenses'));

      }else if(charteType == 'Entrees'){

        Highcharts.theme.colors = ['#0000ff'];
        Highcharts.setOptions(Highcharts.theme);
        $scope.chart.series=[];
        $scope.chart.series.push(StatService.getSerieFromLineChartDataSet(StatService.lineChartDataSetEntree,'Entrees'));

      }else if(charteType == 'Entrees VS Depenses'){

        Highcharts.theme.colors = ['#ff0000','#0000ff'];
        $scope.chart.series=[];
        $scope.chart.series.push(StatService.getSerieFromLineChartDataSet(StatService.lineChartDataSetDepense,'Depenses'));
        $scope.chart.series.push(StatService.getSerieFromLineChartDataSet(StatService.lineChartDataSetEntree,'Entrees'));
      }
    };


    getDataFromBackend(userId);


    $scope.$watch('selectedChart.nom',function(newVal,oldVal){

        $scope.changeChart(newVal);
    });



});
