angular.module('App')
  .service('DepensesService',function($http){

  //var urlServer = "http://192.168.56.1:1949";
    var urlServer = "http://localhost:1949/";


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



  var getDepenseOneUser = function (userid){
    return $http.get(urlServer+"/api/Transaction/getTransactDepensesOneUser/"+userid);
  };

  var updateDepense = function(depense){
    return $http.put(urlServer+"/api/Transaction/updateTransaction/"+depense.id+"/"+depense.idCompte,depense);
  };

  var deleteById = function(idDepense,idCompte){
    return $http.delete(urlServer+"/api/Transaction/deleteTransaction/"+idDepense+"/"+idCompte);
  };

  var addDepense = function(depense){
    return $http.post(urlServer+"/api/Transaction/addTransaction",depense);
  };

  var getTotalDepense = function(userId){
    return $http.get(urlServer+"/api/Transaction/getTotalDepenses/"+userId);
  }

  return {
    depenses: [],
    getAnInstance : getAnInstanceOfDepense,
    clone : cloneDepense,
    getDepenseOneUser : getDepenseOneUser,
    updateDepense: updateDepense,
    deleteById: deleteById,
    addDepense: addDepense,
    getTotalDepense : getTotalDepense
  };


});
