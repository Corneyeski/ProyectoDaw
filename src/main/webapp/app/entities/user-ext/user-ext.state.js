(function() {
    'use strict';

    angular
        .module('proyectoApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('user-ext', {
            parent: 'entity',
            url: '/profile',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'proyectoApp.userExt.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/user-ext/user-exts.html',
                    controller: 'UserExtController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('userExt');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('user-ext-detail', {
            parent: 'user-ext',
            url: '/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'proyectoApp.userExt.detail.title'
            },
            views: {
                'navbar@':{
                    templateUrl:'app/layouts/left-navbar/left-navbar.html',
                    controller: 'NavbarController',
                    controllerAs:'vm'
                },
                'content@': {
                    templateUrl: 'app/entities/user-ext/user-ext-detail.html',
                    controller: 'UserExtDetailController',
                    controllerAs: 'vm'
                },

            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('userExt');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'UserExt','Photo', function($stateParams, UserExt,Photo) {
                    return UserExt.get({id :$stateParams.id}).$promise;
                    //return Photo.photosUser.$promise;

                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'user-ext',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('company-detail',{
            parent: 'user-ext',
            url: '/{id}',
            data:{
                authorities: ['ROLE_USER'],
                pageTitle: 'empresa'
            },
            views:{

                'content@': {
                    templateUrl: 'app/entities/user-ext/company-detail.html',
                    controller: 'UserExtDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve:{
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('userExt');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'UserExt','Photo', function($stateParams, UserExt) {
                    return UserExt.get({id :$stateParams.id}).$promise;

                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'user-ext',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('user-ext-detail.edit', {
            parent: 'user-ext-detail',
            url: '/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            views:{
                'navbar@':{
                    templateUrl:'app/layouts/left-navbar/left-navbar.html',
                    controller: 'NavbarController',
                    controllerAs:'vm'
                },
                'content@': {
                    templateUrl: 'app/entities/user-ext/user-ext-dialog.html',
                    controller: 'UserExtDialogController',
                    controllerAs: 'vm'
                }
            },
            // resolve: {
            //     entity: ['UserExt','$stateParams', function($stateParams,UserExt) {
            //         return UserExt.get({id : $stateParams.id}).$promise;
            //     }]
            // },
            // onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
            //     $uibModal.open({
            //         templateUrl: 'app/entities/user-ext/user-ext-dialog.html',
            //         controller: 'UserExtDialogController',
            //         controllerAs: 'vm',
            //         backdrop: 'static',
            //         size: 'lg',
            //         resolve: {
            //             entity: ['UserExt', function(UserExt) {
            //                 return UserExt.get({id : $stateParams.id}).$promise;
            //             }]
            //         }
            //     }).result.then(function() {
            //         $state.go('^', {}, { reload: false });
            //     }, function() {
            //         $state.go('^');
            //     });
            // }]
        })
        .state('user-ext.new', {
            parent: 'user-ext',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/user-ext/user-ext-dialog.html',
                    controller: 'UserExtDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                birthdate: null,
                                phone: null,
                                kind: null,
                                tags: null,
                                address: null,
                                country: null,
                                city: null,
                                popular: null,
                                companyPoints: null,
                                validated: null,
                                age: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('user-ext', null, { reload: 'user-ext' });
                }, function() {
                    $state.go('user-ext');
                });
            }]
        })
        .state('user-ext.delete', {
            parent: 'user-ext',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/user-ext/user-ext-delete-dialog.html',
                    controller: 'UserExtDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['UserExt', function(UserExt) {
                            return UserExt.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('user-ext', null, { reload: 'user-ext' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
        // .state('follow',{
        //     parent:'following',
        //     url:'',
        //     data:{
        //         authorities: ['ROLE_USER']
        //     },
        //     views:{
        //         'navbar@':{
        //             templateUrl:'app/layouts/left-navbar/left-navbar.html',
        //             controller: 'NavbarController',
        //             controllerAs:'vm'
        //         },
        //         'content@': {
        //             templateUrl: 'app/entities/user-ext/user-ext-dialog.html',
        //             controller: 'UserExtDetailController',
        //             controllerAs: 'vm'
        //         }
        //     },
        //     resolve:{
        //         entity:[
        //
        //         ]
        //     }
        // });
    }
})();
