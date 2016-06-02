angular.module('textRPG').
  service('playerService', ['roomService', function(roomService) {
    // State vars
    var self = this;
    this.currentLocation = 'start';
    this.direction = undefined;
    this.performingAction = false;
    this.currentAction = undefined;
    this.dead = false;
    this.attacking = undefined;
    this.attackReady = false;
    this.currentActionTime = 0;
    // Attribute vars
    this.speed = 10;

    //actions
    this.actions = {
      'walking': function(){
        if(self.currentActionTime >= 100){
          self.currentLocation = roomService.rooms[self.currentLocation][self.direction];
          roomService.setAnnounce(true);
          self.direction = undefined;
          self.performingAction = false;
          self.currentAction = undefined;
          self.currentActionTime = 0;
        } else {
          self.currentActionTime += 1;
        }
      },
      'attacking': function(){
        if(self.currentActionTime >= 200){
          self.attackReady = true;
          self.performingAction = false;
          self.currentAction = undefined;
          self.currentActionTime = 0;
        } else {
          self.currentActionTime += 1;
        }
      },
    }

    this.walk = function(direction){
      this.direction = direction;
      this.performingAction = true;
      this.currentAction = 'walking';
    }

    this.attack = function(monster){
      this.attacking = monster;
      //roomService.clearRoom(this.currentLocation,monster.name);
      this.performingAction = true;
      this.currentAction = 'attacking';
    }

    this.update = function(){
      if(this.performingAction){
        this.actions[this.currentAction]();
      }
      if(this.attackReady){
        roomService.clearRoom(this.currentLocation,this.attacking.name);
        self.attackReady = false;
      }
    }

    this.kill = function(){
      this.dead = true;
    }
  }])
