angular.module('App')
.controller('TransfertsController',function($scope,TransfertsService,ComptesService,$ionicPopup){

  var userId = 2;

  TransfertsService.getTransfertOneUser(userId)
    .success(function(transferts){

      TransfertsService.transferts = transferts;
      ComptesService.getCompteOneUser(userId)
        .success(function(comptes){

          ComptesService.comptes = comptes;

          $scope.transferts = TransfertsService.transferts;
          $scope.comptes = ComptesService.comptes;
          $scope.getDesignationCompte = ComptesService.getDesignationCompte;
          
          console.log("initialisation des transferts,comptes ok");
        });
    });



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

              var transfert = TransfertsService.getInstance("",
                                                $scope.popupScope.selectedItem.idCompteExpediteur,
                                                $scope.popupScope.selectedItem.idCompteRecepteur,
                                                $scope.popupScope.selectedItem.montant,
                                                $scope.popupScope.selectedItem.dateCreation,
                                                $scope.popupScope.selectedItem.designation);

              //--TODO implementation of an http post call
              TransfertsService.addTransfert(transfert)
                .then(function (response) {

                  console.log("add transfert ok");

                  var locationStringArray = response.headers("Location").split("/");
                  var locationInt = locationStringArray[locationStringArray.length - 1 ];
                  transfert.id = locationInt;

                  $scope.transferts.splice(0,0,transfert);


                },function (error) {
                  console.log("add transfert error ");
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
        TransfertsService.deletById(itemToDelete.id)
          .success(function(response){
            console.log("delete transfert ok");
            $scope.transferts.splice(index,1);
          })
          .error(function(error){
            console.log("delete transfert error");
            console.log(error);
          });


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
              TransfertsService.updateTransfert($scope.popupScope.selectedItem)
                .success(function(response){
                  console.log("update transfert ok");
                  TransfertsService.clone(itemToEdite,$scope.popupScope.selectedItem);
                })
                .error(function(error){
                  console.log("update transfert error");
                  console.log(error);
                });



            }else{
              e.preventDefault();
            }
          }
        }
      ]
    })

  };


});
