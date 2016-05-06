angular.module('App')
.controller('CategoriesController',function($scope,$ionicPopup,CategoriesService){

  $scope.categories = CategoriesService.categories;
  $scope.popupScope = {

    selectedItem:{
      designation:'',
      descript:''
    },
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
          $scope.categories.splice(index, 1);
        } else {
          //canceling the operation
        }

    });
  };

  $scope.edite = function(index){

    var itemToEdit = $scope.categories[index];
    $scope.popupScope.selectedItem.designation  = itemToEdit.designation;
    $scope.popupScope.selectedItem.descript = itemToEdit.descript;

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
              /*editing the item*/
              itemToEdit.designation = $scope.popupScope.selectedItem.designation;
              itemToEdit.descript = $scope.popupScope.selectedItem.descript;

            }}
        }
      ]
    });

  };

  $scope.add = function(index){


    $scope.popupScope.selectedItem.descript = '';
    $scope.popupScope.selectedItem.designation = '';
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

              //-TODO formatting the new object to add
              var competeToAdd = {
                id:'',
                idPorteFeuille:'',
                designation: $scope.popupScope.selectedItem.designation,
                descript: $scope.popupScope.selectedItem.descript
              };

              //-TODO implementing the post methode to add the object

              $scope.categories.splice(0,0,competeToAdd);
            }
          }
        }
      ]
    })

  };


});
