angular.module('textRPG')
  .controller('inventoryCtrl', ['playerService','roomService',function(playerService,roomService){
    this.roomService = roomService;
    this.inventory = playerService.inventory;
    this.gold = playerService.gold;
    this.player = playerService;

    this.drop = function(item){
      if(this.inventory[item].amount > 1){
        this.inventory[item].amount -= 1;
      } else {
        delete this.inventory[item];
      }
      this.player.drop(item);
    }
}]);
