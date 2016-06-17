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
      'goblin': [{'item':'goblin ear','chance':0.9},{'item':'rock','chance':0.5},{'item':'scale armour','chance':0.1},{'item':'goblin spear','chance':0.05}],
      'rusalka': [{'item':'golden key','chance':1}],
      'troll': [{'item':'troll tooth','chance':0.5},{'item':'health potion','chance':0.5},{'item':'warhammer','chance':0.3}],
      'knight': [],
      'skeleton': [{'item':'broad sword','chance':0.08}, {'item':'iron mail armour','chance':0.05}],
      'zombie': [{'item':'ruby','chance':0.1},{'item':'piece of rotten flesh','chance':0.3}],
      'gargoyle': [{'item':'mausoleum key','chance':1}],
      'ghoul': [{'item':'broad sword','chance':0.2}, {'item':'vampire plate armour','chance':0.01}],
      'Vampire Lord': [{'item':'vampire sword','chance':0.2}, {'item':'flaming heart','chance':1}],
    }

    this.monsterGold = {
      'goblin': {'chance':0.4,'min': 3, 'max': 10},
      'rusalka': {'chance':1,'min': 15, 'max': 40},
      'troll': {'chance':0.3,'min': 1, 'max': 20},
      'knight': {'chance':0.3,'min': 1, 'max': 20},
      'skeleton': {'chance':0.3,'min': 1, 'max': 30},
      'zombie': {'chance':0.3,'min': 1, 'max': 25},
      'gargoyle': {'chance':0.7,'min': 30, 'max': 100},
      'ghoul': {'chance':0.3,'min': 10, 'max': 65},
      'Vampire Lord': {'chance':0.9,'min': 300, 'max': 1000},
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
        this.expValue = 15;
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
        this.expValue = 75;
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
        this.expValue = 115;
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
        this.expValue = 85;
      },
      'skeleton': function(name,lastAttack){
        this.name = name;
        this.type = 'skeleton';
        this.maxHp = 8;
        this.hp = 8;
        this.maxDmg = 5;
        this.minDmg = 1;
        this.attacking = false;
        this.attitude = 'aggresive';
        this.attackTime = 150;
        this.lastAttack = lastAttack || 0;
        this.expValue = 30;
      },
      'zombie': function(name,lastAttack){
        this.name = name;
        this.type = 'zombie';
        this.maxHp = 15;
        this.hp = 15;
        this.maxDmg = 10;
        this.minDmg = 2;
        this.attacking = false;
        this.attitude = 'aggresive';
        this.attackTime = 300;
        this.lastAttack = lastAttack || 0;
        this.expValue = 25;
      },
      'gargoyle': function(name,lastAttack){
        this.name = name;
        this.type = 'gargoyle';
        this.unique = true;
        this.maxHp = 20;
        this.hp = 20;
        this.maxDmg = 8;
        this.minDmg = 2;
        this.attacking = false;
        this.attitude = 'aggresive';
        this.attackTime = 200;
        this.lastAttack = lastAttack || 0;
        this.expValue = 75;
      },
      'Vampire Lord': function(name,lastAttack){
        this.name = name;
        this.type = 'Vampire Lord';
        this.unique = true;
        this.maxHp = 50;
        this.hp = 50;
        this.maxDmg = 12;
        this.minDmg = 5;
        this.attacking = false;
        this.attitude = 'aggresive';
        this.attackTime = 200;
        this.lastAttack = lastAttack || 0;
        this.expValue = 75;
      },
      'ghoul': function(name,lastAttack){
        this.name = name;
        this.type = 'ghoul';
        this.maxHp = 20;
        this.hp = 20;
        this.maxDmg = 8;
        this.minDmg = 2;
        this.attacking = false;
        this.attitude = 'aggresive';
        this.attackTime = 200;
        this.lastAttack = lastAttack || 0;
        this.expValue = 75;
      },
    }
  })
