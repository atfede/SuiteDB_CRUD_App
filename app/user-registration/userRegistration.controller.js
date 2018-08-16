angular.module('userRegistrationController',
    [
        'angularUtils.directives.dirPagination'
    ]
)
    .controller('userRegistrationController',
        [
            '$scope',
            '$http',
            '$window',
            '$cookies',
            function ($scope, $http, $window, $cookies) {

                $scope.user = {
                    id: null,
                    firstName: '',
                    lastName: "",
                    phone: "",
                    address: '',
                    dateOfBirth: '',
                    comments: '',
                    gender: ''
                };

                $scope.AddModal = false;
                $scope.EditModal = false;
                $scope.DeleteModal = false;

                $scope.errorFirstname = false;

                $scope.showAdd = function () {
                    $scope.firstname = null;
                    $scope.lastname = null;
                    $scope.address = null;
                    $scope.errorFirstname = false;
                    $scope.errorLastname = false;
                    $scope.errorAddress = false;
                    $scope.AddModal = true;
                }

                $scope.init = function () {

                    $cookies.users = [
                        {memid: 1, firstname: 'Fred', lastname: "Testoni", address: 'Silay City'},
                        {memid: 2, firstname: 'Mark', lastname: "Lopez", address: 'Montevideo City'},
                        {memid: 3, firstname: 'Tito', lastname: "Lopez", address: 'New York City'}
                    ];

                    if ($cookies['users'] != undefined) {
                        $scope.members = $cookies['users'];
                    }
                }

                $scope.addUser = function () {
                    var users = $cookies.users;

                    var user = _.find(users, function (obj) {
                        return (obj.lastname === $scope.user.lastName);
                    });

                    if (user == null) {

                        $cookies.users.push({
                            id: users.length - 1,
                            firstName: $scope.user.firstName,
                            lastname: $scope.user.lastName,
                            phone: $scope.user.phone,
                            address: $scope.user.address,
                            dateOfBirth: $scope.user.dateOfBirth,
                            comments: $scope.user.comments,
                            gender: $scope.user.gender
                        });

                        alert('User was created!');
                    }
                    else {
                        alert('Error: user already exists!');
                    }
                }

            }]);