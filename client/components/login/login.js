angular.module('LoginModule',[]).controller('LoginCtrl', LoginCtrl);
function LoginCtrl(Member, $state, $mdToast){ 
  this.login = function(email,pass) {
    Member.login({email: email, password: pass})    
    .$promise
    .then(function(req){
      //console.log(req);
      $mdToast.show(
        $mdToast.simple()
          .content('Login success!')
          .position('top right')
          .hideDelay(3000)
      );
      $state.go('home');
    })
    .catch(function(error){
      $mdToast.show(
        $mdToast.simple()
          .content(error.status)
          .position('top right')
          .hideDelay(3000)
      );
      //console.log(error.status)
    })
    
  }
}
