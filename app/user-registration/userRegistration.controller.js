angular.module('userRegistrationController',
    [
        'angularUtils.directives.dirPagination'
    ]
)
    .controller('userRegistrationController',
        [
            '$rootScope',
            '$scope',
            '$http',
            '$window',
            '$location',
            function ($rootScope, $scope, $http, $window, $location) {

                var self = $scope;

                self.uri = "";
                self.users = [];
                self.user = {
                    id: null,
                    firstName: '',
                    lastName: "",
                    email: "",
                    phone: "",
                    address: '',
                    dateOfBirth: '',
                    comments: '',
                    gender: ''
                };

                self.AddModal = false;
                self.EditModal = false;
                self.DeleteModal = false;

                self.errorFirstname = false;

                self.showAdd = function () {
                    self.firstname = null;
                    self.lastname = null;
                    self.address = null;
                    self.errorFirstname = false;
                    self.errorLastname = false;
                    self.errorAddress = false;
                    self.AddModal = true;
                }

                self.init = function () {
                    if (self.uri == "") {
                        $http({
                            method: 'POST',
                            url: 'https://api.myjson.com/bins',
                            data: "[]",
                            headers: {'Content-Type': "application/json; charset=utf-8"}
                        }).then(function (response) {
                                self.uri = response.data.uri;
                            },
                            function (data) {
                                alert("Error!");
                            });
                    }
                }

                self.addUser = function () {

                    var user = _.find(self.users, function (obj) {
                        return (obj.lastName === self.user.lastName);
                    });

                    if (user == null) {
                        var user = {
                            id: self.getLastUserId(self.users),
                            firstName: self.user.firstName,
                            lastName: self.user.lastName,
                            email: self.user.email,
                            phone: self.user.phone,
                            address: self.user.address,
                            dateOfBirth: self.user.dateOfBirth,
                            comments: self.user.comments,
                            gender: self.user.gender
                        };

                        self.users.push(user);
                        $rootScope.users = [];

                        var updatedUsersJSON = JSON.stringify(self.users);

                        self.updateUser(updatedUsersJSON);

                    }
                    else {
                        alert('Error: user already exists!');
                    }
                }

                self.getLastUserId = function (users) {
                    if (users != undefined) {
                        return users.length + 1;
                    }
                    else {
                        return 1;
                    }
                }

                self.updateUser = function (updatedUsers) {
                    $.ajax({
                        url: self.uri,
                        type: "PUT",
                        data: updatedUsers,
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (data, textStatus, jqXHR) {
                            var result = JSON.stringify(data);

                            $rootScope.users.push(data);

                            //$location.path("/userList");
                        }
                    });
                }

                /*$scope.updateUser = function (updatedUsers) {
                 $.ajax({
                 url: "https://api.myjson.com/bins",
                 type: "POST",
                 data: updatedUsers,
                 contentType: "application/json; charset=utf-8",
                 dataType: "json",
                 success: function (data, textStatus, jqXHR) {

                 var updatedData = JSON.stringify(updatedUsers);

                 // do update
                 $.ajax({
                 url: data.uri,
                 type: "PUT",
                 data: updatedData,
                 contentType: "application/json; charset=utf-8",
                 dataType: "json",
                 success: function (data, textStatus, jqXHR) {
                 var json = JSON.stringify(data);

                 alert(json);
                 }
                 });
                 }
                 });
                 }*/

            }]);
