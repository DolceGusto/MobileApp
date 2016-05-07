angular.module('App')
.controller('StatController',function($scope,$stateParams,$state,StatService){
   
    $scope.chartTypes = ['depenses','entrees','depenses vs entrees'];

    $scope.selectedChart = $stateParams.chartTypeIndex || 0;

    $scope.changeChart = function () {
        $state.go('home.dashboard.stat',{chartTypeIndex : $scope.selectedChart});
    }

    $scope.chart = {
        options: {
            chart:{
                type:'line'
            },
            legend:{
                enabled: false
            }
        },
        title:{
            text:null
        },
        yAxis:{
            title:null
        },
        xAxis:{
            type:'datetime'
        },
        series:[] /*data to define */
    };

    //--TODO getting data from the backend
    $scope.chart.series.push(StatService.getSerieFromLineChartDataSet(StatService.lineChartDataSetDepense));

    
    $scope.$on('$ionicView.enter', function() {
        $scope.selectedChart = $stateParams.chartTypeIndex || 0;
    });
    
});