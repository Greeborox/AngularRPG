angular.module('textRPG').
  service('mainService', function(){
    this.toHealPlayer = false;
    this.log = ['Welcome To Angular RPG. Good Luck!'];
    this.addEntry = function(string){
      this.log.unshift(string);
    }
    this.healPlayer = function(){
      this.toHealPlayer = true;
    }
  })
