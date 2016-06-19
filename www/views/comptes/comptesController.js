angular.module('App')
.controller('ComptesController',function($scope,ComptesService,$ionicPopup,loginService){


  var userId = loginService.currentAppUser.id;

  ComptesService.getCompteOneUser(userId)
    .success(function(comptes){

      ComptesService.comptes = comptes;
      $scope.comptes = ComptesService.comptes;
  });



  $scope.popupScope= {
    selectedItem : ComptesService.getAnInstance('','','','',''),
    invalideDesignation:false,
    invalideSolde:false

  };

  $scope.delete= function(index){

    var itemToDelete = $scope.comptes[index];
    var deletePopup = $ionicPopup.confirm({

      template:'Supprimer le compte ?',
      cancelText:'Non',
      cancelType:'button-positive',
      okText:'Oui',
      okType:'button-positive'
    });

    deletePopup.then(function(res){
      if(res){

        //-TODO implementing the http delete call
        ComptesService.deleteById(itemToDelete.id)
          .success(function(response){

          console.log("delete compte ok");
          $scope.comptes.splice(index,1);
        })
          .error(function(error){
            console.log("delete compte error");
            console.log(error);
          });

      }else{
        //canceling the operation
      }

    });
  };

  $scope.edite = function(index){

    var itemToEdit = $scope.comptes[index];
    ComptesService.clone($scope.popupScope.selectedItem,itemToEdit);


    var editePopup = $ionicPopup.show({

      title:'Editer le compte',
      templateUrl:'views/comptes/popup_comptes.html',
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
            }
            else if(! ComptesService.isValideSolde($scope.popupScope.selectedItem.solde)){
              $scope.popupScope.invalideSolde = true;
              e.preventDefault();
            }
            else{

              $scope.popupScope.invalideDesignation = false;
              $scope.popupScope.invalideSolde = false ;
              //-TODO  implemeting the http put call
              /*editing the item*/
              ComptesService.updateCompte($scope.popupScope.selectedItem).
              success(function(response){

                console.log("update compte ok");
                ComptesService.clone(itemToEdit,$scope.popupScope.selectedItem);

              }).error(function(error){
                console.log("put error");
                console.log(error);
              });

            }}
        }
      ]
    });

  };

  $scope.add = function(){

    $scope.popupScope.selectedItem = ComptesService.getAnInstance('','','','','');
    $scope.popupScope.invalideDesignation = false ;
    $scope.popupScope.invalideSolde = false ;

    var addPopup = $ionicPopup.show({
      title:'ajouter un compte',
      templateUrl:'views/comptes/popup_comptes.html',
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

            } else if(! ComptesService.isValideSolde($scope.popupScope.selectedItem.solde)){

              $scope.popupScope.invalideSolde = true;
              e.preventDefault();
            }else{

              $scope.popupScope.invalideDesignation = false;
              $scope.popupScope.invalideSolde =false ;
              //formatting the new object to add
              var solde = $scope.popupScope.selectedItem.solde == "" ? 0 : $scope.popupScope.selectedItem.solde;
              var compteToAdd = ComptesService.getAnInstance('',userId,
                                  solde,
                                  $scope.popupScope.selectedItem.designation,
                                  $scope.popupScope.selectedItem.descript);

              //-TODO implementing the post methode to add the object
              ComptesService.addCompte(compteToAdd)
                .then(function(response){

                  var locationStringArray = response.headers("Location").split("/");
                  var locationInt = locationStringArray[locationStringArray.length - 1 ];
                  compteToAdd.id = locationInt;
                  $scope.comptes.splice(0,0,compteToAdd);
                  console.log("add compte ok");

              }, function (error){

                  console.log("add error");
                  console.log(error);

                });
            }
          }
        }
      ]
    })
  };



});
