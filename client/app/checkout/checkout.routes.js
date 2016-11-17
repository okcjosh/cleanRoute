'use strict';

export default function($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/checkout', {
      template: '<checkout></checkout>'
    });
}
