angular.module('textRPG').
  config(['$routeProvider',
    function config($routeProvider) {
      $routeProvider.
        when('/player', {
          templateUrl: 'src/app/stats/stats.html',
          controller: 'statsController',
          controllerAs: 'ctrl',
        }).
        when('/inventory', {
          templateUrl: 'src/app/inventory/inventory.html',
          controller: 'inventoryCtrl',
          controllerAs: 'ctrl',
        }).
        when('/equipment', {
          templateUrl: 'src/app/equipment/equipment.html',
          controller: 'equipmentCtrl',
          controllerAs: 'ctrl',
        }).
        otherwise('/player');
    }
  ]);
