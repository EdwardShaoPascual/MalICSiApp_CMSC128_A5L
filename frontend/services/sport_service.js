'use strict';
 
(() => {
	angular
		.module('app')
		.factory('SportService', SportService);

		SportService.$inject = ['$window', '$http', '$q', '$httpParamSerializer'];

		const headers = {
			'content-type': 'application/x-www-form-urlencoded'
		};

		function SportService($window, $http, $q, $httpParamSerializer) {

			const get_match = function (data) {
				let deferred = $q.defer();

				$http({
					method: 'GET',
					xhrFields: {withCredentials: true},
					url: '/api/get-sport-team/' + data.sport_id,
					headers: headers
					
				})
				.then(function(res) {
					deferred.resolve(res);
				}, function(err) {
					deferred.reject(err.data);
				})

				return deferred.promise;
			}


			const get_match_teams = function (data) {
				let deferred = $q.defer();
				$http({
					method: 'GET',
					xhrFields: {withCredentials: true},
					url: '/api/get-match-teams/' + data.sport_id,
					headers: headers
					
				})
				.then(function(res) {
					deferred.resolve(res);
				}, function(err) {
					deferred.reject(err.data);
				})

				return deferred.promise;
			}

			const get_court = function(data) {
				let deferred = $q.defer();
				$http({
					method: 'GET',
					xhrFields: {withCredentials: true},
					url: '/api/get-all-court/',
					headers: headers
					
				})
				.then(function(res) {
					deferred.resolve(res);
				}, function(err) {
					deferred.reject(err.data);
				})

				return deferred.promise;
			}

			const delete_match = function(data) {
				let deferred = $q.defer();
				$http({
					method: 'POST',
					data: $httpParamSerializer(data),
					xhrFields: {withCredentials: false},
					url: '/api/delete-match-event/',
					headers: headers
				})
				.then(function(res) {
					deferred.resolve(res.data);
				}, function(err) {
					deferred.reject(err.data);
				})

				return deferred.promise;
			}

			const add_match = function(data){
				let deferred = $q.defer();
				$http({
					method: 'POST',
					data: $httpParamSerializer(data),
					xhrFields: {withCredentials: false},
					url: '/api/add-match-event/',
					headers: headers
				})
				.then(function(res) {
					deferred.resolve(res.data);
				}, function(err) {
					deferred.reject(err.data);
				})

				return deferred.promise;
			}

			const add_team_to_match = function(data){
				let deferred = $q.defer();
				$http({
					method: 'POST',
					data: $httpParamSerializer(data),
					xhrFields: {withCredentials: false},
					url: '/api/add-match-event-team/',
					headers: headers
				})
				.then(function(res) {
					deferred.resolve(res.data);
				}, function(err) {
					deferred.reject(err.data);
				})

				return deferred.promise;
			}

			const get_sport = function(data) {
				let deferred = $q.defer();
				$http({
					method: 'GET',
					xhrFields: {withCredentials: false},
					url: '/api/get-sport/' + data.sport_id,
					headers: headers
				})
				.then(function(res) {
					deferred.resolve(res.data);
				}, function(err) {
					deferred.reject(err.data);
				})

				return deferred.promise;
			}

			let service = {};
			service.get_match 				= get_match;
			service.get_match_teams 		= get_match_teams;						
			service.get_court 				= get_court;
			service.get_sport				= get_sport;
			service.add_match				= add_match;			
			service.add_team_to_match		= add_team_to_match;
			service.delete_match			= delete_match;			
			return service;

		}
})();