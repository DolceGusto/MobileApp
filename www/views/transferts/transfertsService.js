angular.module('App')
.service('TransfertsService',function(){

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

  var data  = [

    new Transfert(1,1,2,150,new Date('2016-05-08'),'transfert #1'),
    new Transfert(1,2,1,250,new Date('2016-05-07'),'transfert #2'),
    new Transfert(1,1,3,350,new Date('2016-05-06'),'transfert #3')
  ];



  return {
    transferts : data,
    getInstance : getInstanceOfTransfert,
    clone : cloneTransfert
  };

});
