'use strict';

export default function($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/checkout/show', {
      template: '<show></show>'
    });
}
