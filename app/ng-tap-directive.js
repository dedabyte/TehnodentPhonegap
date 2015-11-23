(function(){

  angular
    .module('app')
    .directive('ngTap', function ngTap(){
    return function (scope, element, attrs) {
      var cancelEvent = false;
      var className = 'tap-active';

      element.on('touchstart', function (e) {
        if(!$(e.target).attr('ng-tap')){
          cancelEvent = true;
          return;
        }
        element.addClass(className);
        cancelEvent = false;
      });

      element.on('touchmove', function(){
        cancelEvent = true;
        element.removeClass(className);
      });

      element.on('touchend', function () {
        if(cancelEvent)
          return;
        element.removeClass(className);
        scope.$apply(attrs['ngTap'], element);
      });
    };
  });

})();