angular.module('App')
.service('TransfertsService',function($http){

  //var urlServer = "http://192.168.56.1:1949";
  var urlServer = "http://localhost:1949/";

  function Transfert(id,idCompteExpediteur,idCompteRecepteur,montant,dateCreation,designation){

    this.id = id;
    this.idCompteExpediteur = idCompteExpediteur;
    this.idCompteRecepteur = idCompteRecepteur;
    this.montant = montant;
    this.dateCreation = dateCreation;
    this.designation = designation;
  }

  var getInstanceOfTransfert = function(id,idCompteExpediteur,idCompteRecepteur,montant,dateCreation,designation){
    return new Transfert(id,idCompteExpediteur,idCompteRecepteur,montant,dateCreation,designation);
  };

  var cloneTransfert  = function(transfertCible,transfertTemplate){

    transfertCible.id = transfertTemplate.id;
    transfertCible.idCompteRecepteur = transfertTemplate.idCompteRecepteur;
    transfertCible.idCompteExpediteur = transfertTemplate.idCompteExpediteur;
    transfertCible.montant = transfertTemplate.montant;
    transfertCible.dateCreation = transfertTemplate.dateCreation;
    transfertCible.designation = transfertTemplate.designation;
  };


  var getTransfertOneUser = function(userId){
    return $http.get(urlServer+"/api/Transfert/getByIdUser/"+userId);
  };


  var updateTransfert = function(transfert){
    return $http.put(urlServer+"/api/Transfert/update",transfert);
  };

  var deleteById = function(id){
    return $http.delete(urlServer+"/api/Transfert/delete/"+id);
  };

  var addTransfert = function(transfert){
    return $http.post(urlServer+"/api/Transfert/add",transfert);
  };



  return {
    transferts : [],
    getInstance : getInstanceOfTransfert,
    clone : cloneTransfert,
    getTransfertOneUser:getTransfertOneUser,
    updateTransfert: updateTransfert,
    deletById:deleteById,
    addTransfert:addTransfert
  };

});
