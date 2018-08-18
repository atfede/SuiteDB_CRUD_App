angular.module('userListController', ['angularUtils.directives.dirPagination']) //angular.module('app', ...

    .controller('userListController',
        [
            '$scope',
            '$http',
            '$window',
            '$rootScope',
            'userService',
            '$location',
            function ($scope, $http, $window, $rootScope, userService, $location) {
                $scope.AddModal = false;
                $scope.EditModal = false;
                $scope.DeleteModal = false;

                $scope.errorFirstName = false;

                $scope.showAdd = function () {
                    $scope.firstName = null;
                    $scope.lastName = null;
                    $scope.address = null;
                    $scope.errorFirstName = false;
                    $scope.errorLastName = false;
                    $scope.errorAddress = false;
                    $scope.AddModal = true;
                }

                $scope.fetch = function () {
                    $scope.members = JSON.parse($window.localStorage.getItem("usersLS"));
                }

                $scope.sort = function (keyname) {
                    $scope.sortKey = keyname;
                    $scope.reverse = !$scope.reverse;
                }

                $scope.clearMessage = function () {
                    $scope.success = false;
                    $scope.error = false;
                }

                $scope.selectMember = function (member) {
                    $scope.clickMember = member;
                    $scope.clickMember.oldEmail = member.email;
                }

                $scope.showEdit = function () {
                    $scope.EditModal = true;
                }

                $scope.updateMember = function () {
                    var users = JSON.parse($window.localStorage.getItem("usersLS"));

                    var data = _.find(users, function (obj) {
                        if (obj.email === $scope.clickMember.oldEmail) {
                            obj.email = $scope.clickMember.email;
                            return true;
                        }
                        return false;
                    });

                    $window.localStorage.setItem('usersLS', JSON.stringify(users));

                    if (data == null) {
                        $scope.error = true;
                        $scope.errorMessage = "Error updating user";
                        $scope.fetch();
                    }
                    else {
                        $scope.success = true;
                        $scope.successMessage = "User updated";
                    }
                }

                $scope.showDelete = function () {
                    $scope.DeleteModal = true;
                }

                $scope.deleteMember = function () {
                    var users = JSON.parse($window.localStorage.getItem("usersLS"));

                    var usersLength = users.length;

                    var users = _.filter(users, function (obj) {
                        return obj.email !== $scope.clickMember.email;
                    });

                    var usersNewLength = users.length;
                    $window.localStorage.setItem('usersLS', JSON.stringify(users));

                    if (usersNewLength == usersLength) {
                        $scope.error = true;
                        $scope.errorMessage = "Error deleting user";
                        $scope.fetch();
                    }
                    else {
                        $scope.success = true;
                        $scope.successMessage = "User deleted";
                    }

                    setTimeout(function () {
                        $window.location.reload();
                    }, 3000)
                }

            }]);