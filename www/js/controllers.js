angular.module('starter.controllers', ['firebase'])

.controller('DashCtrl', function($scope, ListEstablecimiento) {

  $scope.establecimientos = ListEstablecimiento.all();
  $scope.remove = function(establecimiento){
    ListEstablecimiento.remove(establecimiento);
  }
 //console.log("esto es:"+$scope.establecimientos[0].id);
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('DashDetailCtrl',function($scope , $stateParams , ListEstablecimiento , $state , ListaServiciosAny, MyUrlConexion,$firebaseArray){  //, ListaServiciosAny

  var myNivel = {};
  var myServicesMin = {};
  $scope.establecimiento = ListEstablecimiento.get($stateParams.establecimientoId);
  ListaServiciosAny.setId($scope.establecimiento.type);
  myNivel = $scope.establecimiento.id;
  myServicesMin = $scope.establecimiento.servicio;
  var myDir = MyUrlConexion.refUrl(myNivel,myServicesMin);  

  console.log("<>"+myDir);
  $scope.listServices = $firebaseArray(myDir);
  console.log("Service invoke"+$scope.listServices + "not show");

  $scope.navigate = function(){
   //console.log("redirect...");
   $state.go('tab.dash-map');                               //mucho cuidado con esto para invocar en el view..
  }                                                          //primero guardar en scope....luego usar la variable...
                                                             // $scope.datoGuardado = xxx ;
                                                             //en el view datoGuardado = [{}{}] {} datoGuardado.name , etc
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
  
})


.controller('DashDetailMap', function($scope , $stateParams, ListaServiciosAny, MyUrlConexion ){
  $stateParams.newsEstablecimiento = ListaServiciosAny.getId();    
    var idEstablecimiento = $stateParams.newsEstablecimiento; //id establecimiento get()
    var posicion = 4 ;
    var centro = "centrosSalud"; 
    var newRef = MyUrlConexion.refUrl(posicion,centro);
    idEstablecimiento = idEstablecimiento + "N";
    //obteniendo la url y leyendo los datos
    var myLatlng = new google.maps.LatLng(-17.392893,-66.149542);
    //console.log("..."+idEstablecimiento); //latlong.F  latlong.F
        var mapOptions = {
        center: myLatlng,
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
  var markers = [] ;
  var map = new google.maps.Map(document.getElementById("mapa"), mapOptions);
  var marker = new google.maps.Marker({
              position: new google.maps.LatLng(myLatlng.A, myLatlng.F),
              map: map,
              icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
              title: "Yo Mi posicion"
              
      });

    newRef.on("child_added", function(snapshot) {
    var allEstab = snapshot.val();
    //console.log("es"+allEstab.tipo+"tambien:"+idEstablecimiento);
        if(idEstablecimiento == allEstab.tipo){
            markers.push(new google.maps.Marker({
            position: new google.maps.LatLng(allEstab.latitud,allEstab.longitud),
            map: map,
            title: allEstab.nombre +"--"+allEstab.tipo
                 }));
        }
        if(idEstablecimiento == " N"){
            markers.push(new google.maps.Marker({
            position: new google.maps.LatLng(allEstab.latitud,allEstab.longitud),
            map: map,
            title: allEstab.nombre +"--"+allEstab.tipo
                 }));
        }
 });
   
  })

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state) {
    $scope.data = {};
 
    $scope.login = function() {
      console.log("entro");
        LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
            $state.go('tab.dash');
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        });
    }
});
