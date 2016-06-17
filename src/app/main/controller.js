angular.module('textRPG')
  .controller('mainController', ['$interval','$location','$window' ,'playerService','mainService', 'roomService', 'monstersService','itemsService',function($interval, $location, $window, playerService, mainService, roomService, monstersService, itemsService){
    var self = this;
    this.player = playerService;
    this.roomService = roomService;
    this.rooms = roomService.rooms;
    this.log = mainService.log;
    this.add = mainService.addEntry;
    this.mainService = mainService;
    this.monsters = monstersService;
    this.actionBarLength = 0;

    this.actionBar = {
      width: this.actionBarLength+"px",
    }

    this.reload = function() {
      $window.location.reload();
    }

    this.changeView = function(view){
      $location.url("/"+view);
    }

    this.inAShop = function(){
      if(this.rooms[this.player.currentLocation].isShop){
        return false;
      } else {
        return true;
      }
    }

    this.buy = function(item){
      if(this.player.has(item)){
        this.player.inventory[item].amount += 1;
      } else {
        this.player.inventory[item] = {'name':item,amount:1};
      }
      this.player.gold.amount -= itemsService.items[item].price;
      this.add("you buy the "+item);
    }

    this.sell = function(item){
      if(this.player.inventory[item].amount > 1){
        this.player.inventory[item].amount -= 1;
      } else {
        delete this.player.inventory[item];
      }
      this.player.gold.amount += Math.floor(itemsService.items[item].price/4);
      this.add("you sell the "+item);
    }

    this.getPrice = function(item){
      if(item){
        return Math.floor(itemsService.items[item].price/4)
      }
    }

    this.cannotAfford = function(item){
      if(this.player.gold.amount < itemsService.items[item].price) {
        return true;
      } else {
        return false;
      }
    }

    this.getHighPrice = function(item){
      if(item){
        return itemsService.items[item].price
      }
    }

    this.getForSale = function(){
      return this.rooms[this.player.currentLocation].forSale
    }

    this.inventoryNotEmpty = function(){
      if(Object.keys(this.player.inventory).length === 0){
        return true;
      } else {
        return false;
      }
    }

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
          if(itemsService.items[this.player.equiped.armor]){
            var playerDef = itemsService.items[this.player.equiped.armor].defence;
          }
          var monsterDmg = Math.floor(Math.random() * (currMonster.maxDmg - currMonster.minDmg) + currMonster.minDmg);
          if(playerDef){
            this.add(currMonster.type+' is attacking! It deals '+monsterDmg+ ' damage ('+playerDef+' absorbed by '+this.player.equiped.armor+')');
            monsterDmg -= playerDef;
          } else {
            this.add(currMonster.type+' is attacking! It deals '+monsterDmg+ ' damage');
          }
          currMonster.attacking = false;
          this.player.hp -= Math.max(monsterDmg,0);
        }
      }
    }

    this.getCurrMonsters = function(){
      return this.rooms[this.player.currentLocation].monsters;
    }

    this.getCurrItems = function(){
      return this.rooms[this.player.currentLocation].items;
    }

    this.listMonsters = function(){
      var monsterList = this.getCurrMonsters();
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

    this.listItems = function(){
      var items = this.getCurrItems();
      var itemsText = "There are following items here: ";
      for (var i = 0; i < items.length; i++) {
        itemsText += items[i];
        if(i < items.length-1){
          itemsText+= ", ";
        }
      }
      return itemsText;
    }

    this.attack = function(monster){
      this.add("You attack the "+monster.type);
      this.player.attack(monster);
    }

    this.pickUp = function(item){
      this.player.pickUp(item);
    }

    this.emmitMessage = function(){
      if(!this.getCurrMonsters().length == 0){
        this.add(this.listMonsters());
      }
      if(!this.getCurrItems().length == 0){
        this.add(this.listItems());
      }
      this.add(this.rooms[this.player.currentLocation].description);
    }

    this.grantExp = function(exp) {
      this.add("You gain " + exp + " experience points.")
      this.player.experience.curr += exp;
    }

    this.update = function(){
      self.player.update();
      if(self.mainService.toHealPlayer){
        self.player.hp = self.player.maxHp;
        self.mainService.toHealPlayer = false;
      }
      self.actionBarLength = (self.player.currentActionTime/self.player.currActionLength)*100;
      self.actionBar = {width: self.actionBarLength+"px"}
      if(self.rooms[self.player.currentLocation].monsters.length != 0){
        self.monsters.update(self.rooms[self.player.currentLocation].monsters);
        self.checkAttackers();
      }
      if(self.roomService.getAnnounce()){
        if(self.rooms[self.player.currentLocation].monsters.length == 0){
          self.roomService.spawnMonsters(self.player.currentLocation);
        }
        self.emmitMessage();
        if(self.rooms[self.player.currentLocation].isFountain){
          self.mainService.toHealPlayer = true;
        }
        self.roomService.setAnnounce(false);
      }
      if(self.roomService.getKillAnnounce()){
        self.add('You slay the '+self.player.attacking.type+'!');
        if(!self.rooms[self.player.currentLocation].monsters.length == 0){
          self.add(self.listMonsters());
        }
        self.grantExp(self.player.attacking.expValue);
        self.player.attacking = undefined;
        self.roomService.setKillAnnounce(false);
      }
      if(self.roomService.itemsDropped.length > 0){
        for (var i = 0; i < self.roomService.itemsDropped.length; i++) {
          self.rooms[self.player.currentLocation].items.push(self.roomService.itemsDropped[i])
        }
        //self.add(self.listLoot());
        self.roomService.itemsDropped = [];
      }
      if(self.roomService.goldDropped > 0){
        self.player.gold.amount += self.roomService.goldDropped;
        self.add('You gain '+self.roomService.goldDropped+' gold!');
        self.roomService.goldDropped = 0;
      }
      if(self.player.itemsToRemove.length > 0){
        for (var i = 0; i < self.player.itemsToRemove.length; i++) {
          var item = self.player.itemsToRemove[i];
          if(self.player.inventory[item].amount > 1){
            self.player.inventory[item].amount -= 1;
          } else {
            delete self.player.inventory[item];
          }
        }
        self.player.itemsToRemove = [];
      }
      if(self.player.dead){
        $interval.cancel(self.loop);
      }
    }

    this.loop = $interval(this.update,1000/60)
  }]);
