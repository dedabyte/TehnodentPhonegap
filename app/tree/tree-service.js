(function(){

  'use strict';

  angular
    .module('app')
    .service('TreeService', TreeService);

  function TreeService(Restangular){
    var self = this;
    var tree = [];
    var active = { show: false, loaded: false };

    function fetchTree(){
      var promise = Restangular.one('katalog/home').get();
      promise.then(function(response){
        tree = response.stablo;
        addLevelsToTree(tree)
      }, function(error){
        $('.content').html(JSON.stringify(error, null, 4));
      });
      return promise;
    }

    function getTree(){
      return tree;
    }

    function addLevelsToTree(arr){
      var level = 0;

      var addLevel = function(arr){
        arr.forEach(function(a){
          a._level = level;
          if(a.podstablo.length){
            level++;
            addLevel(a.podstablo);
            level--;
          }
        });
      };

      addLevel(arr);

    }

    self.fetchTree = fetchTree;
    self.getTree = getTree;
    self.active = active;

  }

})();