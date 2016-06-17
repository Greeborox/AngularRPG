angular.module('textRPG').
  service('roomService', ['monstersService', function(monstersService){
    self = this;
    this.announceRoom = true;
    this.announceKill = false;
    this.itemsDropped = [];
    this.goldDropped = 0;

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

    this.makeMonstersAggresive = function(room){
      for (var i = 0; i < this.rooms[room].monsters.length; i++) {
        var currMonster = this.rooms[room].monsters[i];
        if(currMonster.attitude != 'aggresive'){
          currMonster.attitude ='aggresive';
        }
      }
    }

    this.spawnMonsters = function(room){
      var currRoom = this.rooms[room];
      if(currRoom.encounters.length > 0){
        for (var i = 0; i < currRoom.encounters.length; i++) {
          var currEncounter = currRoom.encounters[i];
          if(!currEncounter.unique || (currEncounter.unique && !monstersService.uniqesKilled[currEncounter.type])){
            console.log(currEncounter.unique);
            if(Math.random() < currEncounter.chance){
              var monsterNum = Math.floor(Math.random() * (currEncounter.max - currEncounter.min) + currEncounter.min);
              for (var j = 0; j < monsterNum; j++) {
                this.rooms[room].monsters.push(new monstersService.monsters[currEncounter.type](currEncounter.type+j,75*j));
              }
            }
          }
        }
      }
    }

    this.clearRoom = function(room){
      for (var i = 0; i < this.rooms[room].monsters.length; i++) {
        var currMonster = this.rooms[room].monsters[i];
        if(currMonster.hp === 0){
          this.rooms[room].monsters.splice(i,1);
          this.announceKill = true;
          this.itemsDropped = monstersService.generateLoot(currMonster.type);
          this.goldDropped = monstersService.generateGold(currMonster.type)
          if(currMonster.unique){
            var monsterType = currMonster.type;
            monstersService.uniqesKilled[monsterType] = true;
            console.log(monstersService.uniqesKilled);
          }
        }
      }
    }

    this.hurtMonster = function(dmg,room,name){
      for (var i = 0; i < this.rooms[room].monsters.length; i++) {
        var currMonster = this.rooms[room].monsters[i];
        if(currMonster.name === name){
          currMonster.hp -= dmg;
          if(currMonster.hp < 0){
            currMonster.hp = 0;
          }
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
        'items': ['health potion'],
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
        'description': 'You reach a big groove in the thick woods. There is an old oak in the middle. It emmits an erie energy. You feel like you are being watched. You notice a a small fountain under the tree. You take a sip of the water. It is very refreshing. You can feel your life forces come back to you.',
        'north': undefined,
        'east': 'forestPathCont',
        'south': 'deepForest',
        'west': undefined,
        'encounters': [],
        'monsters': [],
        'items': [],
        'isFountain': true,
      },
      'forestPathCont': {
        'description': 'The forest path turns to the east, The forest around becomes more dense. There is a merchant\'s caravan here. He invites you to check his wares.',
        'north': undefined,
        'east': 'forestPathEnd',
        'south': 'forestPath',
        'west': 'oldOak',
        'encounters': [],
        'monsters': [],
        'items': [],
        'isShop': true,
        'forSale': ['sword','health potion']
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
        'encounters': [{'type':'rusalka','chance':1,'min':1,'max':1,'unique':true}],
        'monsters': [],
        'items': [],
      },
      'oldWell': {
        'description': 'An old well is located in this part of the swamp. Eerie light emanates from the mosscovered stones. You look down the well, but see only darkness. You can see a railing in the distance to the east.',
        'north': 'genericSwamp4',
        'east': 'cemetaryGate',
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
        'description': 'The road leads up. You climb the rocky path and reach a big cave. Bones and rusty equipment lies scatterd around here. Dark smoke is coming out of the entrance. A heavy iron gate bars the entrance. The gate is locked with a golden padlock.',
        'north': undefined,
        'east': undefined,
        'south': 'swampEnd',
        'west': undefined,
        'encounters': [{'type':'troll','chance':0.7,'min':1,'max':3}],
        'monsters': [],
        'items': [],
      },
      'trollCave': {
        'description': 'You enter a huge cave. There is a big fire in the middle. The whole place smells of troll. Disgusting.',
        'north': undefined,
        'east': undefined,
        'south': 'caveEntrance',
        'west': undefined,
        'encounters': [{'type':'troll','chance':0.7,'min':2,'max':5}],
        'monsters': [],
        'items': [],
      },
      'cemetaryGate': {
        'description': 'You reach a fence standing across the swamp, There is a gate nearby, A path starts at the gate and leads further east. You see torches burning along the path. Who tends to the fire, you wonder.',
        'north': undefined,
        'east': 'genericCemetary1',
        'south': undefined,
        'west': 'oldWell',
        'encounters': [],
        'monsters': [],
        'items': [],
      },
      'genericCemetary1': {
        'description': 'You reach the end of the path. You are on and old, abandoned cemetary. Ruined graves and mausoleoums surround you. You can see a large strucuture looming in the south-east.',
        'north': undefined,
        'east': 'genericCemetary2',
        'south': 'genericCemetary3',
        'west': 'cemetaryGate',
        'encounters': [{'type':'skeleton','chance':0.5,'min':1,'max':1},{'type':'zombie','chance':0.3,'min':1,'max':1}],
        'monsters': [],
        'items': [],
      },
      'genericCemetary2': {
        'description': 'The cemetary looks dark and menacing. Rubble from falen monuments scatter the ground. When you look to the south, you notice a strange figure in the sky.',
        'north': undefined,
        'east': undefined,
        'south': 'gargoyleLair',
        'west': 'genericCemetary1',
        'encounters': [{'type':'skeleton','chance':0.5,'min':1,'max':1},{'type':'zombie','chance':0.3,'min':1,'max':1}],
        'monsters': [],
        'items': [],
      },
      'genericCemetary3': {
        'description': 'As you go deeper into the abondened cemetary, the feeling of dread starts overwhelming you. Strange sounds come from the darkness, almost like someone was whispering your name.',
        'north': 'genericCemetary1',
        'east': 'gargoyleLair',
        'south': 'courtyardOfBones',
        'west': undefined,
        'encounters': [{'type':'skeleton','chance':0.5,'min':1,'max':1},{'type':'zombie','chance':0.3,'min':1,'max':1}],
        'monsters': [],
        'items': [],
      },
      'gargoyleLair': {
        'description': 'A tall monument stands in this part of the cemetary. You can see gargoyles sitting at its top. They look very lifelike',
        'north': 'genericCemetary2',
        'east': undefined,
        'south': 'genericCemetary4',
        'west': 'genericCemetary3',
        'encounters': [{'type':'gargoyle','chance':1,'min':1,'max':1,'unique':true}],
        'monsters': [],
        'items': [],
      },
      'courtyardOfBones': {
        'description': 'You enter a small courtyard. It seems the darkness here is even more dense then in the res of the cemetary. As your eyes get used to it, you see that the ground here is covered with human bones.',
        'north': 'genericCemetary3',
        'east': 'genericCemetary4',
        'south': undefined,
        'west': undefined,
        'encounters': [{'type':'skeleton','chance':0.7,'min':3,'max':5}],
        'monsters': [],
        'items': [],
      },
      'genericCemetary4': {
        'description': 'You reach the base of the looming structure. It seems it is a monolithic mausoleum. Huge iron door block your way inside.',
        'north': 'gargoyleLair',
        'east': undefined,
        'south': undefined,
        'west': 'courtyardOfBones',
        'encounters': [{'type':'skeleton','chance':0.5,'min':1,'max':1},{'type':'zombie','chance':0.3,'min':1,'max':1}],
        'monsters': [],
        'items': [],
      },
      'cryptEntrance': {
        'description': 'You enter the mausoleum. There is a long flight of stairs just behinf the entry. It takes you deep underground. The smell of meldow and decay is overwhelming. Torches lit the stone halls. A corridor leads east.',
        'north': undefined,
        'east': 'cryptCorridor1',
        'south': undefined,
        'west': 'genericCemetary4',
        'encounters': [],
        'monsters': [],
        'items': [],
      },
      'cryptCorridor1': {
        'description': 'You carefuly follow the corridor. Green moss cover the age old stones. There is a passage to the north from here, or you can keep following the corridor east. Strange gurgling sounds come from the north',
        'north': 'bloodRoom',
        'east': 'cryptCorridor2',
        'south': undefined,
        'west': 'cryptEntrance',
        'encounters': [{'type':'skeleton','chance':0.5,'min':1,'max':1},{'type':'ghoul','chance':0.3,'min':1,'max':1}],
        'monsters': [],
        'items': [],
      },
      'bloodRoom': {
        'description': 'You enter a small room. It is empty except for a giant wooden tub in the middle. It is filled with blood! You swear you saw something emerging from the blood but when you came nearer it hid under the surface.',
        'north': undefined,
        'east': undefined,
        'south': 'cryptCorridor1',
        'west': undefined,
        'encounters': [{'type':'ghoul','chance':0.8,'min':2,'max':4}],
        'monsters': [],
        'items': [],
      },
      'cryptCorridor2': {
        'description': 'The corridor turns north here. Old emblems and tapestried decorate the wall here. A noble family must be buried in this tomb. But where are the graves?',
        'north': 'giantStairs',
        'east': undefined,
        'south': undefined,
        'west': 'cryptCorridor1',
        'encounters': [{'type':'skeleton','chance':0.5,'min':1,'max':1},{'type':'ghoul','chance':0.3,'min':1,'max':1}],
        'monsters': [],
        'items': [],
      },
      'giantStairs': {
        'description': 'Another flight of stairs opens before you. This time the walk is much longer. You must be very deep. At the bottom of the stairs there is a corridor leading east. You can hear fire roaring from that direction.',
        'north': undefined,
        'east': 'vampireLordsLair',
        'south': 'cryptCorridor1',
        'west': undefined,
        'encounters': [{'type':'skeleton','chance':0.5,'min':1,'max':1},{'type':'ghoul','chance':0.3,'min':1,'max':1}],
        'monsters': [],
        'items': [],
      },
      'vampireLordsLair': {
        'description': 'You enter a brightly lit room. It is decorated with splendor and luxury. A huge fireplace is located at the eastern wall. A magical, smokeless fire roars in it. A coffin stands in the middle of the room. It is open.',
        'north': undefined,
        'east': undefined,
        'south': undefined,
        'west': 'giantStairs',
        'encounters': [{'type':'Vampire Lord','chance':1,'min':1,'max':1,'unique':true}],
        'monsters': [],
        'items': [],
      },
    }
  }])
