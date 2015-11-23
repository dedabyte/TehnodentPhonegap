(function(){

  'use strict';

  var componentName = 'tdHeader';

  angular
    .module('app')
    .component(componentName, {
      restrict: 'EA',
      templateUrl: 'app/header/header-component-template.html',
      controller: function(TreeService){
        var self = this;

        self.openSidenav = function(){
          TreeService.active.show = true;
          TreeService.active.loaded = true;
        }

      }
    });

})();
