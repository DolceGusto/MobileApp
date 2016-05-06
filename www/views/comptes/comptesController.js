angular.module('App')
.controller('ComptesController',function($scope,ComptesService,$ionicPopup){

  $scope.comptes = ComptesService.comptes ;

  $scope.popupScope= {
    selectedItem :{
      designation:'',
      descript:''
    },
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
    $scope.popupScope.selectedItem.designation  = itemToEdit.designation;
    $scope.popupScope.selectedItem.descript = itemToEdit.descript;

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
              itemToEdit.designation = $scope.popupScope.selectedItem.designation;
              itemToEdit.descript = $scope.popupScope.selectedItem.descript;

            }}
        }
      ]
    });

  };

  $scope.add = function(){

    $scope.popupScope.selectedItem.descript = '';
    $scope.popupScope.selectedItem.designation = '';
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
              var competeToAdd = {
                id:'',
                idUtilisateur:'',
                solde:0,
                designation: $scope.popupScope.selectedItem.designation,
                descript: $scope.popupScope.selectedItem.descript
              };

              //-TODO implementing the post methode to add the object

              $scope.comptes.splice(0,0,competeToAdd);
            }
          }
        }
      ]
    })
  };

});
