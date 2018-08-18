/**
 * Created by eltes on 17-Aug-18.
 */
angular.module('userService', [])
    .factory('userService',
        [
            '$rootScope',
            function ($rootScope) {

                var service = {
                    users: [],

                    SaveState: function () {
                        sessionStorage.userService = angular.toJson(service.users);
                    },

                    RestoreState: function () {
                        service.users = angular.fromJson(sessionStorage.userService);
                    }
                }

                $rootScope.$on("savestate", service.SaveState);
                $rootScope.$on("restorestate", service.RestoreState);

                return service;
            }]);

/*app.factory('CustomerSearchService', ['$rootScope',
 function($rootScope) {
 ...
 function saveState() {
 sessionStorage.CustomerSearchService = angular.toJson(service.state);
 }
 $rootScope.$on("savestate", saveState);
 ...
 }
 ]);

 app.run(function($rootScope) {
 window.onbeforeunload = function(event) {
 $rootScope.$broadcast('savestate');
 };
 });*/
