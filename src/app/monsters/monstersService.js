angular.module('textRPG').
  service('monstersService', function(){

    this.uniqesKilled = {};

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

    this.generateGold = function(monster){
      var gold = 0;
      var currGold = this.monsterGold[monster];
      if(Math.random() < currGold.chance){
        var gold = Math.floor(Math.random() * (currGold.max - currGold.min) + currGold.min);
      }
      return gold;
    }

    this.monsterLoot = {
      'goblin': [{'item':'goblin ear','chance':0.9},{'item':'rock','chance':0.5}],
      'rusalka': [{'item':'golden key','chance':1}],
      'troll': [{'item':'troll tooth','chance':0.5},{'item':'health potion','chance':0.5},{'item':'warhammer','chance':0.3}],
      'knight': [],
    }

    this.monsterGold = {
      'goblin': {'chance':0.4,'min': 3, 'max': 10},
      'rusalka': {'chance':1,'min': 15, 'max': 40},
      'troll': {'chance':0.3,'min': 1, 'max': 20},
      'knight': {'chance':0.3,'min': 1, 'max': 20},
    }

    this.monsters = {
      'goblin': function(name,lastAttack){
        this.name = name;
        this.type = 'goblin';
        this.maxHp = 4;
        this.hp = 4;
        this.maxDmg = 5;
        this.minDmg = 2;
        this.attacking = false;
        this.attitude = 'aggresive';
        this.attackTime = 300;
        this.lastAttack = lastAttack || 0;
      },
      'rusalka': function(name,lastAttack){
        this.name = name;
        this.type = 'rusalka';
        this.unique = true;
        this.maxHp = 8;
        this.hp = 8;
        this.maxDmg = 8;
        this.minDmg = 2;
        this.attacking = false;
        this.attitude = 'aggresive';
        this.attackTime = 150;
        this.lastAttack = lastAttack || 0;
      },
      'troll': function(name,lastAttack){
        this.name = name;
        this.type = 'troll';
        this.maxHp = 15;
        this.hp = 15;
        this.maxDmg = 10;
        this.minDmg = 5;
        this.attacking = false;
        this.attitude = 'neutral';
        this.attackTime = 550;
        this.lastAttack = lastAttack || 0;
      },
      'knight': function(name,lastAttack){
        this.name = name;
        this.type = 'knight';
        this.maxHp = 10;
        this.hp = 10;
        this.maxDmg = 8;
        this.minDmg = 5;
        this.attacking = false;
        this.attitude = 'friendly';
        this.attackTime = 300;
        this.lastAttack = lastAttack || 0;
      },
    }
  })
