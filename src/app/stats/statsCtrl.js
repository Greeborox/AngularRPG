angular.module('textRPG')
  .controller('statsController', ['playerService','itemsService',function(playerService,itemsService){
    this.player = playerService;
    this.items = itemsService.items;
}]);
