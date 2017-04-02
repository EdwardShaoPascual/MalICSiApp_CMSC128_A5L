'use strict';

(() => {
    angular
        .module('app')
        .controller('profile-controller', profile_controller);

    profile_controller.$inject = ['$scope', '$location', '$routeParams', 'ProfileService'];

    function profile_controller($scope, $location, $routeParams, ProfileService) {
        
        $scope.info = $routeParams.account_id;

        $scope.profile = {};        
        $scope.user_upcoming_events = {};        
        $scope.user_past_events = {};        

        $scope.view_profile = () => {
            window.location.href="#!/profile";

            ProfileService
            .get_profile($scope.info)
                .then((data) => {
                if (data[0].length != 0) {
                    $scope.profile = data[0][0];
                }
            });

            ProfileService
                .get_user_upcoming_events($scope.info)
                .then((data) => {
                if (data[0].length != 0) {
                    $scope.user_upcoming_events = data[0];
                }
            });

            ProfileService
                .get_user_past_events($scope.info)
                .then((data) => {
                if (data[0].length != 0) {
                    $scope.user_past_events = data[0];
                }
            });
        }

        $scope.view_user = () => {
            window.location.href="#!/user";
        }

        $scope.logout = () => {
            window.location.href="#!/";
        }

        $scope.back_to_home = () => {
            window.location.href="#!/game-event";
        }
    }
})();
