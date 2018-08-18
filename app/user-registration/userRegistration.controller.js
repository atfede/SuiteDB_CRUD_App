angular.module('userRegistrationController',
    [
        'angularUtils.directives.dirPagination'
    ])
    .controller('userRegistrationController',
        [
            '$rootScope',
            '$scope',
            '$http',
            '$window',
            '$location',
            'userService',
            function ($rootScope, $scope, $http, $window, $location, userService) {

                var self = $scope;

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

                self.genderOptions = [
                    {
                        name: 'Male',
                        value: 'Male'
                    },
                    {
                        name: 'Female',
                        value: 'Female'
                    }
                ];

                self.selectedGenderOption = self.genderOptions[0].value;

                self.AddModal = false;
                self.EditModal = false;
                self.DeleteModal = false;

                self.errorFirstName = false;

                self.showAdd = function () {
                    self.firstname = null;
                    self.lastname = null;
                    self.address = null;
                    self.errorFirstName = false;
                    self.errorLastName = false;
                    self.errorAddress = false;
                    self.AddModal = true;
                }

                self.addUser = function () {
                    //$window.localStorage.removeItem('usersLS');

                    if (checkForm()) {
                        if ($window.localStorage.getItem('usersLS') != null) {
                            self.users = JSON.parse($window.localStorage.getItem('usersLS'));
                        } else {
                            self.users = [];
                        }

                        var user = _.find(self.users, function (obj) {
                            return (obj.email === self.user.email);
                        });

                        if (user == null) {
                            var user = {
                                id: self.getLastUserId(self.users),
                                firstName: self.user.firstName,
                                lastName: self.user.lastName,
                                email: self.user.email,
                                phone: self.user.phone,
                                address: self.user.address,
                                dateOfBirth: $("#dob").val(),
                                comments: self.user.comments,
                                gender: self.selectedGenderOption
                            };

                            self.users.push(user);
                            $window.localStorage.setItem('usersLS', JSON.stringify(self.users));

                            self.user = null;

                            alert("User created!");

                            $location.path("/userList");
                        }
                        else {
                            alert('Error: user already exists!');
                        }
                    }
                    else {
                        alert("Error: you must meet all validations!");
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

                self.getGender = function (gender) {
                    if (gender == "f") {
                        return "Female";
                    }
                    else {
                        return "Male";
                    }
                }

                $("#dateOfBirth").datepicker({
                    defaultDate: new Date('1997/01/01'),
                    changeYear: true,
                    dateFormat: 'dd/mm/yy',
                    minDate: new Date('1950/01/01'),
                    maxDate: '-1d',
                    onSelect: function (dateText, inst) {
                        validateDateOfBirth(dateText);
                        $("#dob").val(dateText);
                    }
                })


            }]);
