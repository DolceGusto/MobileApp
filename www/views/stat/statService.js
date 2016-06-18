angular.module('App')
.service('StatService',function(){

    var LineChartDataItem= function (date, value) {

        this.date = date ;
        this.value = value;
    };

    

    //--TODO getting data from the backend
    var lineChartDataSetDepense = []; /*[
        new LineChartDataItem(new Date('2016-05-08'),100.25),
        new LineChartDataItem(new Date('2016-05-09'),150.55),
        new LineChartDataItem(new Date('2016-05-010'),250.00),
        new LineChartDataItem(new Date('2016-05-010'),50.23)
    ];*/

    var lineChartDataSetEntree = [] ; /* [
        new LineChartDataItem(new Date('2016-05-08'),200),
        new LineChartDataItem(new Date('2016-05-09'),300.55),
        new LineChartDataItem(new Date('2016-05-010'),50.00),
        new LineChartDataItem(new Date('2016-05-010'),100.23)
    ];*/
  
    
    
    var formateTransactionToLineDataSetEntree = function(transactions){
      
      var dataSet = [];
      for(var i = 0 ; i < transactions.length ; i++ ){
       
        dataSet[i] = new LineChartDataItem(new Date(transactions[i].dateCreation),transactions[i].montant);
      }
      return dataSet;
      
    };
  
    var getSerieFromLineChartDataSet = function(lineChartDataSet,serieName){

        var serie = {
            name:serieName,
            data: []
        };
        /*
        *  data = [
        *           [date1,val1],
        *            ..........
        *           [dateN,valN]
        *              ]
        * */
        for(var i = 0 ; i < lineChartDataSet.length ; i ++){

            if(lineChartDataSet[i].date && lineChartDataSet[i].value > 0){// les deux sont valides
                serie.data.push([lineChartDataSet[i].date.getTime(),lineChartDataSet[i].value]);
            }
        }
        return serie ;
    };

    return{
        formateTransactionsToLineChartDataSetEntree: formateTransactionToLineDataSetEntree,
        lineChartDataSetDepense: lineChartDataSetDepense,
        lineChartDataSetEntree : lineChartDataSetEntree,
        getSerieFromLineChartDataSet: getSerieFromLineChartDataSet
    };

});
