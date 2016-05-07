angular.module('App')
.service('StatService',function(){

    var LineChartDataItem= function (date, value) {

        this.date = date ;
        this.value = value;
    };



    //--TODO getting data from the backend
    var lineChartDataSetDepense = [
        new LineChartDataItem(new Date('2016-05-08'),100.25),
        new LineChartDataItem(new Date('2016-05-09'),150.55),
        new LineChartDataItem(new Date('2016-05-010'),250.00),
        new LineChartDataItem(new Date('2016-05-010'),50.23)
    ];
    
    var getSerieFromLineChartDataSet = function(lineChartDataSet){
        
        var serie = {
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
        lineChartDataSetDepense: lineChartDataSetDepense,
        getSerieFromLineChartDataSet: getSerieFromLineChartDataSet
    };

});