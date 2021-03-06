(function() {
    'use strict';
    angular
        .module('proyectoApp')
        .factory('UserExt', UserExt);

    UserExt.$inject = ['$resource', 'DateUtils'];

    function UserExt ($resource, DateUtils) {
        var resourceUrl =  'api/user-exts/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'home': { method: 'GET',
                isArray: true,
                url: 'api/main/scroll'

            },
            'sendValoration': { method: 'GET',
                isArray: true,
                url: '/api/setUpdateValorationPhoto'


            },
            'filtroPhotos': { method: 'GET',
                isArray: true,
                url: '/api/search/photos'


            },
            'filtroUser': { method: 'GET',
                isArray: true,
                url: '/api/search/users'


            },
            'filtroOffer': { method: 'GET',
                isArray: true,
                url: '/api/search/offer'


            },
            'current': { method: 'GET',
                isArray: true,
                url: '/api/currentAccount'

            },
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.birthdate = DateUtils.convertLocalDateFromServer(data.birthdate);
                    }
                    return data;
                }
            },
            'update': {
                method: 'PUT',
                transformRequest: function (data) {
                    var copy = angular.copy(data);
                    copy.birthdate = DateUtils.convertLocalDateToServer(copy.birthdate);
                    return angular.toJson(copy);
                }
            },
            'save': {
                method: 'POST',
                transformRequest: function (data) {
                    var copy = angular.copy(data);
                    copy.birthdate = DateUtils.convertLocalDateToServer(copy.birthdate);
                    return angular.toJson(copy);
                }
            }
        });
    }
})();
