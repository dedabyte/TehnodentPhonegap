(function(){

  'use strict';

  var componentName = 'tdCatalogItem';

  angular
    .module('app')
    .component(componentName, {
      restrict: 'EA',
      bindings: {
        item: '='
      },
      templateUrl: 'app/catalog/catalog-item/catalog-item-template.html',
      controller: function(URL){
        var self = this;

        function getThumb(){
          return URL + self.item.thumbs[0];
        }

        function formatPrice(priceName){
          if(isNaN(parseFloat(self.item[priceName]))){
            return 'Pozovite nas!';
          }
          return toNumberFormat(self.item[priceName]);
        }

        self.getThumb = getThumb;
        self.formatPrice = formatPrice;
      }
    });

})();
