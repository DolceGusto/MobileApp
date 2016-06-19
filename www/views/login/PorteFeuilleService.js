angular.module('App')
  .service('loginService',function($http) {
    
    //var urlServer = "http://192.168.56.1:1949";
    var urlServer = "http://localhost:1949/";
    
    var addPorteFeuille = function(porteFeuille){
      return $http.post(urlServer+"/api/PorteFeuille/add",porteFeuille);
    }
    
    
    
  });
