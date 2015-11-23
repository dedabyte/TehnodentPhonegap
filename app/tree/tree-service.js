(function(){

  'use strict';

  angular
    .module('app')
    .service('TreeService', TreeService);

  function TreeService(Restangular){
    var self = this;
    var tree = [];

    function fetchTree(){
      var promise = Restangular.one('katalog/home').get();
      promise.then(function(response){
        tree = response.stablo;
      }, function(error){
        $('.content').html(error.toString());
      });
      return promise;
    }

    function getTree(){
      return tree;
    }

    self.fetchTree = fetchTree;
    self.getTree = getTree;

  }

})();