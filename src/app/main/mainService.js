angular.module('textRPG').
  service('mainService', function(){
    this.msgWindow = document.querySelector('#mainView>div');
    this.log = ['Welcome To Angular RPG. Good Luck!'];
    this.addEntry = function(string){
      this.log.unshift(string);
    }
  })
