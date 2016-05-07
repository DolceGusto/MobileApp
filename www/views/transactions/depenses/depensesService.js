angular.module('App')
.service('DepensesService',function(){

  function Depense(id,idCompte,idCategorie,montant,dateCration,designation){

    this.id = id;
    this.idCompte = idCompte;
    this.idCategorie = idCategorie;
    this.montant = montant;
    this.dateCreation = dateCration;
    this.designation = designation;
    this.typeTransact = 'depense';
  }

  var getAnInstanceOfDepense = function(id,idCompte,idCategorie,montant,dateCreation,designation){
    return new Depense(id,idCompte,idCategorie,montant,dateCreation,designation);
  };

  var cloneDepense = function(depenseCible,depenseTemplate){

      depenseCible.id =depenseTemplate.id;
      depenseCible.idCompte = depenseTemplate.idCompte;
      depenseCible.idCategorie = depenseTemplate.idCategorie;
      depenseCible.montant = depenseTemplate.montant;
      depenseCible.dateCreation = depenseTemplate.dateCreation;
      depenseCible.designation = depenseTemplate.designation;
  };

  var data = [
              new Depense(1,1,1,100,new Date('2016-05-06'),'depense #1'),
              new Depense(2,1,1,100,new Date('2016-05-07'),'depense #2'),
              new Depense(3,1,1,100,new Date('2016-05-08'),'depense #3')
            ];

  return {
    depenses: data,
    getAnInstance : getAnInstanceOfDepense,
    clone : cloneDepense
  };


});
