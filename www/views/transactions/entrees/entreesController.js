angular.module('App')
  .controller('EntreesController',function($scope,$ionicPopup,EntreesService,CategoriesService,ComptesService){

    $scope.entrees = EntreesService.entrees;
    $scope.categories = CategoriesService.categories;
    $scope.comptes = ComptesService.comptes;

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
                $scope.entrees.splice(0,0,entree);
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

                EntreesService.clone(itemToEdite,$scope.popupScope.selectedItem);

                //--TODO add http post methode

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
          $scope.entrees.splice(index,1);
        }else{
          //canceling the operation
        }

      });

    };

    $scope.getDesignationCategorie= CategoriesService.getDesignationCategorie ;
    $scope.getDesignationCompte = ComptesService.getDesignationCompte;



  });
