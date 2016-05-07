angular.module('App')
.service('ComptesService',function(){


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

  var data = [
                new Compte(1,1,10000,'espece','mon compte espece'),
                new Compte(2,1,10000,'banque','mon compte en banque'),
                new Compte(3,1,10000,'poste','mon compte ccp')
              ];

  var getDesignationCompte = function(idCompte){

    for(var i = 0 ; i < data.length ; i ++){
      if(data[i].id == idCompte ){
        return data[i].designation;
      }
    }
    //-TODO search in the remote backend
    return null;
  };

  var getIdCompte = function(designation){
    for(var i  = 0 ; i< data.length ;i++){
      if(data[i].designation === designation){
        return data[i].id ;
      }
    }
    return null;
  };

  return{
    comptes: data,
    getDesignationCompte: getDesignationCompte,
    getIdCompte : getIdCompte,
    getAnInstance : getAnInstanceOfCompte,
    clone : cloneCompte
  };

})
