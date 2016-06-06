angular.module('textRPG').
  service('roomService', ['monstersService', function(monstersService){
    self = this;
    this.announceRoom = true;
    this.announceKill = false;
    this.itemsDropped = [];

    this.setAnnounce = function (bool){
      this.announceRoom = bool;
    }

    this.setKillAnnounce = function (bool){
      this.announceKill = bool;
    }

    this.getAnnounce = function(){
      return this.announceRoom;
    }

    this.getKillAnnounce = function(){
      return this.announceKill;
    }

    this.spawnMonsters = function(room){
      var currRoom = this.rooms[room];
      if(currRoom.encounters.length > 0){
        for (var i = 0; i < currRoom.encounters.length; i++) {
          var currEncounter = currRoom.encounters[i];
          if(Math.random() < currEncounter.chance){
            var monsterNum = Math.floor(Math.random() * (currEncounter.max - currEncounter.min) + currEncounter.min);
            for (var j = 0; j < monsterNum; j++) {
              this.rooms[room].monsters.push(new monstersService.monsters[currEncounter.type](currEncounter.type+j,75*j));
            }
          }
        }
      }
    }

    this.clearRoom = function(room,name){
      for (var i = 0; i < this.rooms[room].monsters.length; i++) {
        var currMonster = this.rooms[room].monsters[i];
        if(currMonster.name === name){
          this.rooms[room].monsters.splice(i,1);
          this.announceKill = true;
          this.itemsDropped = monstersService.generateLoot(currMonster.type);
          console.log(currMonster.type);
          console.log(this.itemsDropped);
        }
      }
    }

    this.removeItem = function(room,item){
      var currRoomItems = this.rooms[room].items;
      var itemIndex = currRoomItems.indexOf(item);
      currRoomItems.splice(itemIndex,1);
    }

    this.rooms = {
      'start': {
        'description': 'You are on the edge of the forest. The sun is shining and you can hear the leaves rustling in the wind. The birds are singing a wide path leads to the north.',
        'north': 'forestPath',
        'east': undefined,
        'south': undefined,
        'west': undefined,
        'encounters': [],
        'monsters': [],
        'items': [],
      },
      'forestPath': {
        'description': 'The forest is denser here. The rays of the sun fall through the treetops. For a second you see a fox watching you from the bushes on the east side. The path leads ahead to the north.',
        'north': 'forestPathCont',
        'east': 'foxDen',
        'south': 'start',
        'west': 'deepForest',
        'encounters': [],
        'monsters': [],
        'items': ['Magic Ring','Health Potion'],
      },
      'foxDen': {
        'description': 'You enter a small groove. You can see a family of foxes playing in the grass. The hide quickly under a giant tree, the second the notice you',
        'north': 'forestPathEnd',
        'east': undefined,
        'south': undefined,
        'west': 'forestPath',
        'encounters': [],
        'monsters': [],
        'items': [],
      },
      'deepForest': {
        'description': 'The forest becomes very dense here. It is hard to move around. Barely any light reaches this place. You there is clearing in the bushes to the north',
        'north': 'oldOak',
        'east': 'forestPath',
        'south': undefined,
        'west': undefined,
        'encounters': [],
        'monsters': [],
        'items': [],
      },
      'oldOak': {
        'description': 'You reach a big groove in the thick woods. There is an old tree in the middle. It emmits an erie energy. You feel like you are being watched',
        'north': undefined,
        'east': 'forestPathCont',
        'south': 'deepForest',
        'west': undefined,
        'encounters': [],
        'monsters': [],
        'items': [],
      },
      'forestPathCont': {
        'description': 'The forest path turns to the east, The forest around becomes more dense',
        'north': undefined,
        'east': 'forestPathEnd',
        'south': 'forestPath',
        'west': 'oldOak',
        'encounters': [],
        'monsters': [],
        'items': [],
      },
      'forestPathEnd': {
        'description': 'The path continues to the east, but it is very clear it has not been used for a while. It seems very few people travel here. You can hear frogs in the distance.',
        'north': undefined,
        'east': 'forestEndSign',
        'south': 'foxDen',
        'west': 'forestPathCont',
        'encounters': [],
        'monsters': [],
        'items': [],
      },
      'forestEndSign': {
        'description': 'You reach the end of the Path. There are few trees here, and the ones you see are leafless and sicklooking. The air is humid and the ground looks wet. A gray mist lingers around you. You can see an old wooden sign, it reads: "GREEN PUDDLES SWAMP. BEWARE OF THE TROLLS!"',
        'north': undefined,
        'east': 'swampStart',
        'south': undefined,
        'west': 'forestPathEnd',
        'encounters': [],
        'monsters': [],
        'items': [],
      },
      'swampStart': {
        'description': 'You enter the swamp. Every other step ends in a puddle of muddy water. The mousquitos attack fiercely. It looks like you can go further to the east on ground or try to carefuly move north through shallow water.',
        'north': 'genericSwamp2',
        'east': 'genericSwamp',
        'south': undefined,
        'west': 'forestEndSign',
        'encounters': [],
        'monsters': [],
        'items': [],
      },
      'genericSwamp': {
        'description': 'Putrid smell of the swamp fills your nostrils. You can hear frogs calling out in the distance. You catch a glimpse of a slender figure watching you from the bushes to the east. She disapears as soon as you notice her.',
        'north': 'swampCenter',
        'east': 'rusalkaLair',
        'south': undefined,
        'west': 'swampStart',
        'encounters': [{'type':'goblin','chance':0.7,'min':1,'max':3}],
        'monsters': [],
        'items': [],
      },
      'genericSwamp2': {
        'description': 'Your boots are soked wet. You can see frogs size of cats jumping around, but they keep a fair distance. There is a strange sound coming from the east. The way to the north looks safe.',
        'north': 'genericSwamp3',
        'east': 'swampCenter',
        'south': 'swampStart',
        'west': undefined,
        'encounters': [{'type':'goblin','chance':0.7,'min':1,'max':3}],
        'monsters': [],
        'items': [],
      },
      'genericSwamp3': {
        'description': 'Thick mist obscures your vision. You can see figures moving around in the fog, but when you get closer there is no one here.',
        'north': undefined,
        'east': 'swampEnd',
        'south': 'genericSwamp2',
        'west': undefined,
        'encounters': [{'type':'goblin','chance':0.7,'min':1,'max':3}],
        'monsters': [],
        'items': [],
      },
      'genericSwamp4': {
        'description': 'You reach the northeastern part of the swamp, the water here is cold and dark. You are knee deep in mud. It is very hard to go any further',
        'north': undefined,
        'east': undefined,
        'south': 'oldWell',
        'west': 'swampEnd',
        'encounters': [{'type':'goblin','chance':0.7,'min':1,'max':3}],
        'monsters': [],
        'items': [],
      },
      'swampCenter': {
        'description': 'A small hill rises in the middle of the swamp. You can see three large stones, black as the night, on the top of the mound. A strange buzz fills the air. You are not sure if it is the wind or if it is something else. From here you can see smoke far to the north.',
        'north': 'swampEnd',
        'east': 'oldWell',
        'south': 'genericSwamp',
        'west': 'genericSwamp2',
        'encounters': [],
        'monsters': [],
        'items': [],
      },
      'rusalkaLair': {
        'description': 'You see a young woman walking in the distance. Suddenly she slips and falls in to the lake. Quickly you bolt to help her, but cannot see her anywhere.',
        'north': 'oldWell',
        'east': undefined,
        'south': undefined,
        'west': 'genericSwamp',
        'encounters': [],
        'monsters': [],
        'items': [],
      },
      'oldWell': {
        'description': 'An old well is located in this part of the swamp. Eerie light emanates from the mosscovered stones. You look down the well, but see only darkness.',
        'north': 'genericSwamp4',
        'east': undefined,
        'south': 'rusalkaLair',
        'west': 'swampCenter',
        'encounters': [{'type':'goblin','chance':0.7,'min':1,'max':3}],
        'monsters': [],
        'items': [],
      },
      'swampEnd': {
        'description': 'the ground looks less wet here. The terrain becomes more rocky here. You notice a path leading north. There are sticks standing along it. When you come closer you notice there are human skulls hanging from the sticks.',
        'north': 'caveEntrance',
        'east': 'genericSwamp4',
        'south': 'swampCenter',
        'west': 'genericSwamp3',
        'encounters': [{'type':'goblin','chance':0.7,'min':1,'max':3}],
        'monsters': [],
        'items': [],
      },
      'caveEntrance': {
        'description': 'The road leads up. You climb the rocky path and reach a big cave. Bones and rusty equipment lies scatterd around here. Dark smoke is coming out of the entrance',
        'north': undefined,
        'east': undefined,
        'south': 'swampEnd',
        'west': undefined,
        'encounters': [{'type':'troll','chance':0.7,'min':1,'max':3}],
        'monsters': [],
        'items': [],
      },
    }
  }])

  /**/
