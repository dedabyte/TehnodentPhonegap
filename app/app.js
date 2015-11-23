(function(){

  'use strict';

  var app = angular.module('app', [
    'ngTouch',
    'ngAnimate',
    'ui.router',
    'restangular'
  ]);

  app.constant('URL', 'http://www.ec2.sakota.biz');

  app.config(function(RestangularProvider, $stateProvider, $urlRouterProvider, URL){
    RestangularProvider.setBaseUrl(URL);
    RestangularProvider.setDefaultRequestParams({
      format: 'json'
    });

    $urlRouterProvider.otherwise('/');

    $stateProvider.state('main', {
      abstract: true,
      views: {
        'sidenav@': {
          template: '<div td-sidenav class="td-sidenav"></div>'
        }
      },
      resolve: {
        tree: function(TreeService){
          return TreeService.fetchTree();
        }
      }
    });

    $stateProvider.state('main.catalog', {
      url: '/:url',
      views: {
        'content@': {
          template: '<div td-catalog class="td-catalog"></div>'
        }
      },
      resolve: {
        catalog: function(tree, $stateParams, CatalogService){
          return CatalogService.fetchCatalog($stateParams.url);
        }
      }
    });

  });

  app.run(function($rootScope){
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){
      console.log(error);
    });
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, error){

    });
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams, error){

    });
  });

  function toNumberFormat(n, decimals, decimal_sep, thousands_sep){
    var
      c = isNaN(decimals) ? 2 : Math.abs(decimals),
      d = decimal_sep || ',',
      t = (typeof thousands_sep === 'undefined') ? '.' : thousands_sep,
      sign = (n < 0) ? '-' : '',
      i = parseInt(n = Math.abs(n).toFixed(c)) + '',
      j = (i.length > 3) ? i.length % 3 : 0;
    return sign + (j ? i.substr(0, j) + t : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : '');
  }
  window.toNumberFormat = toNumberFormat;

  document.addEventListener('deviceready', function (){
    document.addEventListener('backbutton', function(e){
      e.preventDefault();
      navigator.app.exitApp();
    }, false);
  }, false);

})();