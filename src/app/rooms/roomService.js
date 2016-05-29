angular.module('textRPG').
  service('roomService', function(){
    self = this;
    this.announceRoom = true;
    this.setAnnounce = function (bool){
      this.announceRoom = bool;
    }
    this.getAnnounce = function(){
      return this.announceRoom;
    }
    this.rooms = {
      'forest': {
        'description': 'You are in a forest',
        'north': 'swamp',
        'east': 'cave',
        'south': undefined,
        'west': undefined
      },
      'cave': {
        'description': 'You are in a cave',
        'north': 'castle',
        'east': undefined,
        'south': undefined,
        'west': 'forest'
      },
      'swamp': {
        'description': 'You are on a swamp',
        'north': undefined,
        'east': 'castle',
        'south': 'forest',
        'west': undefined
      },
      'castle': {
        'description': 'You are in a castle. It is a silly place.',
        'north': undefined,
        'east': undefined,
        'south': 'cave',
        'west': 'swamp'
      }
    }
  })
