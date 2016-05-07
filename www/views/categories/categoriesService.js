/**
 * Created by EL Barto on 06/05/2016.
 */
angular.module('App')
.service('CategoriesService',function(){

  function Categorie(id,idPorteFeuille,designation,descript){

    this.id = id;
    this.idPorteFeuille = idPorteFeuille;
    this.designation = designation;
    this.descript = descript;
  }

  var getAnInstanceOfCategorie = function(id,idPorteFeuille,designation,descript){

    return new Categorie(id,idPorteFeuille,designation,descript);
  };

  var cloneCategorie = function(categorieCible,categorieTemplate){
    categorieCible.id = categorieTemplate.id;
    categorieCible.idPorteFeuille = categorieTemplate.idPorteFeuille;
    categorieCible.designation = categorieTemplate.designation;
    categorieCible.descript = categorieTemplate.descript;
  };

  var data = [
                new Categorie(1,1,'course','mes coureses'),
                new Categorie(2,1,'santé','mes depenses de santé'),
                new Categorie(3,1,'transports','mes depenses de transport'),
                new Categorie(4,1,'etude','mes depenses etudiant'),
                new Categorie(5,1,'salaire','mon salaire')
              ];


  var getDesignationCategorie = function(idCategorie){

    for(var i = 0 ; i < data.length ; i ++){
      if(data[i].id == idCategorie){
        return data[i].designation ;
      }
    }
    //-TODO think to search in the remote server
    return null;
  };

  var getIdCategorie = function(designation){
    for(var i = 0 ; i< data.length ; i++){
      if(data[i].designation === designation) {
        return data[i].id;
      }
    }
    return null;
  };



  return{
    categories: data,
    getDesignationCategorie: getDesignationCategorie,
    getIdCategorie : getIdCategorie,
    getAnInstance : getAnInstanceOfCategorie,
    clone : cloneCategorie
  };

});
