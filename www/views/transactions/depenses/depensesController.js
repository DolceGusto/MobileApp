angular.module('App')
.controller('DepensesController',function($scope,$ionicPopup,DepensesService,CategoriesService,ComptesService){

  $scope.depenses = DepensesService.depenses;
  $scope.categories = CategoriesService.categories;
  $scope.comptes = ComptesService.comptes;

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
              $scope.depenses.splice(0,0,depense);
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

              DepensesService.clone(itemToEdite,$scope.popupScope.selectedItem);

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
        $scope.depenses.splice(index,1);
      }else{
        //canceling the operation
      }

    });

  };

  $scope.getDesignationCategorie= CategoriesService.getDesignationCategorie ;
  $scope.getDesignationCompte = ComptesService.getDesignationCompte;
 


});
