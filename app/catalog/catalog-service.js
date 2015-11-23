(function(){

  'use strict';

  angular
    .module('app')
    .service('CatalogService', CatalogService);

  function CatalogService(Restangular){
    var self = this;
    self.catalog = [];

    function fetchCatalog(url){
      var promise = Restangular.one(buildUrl(url)).get();
      promise.then(function(response){
        var items;
        if(angular.isDefined(response.izdvajamoIzPonude)){
          items = response.izdvajamoIzPonude;
        }else{
          items = response.proizvodi;
        }
        self.catalog = items;
        console.log('catalog:', self.catalog.length);
      });
      return promise;
    }

    function buildUrl(url){
      if(!url){
        return 'home';
      }
      return 'katalog/' + url;
    }

    self.fetchCatalog = fetchCatalog;

  }

})();