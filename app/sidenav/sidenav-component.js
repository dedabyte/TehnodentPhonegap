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
        self.level = 0;

        function closeNav(){
          self.active.show = false;
        }

        self.closeNav = closeNav;




        /* BLA */

        setTimeout(function(){

          var $s, url, $sToggle;

          function init() {
            $s = $('#stablo');
            if(!$s.length){
              return;
            }

            $s.on('click', 'li', function (e) {
              e.stopPropagation();
              var $li = $(this);
              $li.toggleClass('otvoreno');
              $li.children('ul').slideToggle();
            });

            $s.on('click', 'a', function () {
              closeNav();
            });

          }

          init();

        }, 0);

      }
    });

})();
