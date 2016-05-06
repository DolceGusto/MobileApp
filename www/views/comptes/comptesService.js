angular.module('App')
.service('ComptesService',function(){

  var data = [
    {
      id:'1',
      idUtilisateur:'1',
      solde: 10000,
      designation:'compte espece',
      descript: 'mon compter espece'
    },
    {
      id:'2',
      idUtilisateur:'1',
      solde: 10000,
      designation:'compte banquaire',
      descript: 'mon compter en banque'
    },
    {
      id:'3',
      idUtilisateur:'1',
      solde: 10000,
      designation:'compte ccp',
      descript: 'mon compter ccp'
    }
  ];


  return{
    comptes: data

  };

})
