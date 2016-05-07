angular.module('App')
  .service('EntreesService',function(){

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

    var data = [
      new Entree(1,1,1,100,new Date('2016-05-06'),'Entree #1'),
      new Entree(2,1,1,100,new Date('2016-05-07'),'Entree #2'),
      new Entree(3,1,1,100,new Date('2016-05-08'),'Entree #3')
    ];

    return {
      entrees: data,
      getAnInstance : getAnInstanceOfEntree,
      clone : cloneEntree
    };


  });
