angular.module('App')
.service('StatService',function(){

    var LineChartDataItem = function (date, value) {

        this.date = date ;
        this.value = value;
    };


    var lineChartDataSetDepense = []; /*[
        new LineChartDataItem(new Date('2016-05-08'),100.25),
        new LineChartDataItem(new Date('2016-05-09'),150.55),
        new LineChartDataItem(new Date('2016-05-010'),250.00),
        new LineChartDataItem(new Date('2016-05-010'),50.23)
    ];*/

    var lineChartDataSetEntree = []; /* [
        new LineChartDataItem(new Date('2016-05-08'),200),
        new LineChartDataItem(new Date('2016-05-09'),300.55),
        new LineChartDataItem(new Date('2016-05-010'),50.00),
        new LineChartDataItem(new Date('2016-05-010'),100.23)
    ];*/



    var formateTransactionToLineDataSet = function(transactions){

      var dataSet = [];
      var date, day, month, year, dateArray ,  j = 0;

      for(var i = 0 ; i < transactions.length ; i++ ){

        if(transactions[i].dateCreation){

          dateArray =  transactions[i].dateCreation.toString().split("-");
          year = dateArray[0];
          month = dateArray[1];
          day = dateArray[2];
          date = year+"-"+month+"-"+day ;
          dataSet[j] = new LineChartDataItem(new Date(date),transactions[i].montant);
          j++;
        }
      }
      console.log("dataSet from FormateTransactionToLineDataSet");
      console.log(dataSet);
      return sorte(dataSet);

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
        console.log("line chart data set getSerieFromLineChartDataSet");
        console.log(lineChartDataSet);
        for(var i = 0 ; i < lineChartDataSet.length ; i ++){

            console.log(lineChartDataSet[i]);
            if(lineChartDataSet[i].date && lineChartDataSet[i].value > 0){// les deux sont valides
                serie.data.push([lineChartDataSet[i].date.getTime(),lineChartDataSet[i].value]);
            }
        }
        return serie ;
    };

    var sorte = function(dataItems){
      var permut = true;
      var tmp;

      while( permut ){

        permut = false ;
        for(var i = 0 ; i < dataItems.length - 1 ; i ++){

          if(dataItems[i].date > dataItems[i+1].date ){
            tmp = dataItems[i];
            dataItems[i] = dataItems[i+1];
            dataItems[i+1] = tmp;
            permut = true;
          }
        }
      }
      return dataItems;
    };

    return{
        formateTransactionsToLineChartDataSet: formateTransactionToLineDataSet,
        lineChartDataSetDepense: lineChartDataSetDepense,
        lineChartDataSetEntree : lineChartDataSetEntree,
        getSerieFromLineChartDataSet: getSerieFromLineChartDataSet
    };

});
