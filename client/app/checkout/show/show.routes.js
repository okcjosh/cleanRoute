'use strict';

export default function($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/checkout/new', {
      template: '<show></show>'
    });
}
