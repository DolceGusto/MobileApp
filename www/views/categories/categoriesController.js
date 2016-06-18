angular.module('App')
.controller('CategoriesController',function($scope,$ionicPopup,CategoriesService){

  var porteFeuilleId = 1 ;

  console.log("entré dans categorie controller ");

  CategoriesService.getCategorieOnePorteFeuille(porteFeuilleId)
    .success(function(categories){

      CategoriesService.categories = categories;
      $scope.categories = CategoriesService.categories;

    })
    .error(function(error){
      console.log("getCategorieOnePorteFeuille error");
      console.log(error);
  });



  $scope.popupScope = {
    selectedItem: CategoriesService.getAnInstance('','','',''),
    invalideDesignation:false
  };

  $scope.delete = function(index) {

      var itemToDelete = $scope.categories[index];
      var deletePopup = $ionicPopup.confirm({

        template: 'Supprimer la categorie ?',
        cancelText: 'Non',
        cancelType: 'button-positive',
        okText: 'Oui',
        okType: 'button-positive'
      });

      deletePopup.then(function (res) {
        if (res) {
          //-TODO implementing the http delete call
          CategoriesService.deleteById(itemToDelete.id)
            .success(function(response){

              $scope.categories.splice(index, 1);
              console.log("delete categorie ok");
              console.log(response);
            })
            .error(function(error){
              console.log("delete categorie error");
              console.log(error);
            });

        } else {
          //canceling the operation
        }

    });
  };

  $scope.edite = function(index){

    var itemToEdit = $scope.categories[index];
    CategoriesService.clone($scope.popupScope.selectedItem,itemToEdit);


    var editePopup = $ionicPopup.show({

      title:'Editer la categorie',
      templateUrl:'views/categories/popup_categories.html',
      scope:$scope,
      buttons:[
        {
          text:'Annuler',
          type:'button-positive'
        },
        {
          text:'Editer',
          type:'button-positive',
          onTap:function(e){


            if( ! $scope.popupScope.selectedItem.designation ){
              $scope.popupScope.invalideDesignation = true;
              e.preventDefault();
            }else{
              $scope.popupScope.invalideDesignation = false;

              //-TODO  implemeting the http put call
              CategoriesService.updateCategorie($scope.popupScope.selectedItem)
                .success(function(response){
                  console.log("update catégorie ok");
                  CategoriesService.clone(itemToEdit,$scope.popupScope.selectedItem);
                })
                .error(function(response){
                  console.log("update catégorie error");
                  console.log(response);
                });
              /*editing the item*/

            }}
        }
      ]
    });

  };

  $scope.add = function(index){

    $scope.popupScope.selectedItem = CategoriesService.getAnInstance('','','','');
    $scope.popupScope.invalideDesignation = false ;

    var addPopup = $ionicPopup.show({
      title:'ajouter une categorie',
      templateUrl:'views/categories/popup_categories.html',
      scope:$scope,
      buttons:[
        {
          text:'Annuler',
          type:'button-positive'
        },
        {
          text:'Ajouter',
          type:'button-posititve',
          onTap: function(e){
            if(! $scope.popupScope.selectedItem.designation){
              $scope.popupScope.invalideDesignation = true;
              e.preventDefault();
            }else{

              $scope.popupScope.invalideDesignation = false;

              // formatting the new object to add
              var categorieToAdd = CategoriesService.getAnInstance('',porteFeuilleId,
                                  $scope.popupScope.selectedItem.designation,
                                  $scope.popupScope.selectedItem.descript);

              CategoriesService.addCategorie(categorieToAdd)
                .then(function(response){

                  console.log("add categorie ok");
                  console.log(response);
                  var locationStringArray = response.headers("Location").split("/");
                  var locationInt = locationStringArray[locationStringArray.length - 1 ];
                  categorieToAdd.id = locationInt;
                  $scope.categories.splice(0,0,categorieToAdd);


                },function(error){

                  console.log("add categorie error");
                  console.log(error);

                });

            }
          }
        }
      ]
    })

  };


});
