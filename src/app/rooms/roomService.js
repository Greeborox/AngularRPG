angular.module('textRPG').
  service('roomService', ['monstersService', function(monstersService){
    self = this;
    this.announceRoom = true;

    this.setAnnounce = function (bool){
      this.announceRoom = bool;
    }

    this.getAnnounce = function(){
      return this.announceRoom;
    }

    this.spawnMonsters = function(room){
      var currRoom = this.rooms[room];
      if(currRoom.encounters.length > 0){
        for (var i = 0; i < currRoom.encounters.length; i++) {
          var currEncounter = currRoom.encounters[i];
          if(Math.random() < currEncounter.chance){
            console.log('spawning')
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
        currMonster = this.rooms[room].monsters[i];
        if(currMonster.name === name){
          this.rooms[room].monsters.splice(i,1);
        }
      }
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
      },
      'forestPath': {
        'description': 'The forest is denser here. The rays of the sun fall through the treetops. For a second you see a fox watching you from the bushes on the east side. The path leads ahead to the north.',
        'north': 'forestPathCont',
        'east': 'foxDen',
        'south': 'start',
        'west': 'deepForest',
        'encounters': [],
        'monsters': [],
      },
      'foxDen': {
        'description': 'You enter a small groove. You can see a family of foxes playing in the grass. The hide quickly under a giant tree, the second the notice you',
        'north': 'forestPathEnd',
        'east': undefined,
        'south': undefined,
        'west': 'forestPath',
        'encounters': [],
        'monsters': [],
      },
      'deepForest': {
        'description': 'The forest becomes very dense here. It is hard to move around. Barely any light reaches this place. You there is clearing in the bushes to the north',
        'north': 'oldOak',
        'east': 'forestPath',
        'south': undefined,
        'west': undefined,
        'encounters': [],
        'monsters': [],
      },
      'oldOak': {
        'description': 'You reach a big groove in the thick woods. There is an old tree in the middle. It emmits an erie energy. You feel like you are being watched',
        'north': undefined,
        'east': 'forestPathCont',
        'south': 'deepForest',
        'west': undefined,
        'encounters': [],
        'monsters': [],
      },
      'forestPathCont': {
        'description': 'The forest path turns to the east, The forest around becomes more dense',
        'north': undefined,
        'east': 'forestPathEnd',
        'south': 'forestPath',
        'west': 'oldOak',
        'encounters': [],
        'monsters': [],
      },
      'forestPathEnd': {
        'description': 'The path continues to the east, but it is very clear it has not been used for a while. It seems very few people travel here. You can hear frogs in the distance.',
        'north': undefined,
        'east': undefined,
        'south': 'foxDen',
        'west': 'forestPathCont',
        'encounters': [],
        'monsters': [],
      },
    }
  }])
