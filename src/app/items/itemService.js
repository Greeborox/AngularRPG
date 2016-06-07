angular.module('textRPG').
  service('itemsService', function(){
    this.items = {
      'sword': {
        'type': 'equipment',
        'spot': 'weapon',
      },
      'warhammer': {
        'type': 'equipment',
        'spot': 'weapon',
      },
      'leather armour' : {
        'type': 'equipment',
        'spot': 'armor',
      },
      'magic ring' : {
        'type': 'equipment',
        'spot': 'ring',
      }
    }
  })
