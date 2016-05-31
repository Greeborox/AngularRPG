angular.module('textRPG').
  service('mainService', function(){
    this.log = ['Welcome To Angular RPG. Good Luck!'];
    this.addEntry = function(string){
      this.log.unshift(string);
    }
  })
