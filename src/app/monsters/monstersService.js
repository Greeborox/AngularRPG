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

    this.monsterLoot = {
      'goblin': [{'item':'goblin ear','chance':0.9},{'item':'rock','chance':0.5}],
      'rusalka': [{'item':'golden key','chance':1}],
      'troll': [{'item':'troll tooth','chance':0.5},{'item':'health potion','chance':0.5},{'item':'warhammer','chance':0.3}],
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
        this.lastAttack = lastAttack || 0;
      },
      'rusalka': function(name,lastAttack){
        this.name = name;
        this.type = 'rusalka';
        this.unique = true;
        this.maxHp = 8;
        this.hp = 8;
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
        this.attacking = false;
        this.attitude = 'friendly';
        this.attackTime = 300;
        this.lastAttack = lastAttack || 0;
      },
    }
  })
