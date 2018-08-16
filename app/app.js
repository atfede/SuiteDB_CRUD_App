'use strict';

// Declare app level module which depends on views, and components
angular.module('app', [
    'ui.router',
    'userRegistrationController',
    'userListController',
    'ngCookies'
]).config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('index', {
                url: '/index',
                templateUrl: "./user-registration/user-registration.html",
                controller: 'userRegistrationController',
                controllerAs: "userRegistrationCtrl"
            })
            .state('userList', {
                url: '/userList',
                templateUrl: "./user-list/user-list.html",
                controller: 'userListController',
                controllerAs: "userListCtrl"
            });

        // catch all bad routes
        // send users to the form page
        $urlRouterProvider.otherwise('/index');
    }
)

    .controller("appController",
        [
            '$scope',
            '$rootScope',
            function appController($scope, $rootScope) {
                var self = $scope;
            }
        ]);