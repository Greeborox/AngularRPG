angular.module('textRPG').
  service('itemsService', ['roomService','mainService', function(roomService,mainService){
    this.items = {
      'sword': {
        'type': 'equipment',
        'spot': 'weapon',
        'usableAt': undefined,
        'oneTime': false,
        'useText': undefined,
        'badUseText': undefined,
        'useFunc': undefined,
        'baduseFunc': undefined,
      },
      'warhammer': {
        'type': 'equipment',
        'spot': 'weapon',
        'usableAt': undefined,
        'oneTime': false,
        'useText': undefined,
        'badUseText': undefined,
        'useFunc': undefined,
        'baduseFunc': undefined,
      },
      'leather armour' : {
        'type': 'equipment',
        'spot': 'armor',
        'usableAt': undefined,
        'oneTime': false,
        'useText': undefined,
        'badUseText': undefined,
        'useFunc': undefined,
        'baduseFunc': undefined,
      },
      'magic ring' : {
        'type': 'equipment',
        'spot': 'ring',
        'usableAt': undefined,
        'oneTime': false,
        'useText': undefined,
        'badUseText': undefined,
        'useFunc': undefined,
        'baduseFunc': undefined,
      },
      'health potion' : {
        'type': 'special',
        'spot': undefined,
        'usableAt': 'all',
        'oneTime': true,
        'useText': 'You drink the potion.',
        'badUseText': undefined,
        'useFunc': function(){
          mainService.addEntry(this.useText);
        },
        'badUseFunc': undefined,
      },
      'goblin ear' : {
        'type': 'special',
        'spot': undefined,
        'usableAt': 'oldWell',
        'oneTime': true,
        'useText': 'You drop the ear down the well.',
        'badUseText': 'There is nothing you can do with the goblin ear.',
        'useFunc': function(){
          mainService.addEntry(this.useText);
        },
        'badUseFunc': function(){
          mainService.addEntry(this.badUseText);
        },
      },
      'rock' : {
        'type': 'special',
        'spot': undefined,
        'usableAt': 'all',
        'oneTime': false,
        'useText': 'It is just a small useless rock. What did you expect?',
        'badUseText': undefined,
        'useFunc': function(){
          mainService.addEntry(this.useText);
        },
        'badUseFunc': undefined,
      },
      'troll tooth' : {
        'type': 'special',
        'spot': undefined,
        'usableAt': 'all',
        'oneTime': false,
        'useText': 'Troll teeth are worth a lot of gold.',
        'badUseText': undefined,
        'useFunc': function(){
          mainService.addEntry(this.useText);
        },
        'badUseFunc': undefined,
      },
      'golden key' : {
        'type': 'special',
        'spot': undefined,
        'usableAt': 'caveEntrance',
        'oneTime': true,
        'useText': 'You use the key to open the gate.',
        'badUseText': 'A key of pure gold. You wonder what lock does it open',
        'useFunc': function(){
          mainService.addEntry(this.useText);
          roomService.rooms.caveEntrance.north = 'trollCave';
          roomService.rooms.caveEntrance.description = 'The road leads up. You climb the rocky path and reach a big cave. Bones and rusty equipment lies scatterd around here. Dark smoke is coming out of the entrance.';
        },
        'badUseFunc': function(){
          mainService.addEntry(this.badUseText);
        },
      },
    }
  }])
