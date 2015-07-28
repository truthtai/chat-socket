/* global Color */
angular.module('HomeModule',[])
.controller('HomeCtrl', homeCtrl);
function homeCtrl(Messenger, $scope, Member, $state, $mdToast) {
	var vm = this;
  vm.MemberIDLogged = localStorage.getItem('$LoopBack$currentUserId');
  Messenger.find()
  .$promise
  .then(function(msg){
    vm.messengers = msg;
  });  
  
  vm.delete = function(id){
    Messenger.deleteById({id: id})
    .$promise
    .then(function(){
      $mdToast.show(
        $mdToast.simple()
          .content('Deleted success!')
          .position('top right')
          .hideDelay(3000)
      );
    })
    .catch(function(error){
      $mdToast.show(
        $mdToast.simple()
          .content(error.statusText)
          .position('top right')
          .hideDelay(3000)
      );
    })
  }
  
	vm.ok = function(msg2){
		   if(msg2){
          Messenger.create({msg: msg2, date: new Date(), memberId: vm.MemberIDLogged})
          .$promise
          .then(function(){
            socket.emit('msg:Add',{msg: msg2, date:new Date(), memberId: vm.MemberIDLogged});
            vm.msg2 = '';
          })
          .catch(function(error){
            $mdToast.show(
              $mdToast.simple()
                .content(error.statusText)
                .position('top right')
                .hideDelay(3000)
            );
          })
       }
	}
Array.prototype.indexOfObject = function(obj) {
    var l = this.length, i, k, ok;
    for( i=0; i<l; i++) {
        ok = true;
        for( k in obj) if( obj.hasOwnProperty(k)) {
            if( this[i][k] !== obj[k]) {
                ok = false;
                break;
            }
        }
        if( ok) return i;
    }
    return -1; // no match
};

socket.on('msg:Add', function(msg){
    //console.log(msg)
    vm.messengers.push({msg: msg.msg, date:msg.date, id: msg.id, memberId: msg.memberId})
    $scope.$apply();     
});
    
 socket.on('msg:Delete', function(msgId){
    //console.log(vm.messengers.indexOfObject({id: msgId}))
    vm.messengers.splice(vm.messengers.indexOfObject({id: msgId}), 1)
    $scope.$apply();     
 });  
    
  
  vm.logout = function(){
    
    Member.logout()
    .$promise
    .then(function(){
      $state.go('login');
    })
    .catch(function(error){
      localStorage.removeItem('$LoopBack$currentUserId');
      localStorage.removeItem('$LoopBack$accessTokenId');
      $state.go('login');
      console.log(error.status)
    })
  }
  

}