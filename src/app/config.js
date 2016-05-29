angular.module('textRPG').
  config(['$routeProvider',
    function config($routeProvider) {
      $routeProvider.
        when('/player', {
          template: '<p>other div hello</p>'
        }).
        otherwise('/player');
    }
  ]);
