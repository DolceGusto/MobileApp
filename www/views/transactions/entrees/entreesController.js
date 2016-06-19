angular.module('App')
  .controller('EntreesController',function($scope,$ionicPopup,EntreesService,CategoriesService,ComptesService,loginService){

    var userId = loginService.currentAppUser.id;
    var porteFeuilleId = loginService.currentAppUser.idPorteFeuille;


    EntreesService.getEntreesOneUser(userId)
      .success(function(entrees){

        EntreesService.entrees = entrees;

        CategoriesService.getCategorieOnePorteFeuille(porteFeuilleId)
          .success(function(categories){

            CategoriesService.categories = categories;

            ComptesService.getCompteOneUser(userId)
              .success(function(comptes){

                ComptesService.comptes = comptes ;

                $scope.entrees = EntreesService.entrees;
                $scope.categories = CategoriesService.categories;
                $scope.comptes = ComptesService.comptes;

                console.log($scope.entrees);
                console.log($scope.categories);
                console.log($scope.comptes);

                $scope.getDesignationCategorie= CategoriesService.getDesignationCategorie ;
                $scope.getDesignationCompte = ComptesService.getDesignationCompte;

                console.log("initialisation des entrees, comptes, catégories ok");
              });
          });
      });


    $scope.popupScope = {
      selectedItem: EntreesService.getAnInstance('','','','','','')
    };

    $scope.add = function(){

      $scope.popupScope.selectedItem = EntreesService.getAnInstance('','','','',new Date(),'');


      var addPopup = $ionicPopup.show({
        title:'ajouter une entree',
        templateUrl:'views/transactions/entrees/popup_entrees.html',
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
              if( $scope.popupScope.selectedItem.idCategorie &&
                $scope.popupScope.selectedItem.idCompte &&
                $scope.popupScope.selectedItem.montant &&
                $scope.popupScope.selectedItem.designation &&
                $scope.popupScope.selectedItem.dateCreation){
                /*the item is valide*/
                var entree = EntreesService.getAnInstance('',
                  $scope.popupScope.selectedItem.idCompte,
                  $scope.popupScope.selectedItem.idCategorie,
                  $scope.popupScope.selectedItem.montant,
                  $scope.popupScope.selectedItem.dateCreation,
                  $scope.popupScope.selectedItem.designation);

                //--TODO add http post methode
                EntreesService.addEntree(entree)
                  .then(function(response){

                    console.log("addEntrees ok");

                    var locationStringArray = response.headers("Location").split("/");
                    var locationInt = locationStringArray[locationStringArray.length - 2 ];
                    entree.id = locationInt;

                    $scope.entrees.splice(0,0,entree);
                    console.log(response);
                    console.log(entree);

                  },function(error){

                    console.log("addDepense error");
                    console.log(error);

                  });

              }else{
                e.preventDefault();
              }

            }
          }
        ]
      });

    };


    $scope.edite = function(index){

      var itemToEdite = $scope.entrees[index];
      EntreesService.clone($scope.popupScope.selectedItem,itemToEdite);

      var editPopup = $ionicPopup.show({
        title:'ajouter une entree',
        templateUrl:'views/transactions/entrees/popup_entrees.html',
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
              if(
                $scope.popupScope.selectedItem.idCategorie &&
                $scope.popupScope.selectedItem.idCompte &&
                $scope.popupScope.selectedItem.montant &&
                $scope.popupScope.selectedItem.designation &&
                $scope.popupScope.selectedItem.dateCreation){
                /*the item is valide*/

                //--TODO add http post methode
                EntreesService.updateEntree($scope.popupScope.selectedItem)
                  .success(function(response){

                    console.log("update entree ok");
                    EntreesService.clone(itemToEdite,$scope.popupScope.selectedItem);
                  })
                  .error(function(error){
                    console.log("update entree error ");
                  });

              }else{
                e.preventDefault();
              }

            }
          }
        ]
      });

    };

    $scope.delete = function(index){

      var itemToDelete = $scope.entrees[index];
      var deletePopup = $ionicPopup.confirm({

        template:'Supprimer l\' entree ?',
        cancelText:'Non',
        cancelType:'button-positive',
        okText:'Oui',
        okType:'button-positive'
      });

      deletePopup.then(function(res){
        if(res){
          //-TODO implementing the http delete call
          EntreesService.deleteById(itemToDelete.id,itemToDelete.idCompte)
            .success(function(response){

              console.log("delete entree ok");
              $scope.entrees.splice(index,1);

            }).error(function(error){

            console.log("delete entree error");
            console.log(error);
          });
        }else{
          //canceling the operation
        }

      });

    };





  });
