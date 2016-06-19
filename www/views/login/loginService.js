angular.module('App')
  .service('loginService',function($facebook,$http){

    //var urlServer = "http://192.168.56.1:1949";
    var urlServer = "http://localhost:1949/";


    this.currentAppUser = null;
    this.currentFbUser = null;

    this.login = $facebook.login; //returns a promise
    this.getAuthResponse = $facebook.getAuthResponse; //synchronus call must be connected first

    this.getUser= function(){return $facebook.api('/me'); } ;// returns a promise

    this.getUserLastName =  function() {return $facebook.api('/me',{fields:'last_name'});};  //returns a promise

    this.getUserFirstName=function(){ return $facebook.api('/me',{fields:'first_name'}); };

    this.getUserId = function() {return $facebook.api('/me',{fields:'id'});};

    this.getUserEmail = function(){return $facebook.api('/me',{fields:'email'});};

    this.getUserPicture = function() { return $facebook.api('/me',{fields:'picture'});};

    this.getFriends = function(){return $facebook.api('/me/friends');};
    
    this.getFBUser = function () { return $facebook.api('/me', { fields: 'last_name,first_name,picture,email' }) };

    this.getAppUserByFBId = function(fbId){
      return $http.get(urlServer+"/api/User/getUserFB/"+fbId);
    };

    this.getUserInstance = function(userId,idPorteFeuille,idFacebook,nomDeCompte,nom,prenom,roleUtilisateur){
      return {

        id: userId,
        idPorteFeuille: idPorteFeuille,
        idFacebook: idFacebook,
        nomDeCompte:nomDeCompte,
        nom:nom,
        prenom:prenom,
        roleUtilisateur:roleUtilisateur

      };
    };


    this.addUser = function(user){
      return $http.post(urlServer+"/api/User/addUser",user);
    };



  });
