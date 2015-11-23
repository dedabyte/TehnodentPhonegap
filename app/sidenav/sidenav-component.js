(function(){

  'use strict';

  var componentName = 'tdSidenav';

  angular
    .module('app')
    .component(componentName, {
      restrict: 'EA',
      templateUrl: 'app/sidenav/sidenav-component-template.html',
      controller: function(TreeService){
        var self = this;
        self.active = TreeService.active;
        self.tree = TreeService.getTree();

        function closeNav(){
          self.active.show = false;
        }

        self.closeNav = closeNav;

      }
    });

})();
