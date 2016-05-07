angular.module('App')
.controller('ComptesController',function($scope,ComptesService,$ionicPopup){

  $scope.comptes = ComptesService.comptes ;

  $scope.popupScope= {
    selectedItem : ComptesService.getAnInstance('','','','',''),
    invalideDesignation:false
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
        $scope.comptes.splice(index,1);
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
            }else{
              $scope.popupScope.invalideDesignation = false;

              //-TODO  implemeting the http put call
              /*editing the item*/
              ComptesService.clone(itemToEdit,$scope.popupScope.selectedItem);


            }}
        }
      ]
    });

  };

  $scope.add = function(){

    $scope.popupScope.selectedItem = ComptesService.getAnInstance('','','','','');
    $scope.popupScope.invalideDesignation = false ;

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
            }else{

              $scope.popupScope.invalideDesignation = false;

              //-TODO formatting the new object to add

              var competeToAdd = ComptesService.getAnInstance('','',0,
                                  $scope.popupScope.selectedItem.designation,
                                  $scope.popupScope.selectedItem.descript);

              //-TODO implementing the post methode to add the object

              $scope.comptes.splice(0,0,competeToAdd);
            }
          }
        }
      ]
    })
  };

});
