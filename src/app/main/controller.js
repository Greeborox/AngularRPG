angular.module('textRPG')
  .controller('mainController', ['$interval','playerService','mainService', 'roomService',function($interval, playerService, mainService, roomService){
    var self = this;
    this.player = playerService;
    this.roomService = roomService;
    this.rooms = roomService.rooms;
    this.log = mainService.log;
    this.add = mainService.addEntry;

    this.walk = function(direction){
      this.add("Walking "+direction+"...");
      this.player.direction = direction;
      this.player.walk();
    }

    this.checkDirection = function(direction){
      if(this.player.performingAction){
        return true;
      }
      if(this.rooms[this.player.currentLocation][direction] == undefined){
        return true;
      }
      return false;
    }

    this.update = function(){
      console.log(self.roomService.announceRoom);
      self.player.update();
      if(self.roomService.getAnnounce()){
        self.add(self.rooms[self.player.currentLocation].description);
        self.roomService.setAnnounce(false);
      }
      if(self.player.dead){
        $interval.cancel(self.loop);
      }
    }

    this.loop = $interval(this.update,1000/60)
  }]);
