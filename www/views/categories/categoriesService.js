/**
 * Created by EL Barto on 06/05/2016.
 */
angular.module('App')
.service('CategoriesService',function(){

  var data = [
    {
      id:1,
      idPorteFeuille:1,
      designation:'course',
      descript:'mes courses'

    },
    {
      id:2,
      idPorteFeuille:1,
      designation:'transports',
      descript:'mes depenses de transport'

    },
    {
      id:2,
      idPorteFeuille:1,
      designation:'santé',
      descript:'mes depenses de santé'

    },
    {
      id:3,
      idPorteFeuille:1,
      designation:'etudes',
      descript:'mes depenses etudiant '

    },
  ];


  return{
    categories: data
  };

});
