angular.module('App')
  .service('EntreesService',function($http){


    //var urlServer = "http://192.168.56.1:1949";
    var urlServer = "http://localhost:1949/";

    function Entree(id,idCompte,idCategorie,montant,dateCration,designation){

      this.id = id;
      this.idCompte = idCompte;
      this.idCategorie = idCategorie;
      this.montant = montant;
      this.dateCreation = dateCration;
      this.designation = designation;
      this.typeTransact = 'entree';
    }

    var getAnInstanceOfEntree = function(id,idCompte,idCategorie,montant,dateCreation,designation){
      return new Entree(id,idCompte,idCategorie,montant,dateCreation,designation);
    };

    var cloneEntree = function(EntreeCible,entreeTemplate){

      EntreeCible.id =entreeTemplate.id;
      EntreeCible.idCompte = entreeTemplate.idCompte;
      EntreeCible.idCategorie = entreeTemplate.idCategorie;
      EntreeCible.montant = entreeTemplate.montant;
      EntreeCible.dateCreation = entreeTemplate.dateCreation;
      EntreeCible.designation = entreeTemplate.designation;
    };

    var getEntreesOneUser = function (userid){
      return $http.get(urlServer+"/api/Transaction/getTransactEntreesOneUser/"+userid);
    };

    var updateEntree = function(entree){
      return $http.put(urlServer+"/api/Transaction/updateTransaction/"+entree.id+"/"+entree.idCompte,entree);
    };

    var deleteById = function(idEntree,idCompte){
      return $http.delete(urlServer+"/api/Transaction/deleteTransaction/"+idEntree+"/"+idCompte);
    };

    var addEntree = function(entree){
      return $http.post(urlServer+"/api/Transaction/addTransaction",entree);
    };

    return {
      entrees: [],
      getAnInstance : getAnInstanceOfEntree,
      clone : cloneEntree,
      getEntreesOneUser: getEntreesOneUser,
      updateEntree: updateEntree,
      deleteById: deleteById,
      addEntree: addEntree
    };


  });
