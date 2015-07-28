/* global Color */
angular.module('HomeModule',[])
.controller('HomeCtrl', homeCtrl);
function homeCtrl(Messenger, $scope, Member, $state, $mdToast) {
	var vm = this;
  Messenger.find()
  .$promise
  .then(function(msg){
    vm.messengers = msg;
  });  
  
  vm.delete = function(id, index){
    Messenger.deleteById({id: id})
    .$promise
    .then(function(){
      $mdToast.show(
        $mdToast.simple()
          .content('Deleted success!')
          .position('top right')
          .hideDelay(3000)
      );
      vm.messengers.splice(index, 1)
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
          Messenger.create({msg: msg2, date: new Date(), memberId: localStorage.getItem('$LoopBack$currentUserId')});           
			    console.log(msg2);
          socket.emit('chat message',{msg: msg2, date:new Date(), memberId: localStorage.getItem('$LoopBack$currentUserId')});
         vm.msg2 = '';
       }
	}

	socket.on('chat message', function(msg){
   vm.messengers.push({msg: msg.msg, date:msg.date})
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