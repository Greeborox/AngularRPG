angular.module('textRPG')
  .controller('equipmentCtrl', ['playerService',function(playerService){
    this.equipment = playerService.equiped;
    this.player = playerService;

    this.hasEquiped = function(spot){
      return this.equipment[spot] != undefined;
    }

    this.unequip = function(spot){
      this.player.unequip(spot);
    }
}]);
