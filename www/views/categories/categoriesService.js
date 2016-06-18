/**
 * Created by EL Barto on 06/05/2016.
 */
angular.module('App')
.service('CategoriesService',function($http){

  //var urlServer = "http://192.168.56.1:1949";
  var urlServer = "http://localhost:1949/";

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

  var data = [] ;


  var getDesignationCategorie = function(idCategorie){

    for(var i = 0 ; i < this.categories.length ; i ++){
      if(this.categories[i].id == idCategorie){
        return this.categories[i].designation ;
      }
    }
    //-TODO think to search in the remote server
    return null;
  };

  var getIdCategorie = function(designation){
    for(var i = 0 ; i< this.categories.length ; i++){
      if(this.categories[i].designation === designation) {
        return this.categories[i].id;
      }
    }
    return null;
  };

  var getCategorieOnePorteFeuille = function (porteFeuilleId){

    return $http.get(urlServer+"/api/Categorie/getByPorteFeuille/"+porteFeuilleId);
  };

  var updateCategorie = function (categorie){

    return $http.put(urlServer+"api/Categorie/updateCategorie/"+categorie.id,categorie);
  };

  var deleteById = function(idCategorie){
    return $http.delete(urlServer+"/api/Categorie/deleteCategorie/"+idCategorie);
  };

  var addCategorie = function(categorie){
    return $http.post(urlServer+"api/Categorie/addCategorie",categorie);
  };

  var updateData = function(porteFeuilleId){

    $http.get(urlServer+"/api/Categorie/getByPorteFeuille/"+porteFeuilleId)
      .success(function(response){

        console.log("update data categorie");
        data = response;
      });
  };

  return{
    categories: [],
    getDesignationCategorie: getDesignationCategorie,
    getIdCategorie : getIdCategorie,
    getAnInstance : getAnInstanceOfCategorie,
    clone : cloneCategorie,
    addCategorie: addCategorie,
    deleteById: deleteById,
    updateCategorie: updateCategorie,
    getCategorieOnePorteFeuille:getCategorieOnePorteFeuille,
    updateData:updateData
  };

});
