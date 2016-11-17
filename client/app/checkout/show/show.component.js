'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './show.routes';

export class ShowComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('cleanRouteApp.show', [ngRoute])
  .config(routes)
  .component('show', {
    template: require('./show.html'),
    controller: ShowComponent,
    controllerAs: 'showCtrl'
  })
  .name;
