angular.module('textRPG').
  service('monstersService', function(){

    this.update = function(monsterList) {
      for (var i = 0; i < monsterList.length; i++) {
        var currMonster = monsterList[i];
        if(currMonster.lastAttack >= currMonster.attackTime){
          if(currMonster.attitude === 'aggresive'){
            currMonster.attacking = true;
          }
          currMonster.lastAttack = 0;
        } else {
          currMonster.lastAttack++
        }
      }
    }

    this.generateLoot = function(monster){
      var lootArray = [];
      for (var i = 0; i < this.monsterLoot[monster].length; i++) {
        var currLootTable = this.monsterLoot[monster][i];
        if(Math.random() < currLootTable.chance){
          lootArray.push(currLootTable.item);
        }
      }
      return lootArray;
    }

    this.monsterLoot = {
      'goblin': [{'item':'Goblin Ear','chance':0.9},{'item':'Rock','chance':0.5}],
      'troll': [{'item':'Troll Tooth','chance':0.5},{'item':'Health Potion','chance':0.5},{'item':'Warhammer','chance':0.3}],
      'knight': [],
    }

    this.monsters = {
      'goblin': function(name,lastAttack){
        this.name = name;
        this.type = 'goblin';
        this.maxHp = 4;
        this.hp = 4;
        this.attacking = false;
        this.attitude = 'aggresive';
        this.attackTime = 300;
        this.lastAttack = lastAttack;
      },
      'troll': function(name,lastAttack){
        this.name = name;
        this.type = 'troll';
        this.maxHp = 15;
        this.hp = 15;
        this.attacking = false;
        this.attitude = 'neutral';
        this.attackTime = 550;
        this.lastAttack = lastAttack;
      },
      'knight': function(name,lastAttack){
        this.name = name;
        this.type = 'knight';
        this.maxHp = 10;
        this.hp = 10;
        this.attacking = false;
        this.attitude = 'friendly';
        this.attackTime = 300;
        this.lastAttack = lastAttack;
      },
    }
  })
