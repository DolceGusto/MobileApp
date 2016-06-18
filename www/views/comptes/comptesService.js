angular.module('App')
.service('ComptesService',function($http){

  //var urlServer = "http://192.168.56.1:1949";
  var urlServer = "http://localhost:1949/";

  function Compte(id,idUtilisateur,solde,designation,descript){

    this.id = id;
    this.idUtilisateur = idUtilisateur;
    this.solde = solde;
    this.designation = designation;
    this.descript = descript;
  }


  var getAnInstanceOfCompte = function(id,idUtilisateur,solde,designation,descript){

    return new Compte(id,idUtilisateur,solde,designation,descript);
  }

  var cloneCompte = function (compteCible,compteTemplate){
    compteCible.id = compteTemplate.id ;
    compteCible.idUtilisateur = compteTemplate.idUtilisateur;
    compteCible.solde = compteTemplate.solde;
    compteCible.designation = compteTemplate.designation;
    compteCible.descript = compteTemplate.descript;
  }

  var data ;

  var getDesignationCompte = function(idCompte){

    for(var i = 0 ; i < this.comptes.length ; i ++){
      if(this.comptes[i].id == idCompte ){
        return this.comptes[i].designation;
      }
    }
    //-TODO search in the remote backend
    return null;
  };

  var getIdCompte = function(designation){
    for(var i  = 0 ; i< this.comptes.length ;i++){
      if(this.comptes[i].designation === designation){
        return this.comptes[i].id ;
      }
    }
    return null;
  };

  var updateData = function(userId){

    $http.get( urlServer+"api/Compte/getAccountsOneUser/"+userId )
      .success(function(response){
        console.log(response);
        data = response;
      });
  };


  var getComptesOneUser = function (userId){

    return $http.get(urlServer+"api/Compte/getAccountsOneUser/"+userId) ;
  };

  var deleteById = function (compteId){

    return $http.delete(urlServer+"api/Compte/deleteAccount/"+compteId);
  };

  var updateCompte = function (compte) {
    return $http.put(urlServer+"api/Compte/updateAccount/"+compte.id,compte);
  };

  var addCompte = function(compte){
    return $http.post(urlServer+"api/Compte/addAccount",compte);
  };

  var isValideSolde = function(solde){

    return (!isNaN(solde) && solde  >= 0) || solde == "" ;
  };



  return{

    comptes: [],
    updateData: updateData,
    getDesignationCompte: getDesignationCompte,
    getIdCompte : getIdCompte,
    getAnInstance : getAnInstanceOfCompte,
    clone : cloneCompte,
    getCompteOneUser: getComptesOneUser,
    deleteById: deleteById,
    updateCompte: updateCompte,
    addCompte: addCompte,
    isValideSolde: isValideSolde
  };

})
