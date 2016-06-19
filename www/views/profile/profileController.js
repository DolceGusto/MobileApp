angular.module('App')
  .controller('profileController',function($scope,$state,loginService,DepensesService,EntreesService){

    var userId = loginService.currentAppUser.id;

    $scope.pictureUrl = loginService.currentFbUser.pictureUrl;
    $scope.last_name = loginService.currentFbUser.lastName;
    $scope.first_name = loginService.currentFbUser.firstName;
    $scope.email = loginService.currentFbUser.email ;

    DepensesService.getTotalDepense(userId)
      .success(function(totalDepenses){

        console.log("getTotalDepense ok");
        console.log(totalDepenses);

        $scope.totalDepenses = totalDepenses;
      })
      .error(function(error){

        console.log("error gat total Depenese");
        console.log(error);
      });

    EntreesService.getTotalEntree(userId)
      .success(function(totalRevenus){

        console.log("getTotalRevenus ok");
        console.log(totalRevenus);

        $scope.totalRevenus = totalRevenus;
      })
      .error(function(error){

        console.log("error gat total Depenese");
        console.log(error);
      });

  });
