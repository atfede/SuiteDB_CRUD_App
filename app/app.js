'use strict';

// Declare app level module which depends on views, and components
angular.module('app', [
    'ui.router',
    'userController'
]).config(function ($stateProvider, $urlRouterProvider) {

//    $locationProvider.hashPrefix(''); // #!

        $stateProvider
            .state('index', {
                url: '/index',
                templateUrl: "./user-registration/user-registration.html",
                controller: 'appController',
                controllerAs: "appCtrl"
            })
            .state('userList', {
                url: '/userList',
                templateUrl: "./user-list/user-list.html",
                controller: 'userController',
                controllerAs: "userCtrl"
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