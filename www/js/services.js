angular.module('starter.services', ['firebase'])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  },{
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

.service('ListEstablecimiento', function(){

  var establecimientos = [{
    id: 0,
    name: 'Establecimiento de nivel ',
    type: '1',
    servicio: 'servicioMinimoN1'
  },{
    id: 1,
    name: 'Establecimiento de nivel ',
    type: '2',
    servicio: 'servicioMinimoN2'  
  },{
    id: 2,
    name: 'Establecimiento de nivel ',
    type: '3',
    servicio: 'servicioMinimoN3'
  },{
    id: 3,
    name: 'Servicios',
    type: ' ',
    servicio:'todosServicios'
  }];

  return {
    all: function() {
      return establecimientos;
    },
    remove: function(establecimiento) {
      establecimientos.splice(establecimientos.indexOf(establecimiento), 1);
    },
    get: function(establecimientoId) {
      for (var i = 0; i < establecimientos.length; i++) {
        if (establecimientos[i].id === parseInt(establecimientoId)) {
          return establecimientos[i];
        }
      }
      return null;
    }
  };

})

.service('LoginService', function($q){

return{
  loginUser: function(name, pw){
    var deferred = $q.defer();
    var promise = deferred.promise;

     if(name == 'user' && pw == 'secret'){
      deferred.resolve('Welcome'+name + '!!!!');
     }else{
      deferred.reject('Wrong Credentials..');
     }

     promise.success = function(fn){
      promise.then(fn);
      return promise;
     } 

     promise.error = function(fn){
      promise.then(null, fn);
      return promise;
     }
     return promise;
   }
 } 
})
.service('ListaServiciosAny',function(){ 
  
  //var lastText = '[{ "name":"franklin" , "lastname":"flores" },{ "name":"Roger" , "lastname":"flores" }]';
  //var arrayPrueba = JSON.parse(lastText);
  var idSalud = 0 ;
  //JSON.parse('{ "name":"'+myService.service[j]+'" , "checked":"false" }');
  return{
    setId:function(idEstablecimiento){
      idSalud = idEstablecimiento;
    
    },
    getId:function(){
      return idSalud;
    }

  }  
})

.service('MyUrlConexion',function(){

 var urlDir = "";
 var ref = "";
 return{
    refUrl:function(nivel,centros){
      urlDir = "https://testappdb.firebaseio.com/establecimientos"+"/"+nivel+"/"+centros;
      ref = new Firebase(urlDir);
      return ref;
    }
  }
});
