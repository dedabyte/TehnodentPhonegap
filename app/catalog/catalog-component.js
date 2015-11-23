(function(){

  'use strict';

  var componentName = 'tdCatalog';

  angular
    .module('app')
    .component(componentName, {
      restrict: 'EA',
      templateUrl: 'app/catalog/catalog-template.html',
      controller: function($scope, CatalogService, $element){
        var self = this;

        var page = 1;
        var pool = 20;
        var loadInProgress = false;

        self.items = getItems();

        function getItems(){
          return CatalogService.catalog.slice(0, page * pool);
        }



        var itemsWrap = $element.find('.td-catalog-items-wrap');

        var elementHeight = 0;
        var itemsWrapHeight = 0;

        $element.on('scroll', function(){
          if(loadInProgress){
            return;
          }

          elementHeight = $element.height();
          itemsWrapHeight = itemsWrap.height();

          if($element.scrollTop() + elementHeight + 600 >= itemsWrapHeight){
            loadInProgress = true;
            $scope.$evalAsync(function(){
              page++;
              self.items = getItems();
              if(self.items.length !== CatalogService.catalog.length){
                loadInProgress = false;
              }
              console.log('loaded!');
            });
          }
        });
      }
    });

})();
