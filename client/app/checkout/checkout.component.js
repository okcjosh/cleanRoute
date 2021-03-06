'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');
import routes from './checkout.routes';
export function CheckoutComponent($http) {
  $http.post('/api/client_token/new')
    .then(response => {
      this.clientToken = response.data;
      console.log(this.clientToken);
      braintree.setup(this.clientToken,
        'dropin', {
          container: 'dropin'
        })
    });
}
export default angular.module('cleanRouteApp.checkout', [ngRoute])
  .config(routes)
  .component('checkout', {
    template: require('./checkout.html'),
    controller: CheckoutComponent,
    controllerAs: 'checkoutCtrl'
  })
  .name;
