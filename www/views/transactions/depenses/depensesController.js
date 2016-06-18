angular.module('App')
.controller('DepensesController',function($scope,$ionicPopup,DepensesService,CategoriesService,ComptesService){


  var userId = 2;
  var porteFeuilleId = 1;

  DepensesService.getDepenseOneUser(userId)
    .success(function(depenses){

      DepensesService.depenses = depenses;

      CategoriesService.getCategorieOnePorteFeuille(porteFeuilleId)
        .success(function(categories){

          CategoriesService.categories = categories;

          ComptesService.getCompteOneUser(userId)
            .success(function(comptes){

              ComptesService.comptes = comptes ;

              $scope.depenses = DepensesService.depenses;
              $scope.categories = CategoriesService.categories;
              $scope.comptes = ComptesService.comptes;

              console.log($scope.depenses);
              console.log($scope.categories);
              console.log($scope.comptes);

              $scope.getDesignationCategorie = CategoriesService.getDesignationCategorie ;
              $scope.getDesignationCompte = ComptesService.getDesignationCompte;

              console.log("initialisation des depenses, comptes, catégories ok");
            });
        });
    });



  $scope.popupScope = {
    selectedItem: DepensesService.getAnInstance('','','','','','')
  };

  $scope.add = function(){

    $scope.popupScope.selectedItem = DepensesService.getAnInstance('','','','',new Date(),'');


    var addPopup = $ionicPopup.show({
      title:'ajouter une depense',
      templateUrl:'views/transactions/depenses/popup_depenses.html',
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
              var depense = DepensesService.getAnInstance('',
                                $scope.popupScope.selectedItem.idCompte,
                                $scope.popupScope.selectedItem.idCategorie,
                                $scope.popupScope.selectedItem.montant,
                                $scope.popupScope.selectedItem.dateCreation,
                                $scope.popupScope.selectedItem.designation);

              //--TODO add http post methode
              DepensesService.addDepense(depense)
                .then(function(response){

                  console.log("addDepesne ok");

                  var locationStringArray = response.headers("Location").split("/");
                  var locationInt = locationStringArray[locationStringArray.length - 2 ];
                  depense.id = locationInt;

                  $scope.depenses.splice(0,0,depense);
                  console.log(response);

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

    var itemToEdite = $scope.depenses[index];
    DepensesService.clone($scope.popupScope.selectedItem,itemToEdite);

    var editPopup = $ionicPopup.show({
      title:'ajouter une depense',
      templateUrl:'views/transactions/depenses/popup_depenses.html',
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
              DepensesService.updateDepense($scope.popupScope.selectedItem)
                .success(function(response){

                  console.log("update depense ok");
                  DepensesService.clone(itemToEdite,$scope.popupScope.selectedItem);
                })
                .error(function(error){
                  console.log("update depense error ");
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

    var itemToDelete = $scope.depenses[index];
    var deletePopup = $ionicPopup.confirm({

      template:'Supprimer la depense ?',
      cancelText:'Non',
      cancelType:'button-positive',
      okText:'Oui',
      okType:'button-positive'
    });

    deletePopup.then(function(res){
      if(res){
        //-TODO implementing the http delete call
        DepensesService.deleteById(itemToDelete.id,itemToDelete.idCompte)
          .success(function(response){

            console.log("delete depense ok");
            $scope.depenses.splice(index,1);

          }).error(function(error){

            console.log("delete depense error");
            console.log(error);
        });

      }else{
        //canceling the operation
      }

    });

  };

});
