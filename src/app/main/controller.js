angular.module('textRPG')
  .controller('mainController', ['$interval','playerService','mainService', 'roomService', 'monstersService',function($interval, playerService, mainService, roomService, monstersService){
    var self = this;
    this.player = playerService;
    this.roomService = roomService;
    this.rooms = roomService.rooms;
    this.log = mainService.log;
    this.add = mainService.addEntry;
    this.monsters = monstersService;

    this.walk = function(direction){
      this.add("Walking "+direction+"...");
      this.player.walk(direction);
    }

    this.checkAction = function(){
      if(this.player.performingAction){
        return true;
      }
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

    this.checkMonsters = function(){
      if(this.rooms[this.player.currentLocation].monsters.length == 0){
        return true
      } else {
        return false
      }
    }

    this.checkAttackers = function(){
      var monsterList = this.rooms[this.player.currentLocation].monsters;
      for (var i = 0; i < monsterList.length; i++) {
        var currMonster = monsterList[i];
        if(currMonster.attacking){
          this.add(currMonster.type+' is attacking!');
          currMonster.attacking = false;
        }
      }
    }

    this.getCurrMonsters = function(){
      return this.rooms[this.player.currentLocation].monsters;
    }

    this.listMonsters = function(){
      var monsterList = this.rooms[this.player.currentLocation].monsters;
      var presentMonstersMap = {};
      for (var i = 0; i < monsterList.length; i++) {
        if(presentMonstersMap[monsterList[i].type] === undefined){
          presentMonstersMap[monsterList[i].type] = 1;
        } else {
          presentMonstersMap[monsterList[i].type] += 1 ;
        }
      }
      var monsterText = "Monsters: ";
      for (var monster in presentMonstersMap) {
        if (presentMonstersMap.hasOwnProperty(monster)) {
          monsterText += presentMonstersMap[monster];
          monsterText += " ";
          monsterText += presentMonstersMap[monster]>1 ? monster+"s " : monster+" ";

        }
      }
      return monsterText;
    }

    this.attack = function(monster){
      this.player.attack(monster);
    }

    this.emmitMessage = function(){
      if(!this.rooms[this.player.currentLocation].monsters.length == 0){
        this.add(this.listMonsters());
      }
      this.add(this.rooms[this.player.currentLocation].description);
    }

    this.update = function(){
      self.player.update();
      if(self.rooms[self.player.currentLocation].monsters.length != 0){
        self.monsters.update(self.rooms[self.player.currentLocation].monsters);
        self.checkAttackers();
      }
      if(self.roomService.getAnnounce()){
        if(self.rooms[self.player.currentLocation].monsters.length == 0){
          self.roomService.spawnMonsters(self.player.currentLocation);
        }
        self.emmitMessage();
        self.roomService.setAnnounce(false);
      }
      if(self.roomService.getKillAnnounce()){
        self.add('You slay the '+self.player.attacking.type+'!');
        self.player.attacking = undefined;
        if(!self.rooms[self.player.currentLocation].monsters.length == 0){
          self.add(self.listMonsters());
        }
        self.roomService.setKillAnnounce(false);
      }
      if(self.player.dead){
        $interval.cancel(self.loop);
      }
    }

    this.loop = $interval(this.update,1000/60)
  }]);
