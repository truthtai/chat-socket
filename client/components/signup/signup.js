angular.module('SignupModule',[]).controller('SignupCtrl', SignupCtrl);
function SignupCtrl(Member, $state, $mdToast){ 
  this.signup = function(email,pass) {
    Member.create({email: email, password: pass})    
    .$promise
    .then(function(req){
      $mdToast.show(
        $mdToast.simple()
          .content('Signup success!')
          .position('top right')
          .hideDelay(3000)
      );
      //console.log(req);
      $state.go('login');
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
