angular.module('App')
  .controller('loginController',function($scope,$state,loginService){



    $scope.loginToFacebook= function () {

      loginService.login().
      then(function(response){

        console.log(response);

        if(response.status == 'connected'){

          console.log('utilisateur connecté ');
          var userFbId = response.authResponse.userID ;
          console.log('idFacebook de l\'utlisateur:'+userFbId);

          loginService.getAppUserByFBId(userFbId)
            .success(function(user){

              console.log("user");
              console.log(user);
              if(user != null){

                loginService.currentAppUser = user;
                var currenFbUser = {
                  fbId : userFbId,
                  firstName:'',
                  lastName:'',
                  email:'',
                  pictureUrl:''
                };


                loginService.getFBUser()
                  .then(function(response){
                    console.log("FB response");
                    console.log(response);

                    currenFbUser.fbId =  response.id;
                    currenFbUser.firstName = response.first_name;
                    currenFbUser.lastName = response.last_name;
                    currenFbUser.email = response.email;
                    currenFbUser.pictureUrl = response.picture.data.url;

                    loginService.currentFbUser = currenFbUser;
                    console.log(currenFbUser);

                    // passage au home
                    $state.go('home.dashboard.profile');
                  });
              }else{

                /*nouvelle utilisateur */

                var portefeuille = {
                  id: null,
                  designation: null,
                  dateCreation: new Date()
                };

                var compte = {
                  id: 0,
                  designation: "compte espece",
                  descript: "compte espece ",
                  solde: 0,
                  idUtilisateur: 2
                };
                var user = {
                  id: 0,
                  nom: "",
                  prenom: "",
                  nomDeCompte: "",
                  roleUtilisateur: "principal",
                  idFacebook: response.authResponse.userID,
                  idPorteFeuille: 1
                };


              }


            })
            .error(function(error){

              console.log("error getAppUserByFbID");
              console.log(error);
            });


        }

      },function(error){
        console.log("error login facebook");
        console.log(error);
      });
    };


  });
