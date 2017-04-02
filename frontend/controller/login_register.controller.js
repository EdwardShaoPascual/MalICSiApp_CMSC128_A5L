
'use strict';

(() => {
    angular
    	.module('app')
        .controller('login-register-controller', login_register_controller);

    function login_register_controller($scope, $location, LoginRegisterService) {
        
        $scope.info = {
            username : undefined,
            password : undefined
        }

        $scope.data = {
            username: undefined,
            password: undefined,
            fname: undefined,
            mname: undefined,
            lname: undefined,
            college: undefined,
            course: undefined,
            emailadd: undefined,
            position: undefined,
            date: undefined,
            is_player: undefined,
            player_jersey_num: 0,
            player_role: undefined
        }

        $scope.login = () => {
            if ($scope.info.username === undefined ||
                $scope.info.username === '' ||
                $scope.info.password === undefined ||
                $scope.info.password === '') {
                Materialize.toast("Please fill-out all the fields", 4000, 'teal');
                $scope.info.username = '';
                $scope.info.password = '';
                $scope.info.username = undefined;
                $scope.info.password = undefined;
                $("#modal-login").modal('close');
            } else {
        		LoginRegisterService
                    .retrieve_account($scope.info)
                    .then(function(res) {
                        $("#modal-login").modal('close');	
                    }, function(err) {
                        Materialize.toast(err.message, 4000, 'teal');
                        $scope.info.username = '';
                        $scope.info.password = '';
                        $scope.info.username = undefined;
                        $scope.info.password = undefined;
                    })
            }
        }

        $scope.register = () => {
            let isplayer = $("#is_player").is(":checked");
            let e = document.getElementById("opt");
            let strUser = e.options[e.selectedIndex].value;
            $scope.data.date = $('.datepicker').val();
            $scope.data.college = strUser;
            if (isplayer) 
            {
                $scope.data.is_player = 1;
            }
            else 
            {
                $scope.data.is_player = 0;
            }

            if ($scope.data.username === undefined ||
                $scope.data.username === '' ||
                $scope.data.password === undefined ||
                $scope.data.password === '' ||
                $scope.data.fname === undefined ||
                $scope.data.fname === '' ||
                $scope.data.mname === undefined ||
                $scope.data.mname === '' ||
                $scope.data.lname === undefined ||
                $scope.data.lname === '' ||
                $scope.data.college === undefined ||
                $scope.data.college === '' ||
                $scope.data.course === undefined ||
                $scope.data.course === '' ||
                $scope.data.emailadd === undefined ||
                $scope.data.emailadd === '' ||
                $scope.data.date === undefined ||
                $scope.data.date === '' ||
                $scope.data.position === undefined ||
                $scope.data.position === '' ||
                $scope.data.player_role === undefined ||
                $scope.data.player_role === '') {
                Materialize.toast("Please fill-out all the fields", 4000, 'teal');
                $scope.data.username = '';
                $scope.data.password = '';
                $scope.data.fname = '';
                $scope.data.mname = '';
                $scope.data.lname = '';
                $scope.data.college = '';
                $scope.data.course = '';
                $scope.data.emailadd = '';
                $scope.data.date = '';
                $scope.data.position = '';
                $scope.data.player_role = '';
                $("#modal-register").modal('close');           
            } else {
                LoginRegisterService
                    .register_account($scope.data)
                    .then(function(res) {
                        $("#modal-register").modal('close');
                        Materialize.toast("Your registration is now on process!", 4000, 'teal');
                    }, function(err) {
                        Materialize.toast(err.message, 4000, 'teal');
                    })
            }
        }
    }

})();
