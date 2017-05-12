angular.module('starter.services', ['ngResource'])
        .constant("baseURL","http://localhost:8080/")
       .factory('userRegisterFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
           return $resource(baseURL + "user/signup");

        }])

        .factory('userLoginFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
                    return $resource(baseURL + "user/login");

        }])

        .factory('userLogoutFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
                    return $resource(baseURL + "user/logout");

        }])

         .factory('userProfileFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
                    return $resource(baseURL + "user/profile");

        }])

         .factory('userPorfileUpdateFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
                    return $resource(baseURL + "user/profile/update");

        }])

         .factory('formUpdateFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
                    return $resource(baseURL + "form/update");

        }])

         .factory('formListFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
                    return $resource(baseURL + "form/list");

        }])

         .factory('formListDetailsFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
                    return $resource(baseURL + "form/list/details");

        }])

        .factory('$localStorage', ['$window', function($window) {
                  return {
                    store: function(key, value) {
                      $window.localStorage[key] = value;
                    },
                    get: function(key, defaultValue) {
                      return $window.localStorage[key] || defaultValue;
                    },
                    storeObject: function(key, value) {
                      $window.localStorage[key] = JSON.stringify(value);
                    },
                    getObject: function(key,defaultValue) {
                      return JSON.parse($window.localStorage[key] || defaultValue);
                    }
                  }
                }])
        ;