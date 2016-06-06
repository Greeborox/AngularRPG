angular.module('textRPG').
  service('playerService', ['roomService','mainService', function(roomService,mainService) {
    // State vars
    var self = this;
    this.currentLocation = 'start';
    this.direction = undefined;
    this.performingAction = false;
    this.currentAction = undefined;
    this.dead = false;
    this.attacking = undefined;
    this.attackReady = false;
    this.droping = undefined;
    this.dropingReady = false;
    this.picking = undefined;
    this.pickUpReady = false;
    this.currentActionTime = 0;

    this.gold = 0;
    this.inventory = {};
    this.equiped = {
      'weapon':'sword',
      'armor':'leather',
      'amulet': undefined,
      'ring': undefined,
    }
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
      'picking': function(){
        if(self.currentActionTime >= 50){
          self.pickUpReady = true;
          self.performingAction = false;
          self.currentAction = undefined;
          self.currentActionTime = 0;
        } else {
          self.currentActionTime += 1;
        }
      },
      'droping': function(){
        if(self.currentActionTime >= 30){
          self.dropingReady = true;
          self.performingAction = false;
          self.currentAction = undefined;
          self.currentActionTime = 0;
        } else {
          self.currentActionTime += 1;
        }
      },
    }

    this.has = function(item){
      if(this.inventory[item]){
        return true
      } else {
        return false
      }
    }

    this.walk = function(direction){
      this.direction = direction;
      this.performingAction = true;
      this.currentAction = 'walking';
    }

    this.attack = function(monster){
      this.attacking = monster;
      this.performingAction = true;
      this.currentAction = 'attacking';
    }

    this.pickUp = function(item){
      this.picking = item;
      this.performingAction = true;
      this.currentAction = 'picking';
    }

    this.drop = function(item){
      this.droping = item;
      this.performingAction = true;
      this.currentAction = 'droping';
    }

    this.update = function(){
      if(this.performingAction){
        this.actions[this.currentAction]();
      }
      if(this.attackReady){
        roomService.clearRoom(this.currentLocation,this.attacking.name);
        self.attackReady = false;
      }
      if(this.dropingReady){
        roomService.itemsDropped.push(self.droping);
        mainService.addEntry("dropped "+self.droping);
        self.dropingReady = false;
      }
      if(this.pickUpReady){
        var item = this.picking
        roomService.removeItem(this.currentLocation,item);
        if(this.has(item)){
          this.inventory[item].amount += 1;
        } else {
          this.inventory[item] = {'name':item,amount:1};
        }
        mainService.addEntry("picked up "+item);
        self.pickUpReady = false;
      }
    }

    this.kill = function(){
      this.dead = true;
    }
  }])
