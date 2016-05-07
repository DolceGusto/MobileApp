angular.module('App')
.controller('TransfertsController',function($scope,TransfertsService,ComptesService,$ionicPopup){

  $scope.transferts = TransfertsService.transferts;
  $scope.getDesignationCompte = ComptesService.getDesignationCompte;
  $scope.comptes = ComptesService.comptes;

  $scope.popupScope = {
    selectedItem: TransfertsService.getInstance('','','','','','')
  };

  $scope.add = function(){
    $scope.popupScope.selectedItem = TransfertsService.getInstance('','','','',new Date(),'');

    var addPopup = $ionicPopup.show({

      title:'ajouter un transfert',
      templateUrl:'views/transferts/popup_transferts.html',
      scope:$scope,
      buttons:[
        {
          text:'Annuler',
          type:'button-positive'
        },
        {
          text:'Ajouter',
          type:'button-positive',
          onTap:function(e){

            if($scope.popupScope.selectedItem.idCompteExpediteur &&
              $scope.popupScope.selectedItem.idCompteRecepteur &&
              $scope.popupScope.selectedItem.montant &&
              $scope.popupScope.selectedItem.dateCreation &&
              $scope.popupScope.selectedItem.designation){

              //--TODO implementation of an http post call
              $scope.transferts.splice(0,0,$scope.popupScope.selectedItem);

            }else{
              e.preventDefault();
            }
          }
        }
      ]

    });

  };

  $scope.delete = function(index){

      var itemToDelete = $scope.transferts[index];
      var deletePopup = $ionicPopup.confirm({
        template: 'Supprimer le transfert ?',
        cancelText:'Non',
        cancelType:'button-positive',
        okText:'Oui',
        okType:'button-positive'
      });

    deletePopup.then(function(res){

      if(res){
        //--TODO implement the delete Http request
        $scope.transferts.splice(index,1);
      }else{
        // canceling the operation
      }

    });

  };

  $scope.edite = function(index ){

    var itemToEdite  = $scope.transferts[index];
    TransfertsService.clone($scope.popupScope.selectedItem,itemToEdite);

    var editePopup = $ionicPopup.show({
      title:'Editer le transfert',
      templateUrl:'views/transferts/popup_transferts.html',
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

            if($scope.popupScope.selectedItem.idCompteExpediteur &&
              $scope.popupScope.selectedItem.idCompteRecepteur &&
              $scope.popupScope.selectedItem.montant &&
              $scope.popupScope.selectedItem.dateCreation &&
              $scope.popupScope.selectedItem.designation){

              //--TODO implementation of an http put call
              TransfertsService.clone(itemToEdite,$scope.popupScope.selectedItem);

            }else{
              e.preventDefault();
            }
          }
        }
      ]
    })

  };


});
