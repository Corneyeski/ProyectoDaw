$("#uploadModal").click(change);
function change() {
    $("#oculto").toggle();
}
(function () {
    'use strict';

    angular
        .module('proyectoApp')
        .controller('NavbarController', NavbarController);

    NavbarController.$inject = ['$state', 'Auth', 'Principal', 'ProfileService','entity', 'LoginService', '$uibModal', '$rootScope','UserExt'];

    function NavbarController($state, Auth, Principal, ProfileService, LoginService,entity, $uibModal, $rootScope, UserExt) {
        var vm = this;
        var count = 0;
        vm.isNavbarCollapsed = true;
        vm.isAuthenticated = Principal.isAuthenticated;

        ProfileService.getProfileInfo().then(function (response) {
            vm.inProduction = response.inProduction;
            vm.swaggerEnabled = response.swaggerEnabled;
        });

        vm.login = login;
        vm.logout = logout;
        vm.profile = profile;
        vm.toggleNavbar = toggleNavbar;
        vm.collapseNavbar = collapseNavbar;
        vm.$state = $state;
        vm.hide = hide;
        vm.show = show;
        vm.upload = upload;
        vm.modal = modal;
        vm.modalOffert = modalOffert;
        vm.userExt = entity;
        loadAll();

        function loadAll() {
            UserExt.current({},onSuccess, onError);
            function onSuccess(data, headers) {

               // vm.idUsu = data.id;
                console.log("dale0");
                console.log(data);
            }
            function onError(error) {
                AlertService.error(error.data.message);
            }
        }
        function login() {
            collapseNavbar();
            LoginService.open();
        }

        function logout() {
            collapseNavbar();
            Auth.logout();
            $state.go('home');
        }
        function profile(id){
            collapseNavbar();
            $state.go('user-ext-detail({id:' + data.id + '})');
        }

        function toggleNavbar() {
            vm.isNavbarCollapsed = !vm.isNavbarCollapsed;
        }

        function collapseNavbar() {
            vm.isNavbarCollapsed = true;
        }

        function hide() {
            if($(document).width() > 1690){
                $("#style-1").animate({left: "-150px"}, 100);
            }else {
                if($(document).width() > 1200){
                    $("#style-1").animate({left: "-100px", width: "10%"}, 100);
                }else {
                    $("#style-1").animate({left: "0px"}, 100);
                }
            }
        }
        function show() {
            $("#style-1").animate({left: "0px"}, 100);
        }

        function upload() {
            $("#oculto").toggle();
        }

        function modal() {
            $uibModal.open({
                templateUrl: 'app/entities/photo/photo-dialog-user.html',
                controller: 'PhotoDialogController',
                controllerAs: 'vm',
                backdrop: 'static',
                size: 'lg',
                resolve: {
                    entity: function () {
                        return {
                            name: null,
                            image: null,
                            imageContentType: null,
                            url: null,
                            time: null,
                            tags: null,
                            points: null,
                            id: null
                        };
                    }
                }
            }).result.then(function() {
                $state.go($state.current.name);
            }, function() {
                $state.go($state.current.name);
            });
        }

        function modalOffert() {
            $uibModal.open({
                templateUrl: 'app/entities/offer/offer-dialog-user.html',
                controller: 'OfferDialogController',
                controllerAs: 'vm',
                backdrop: 'static',
                size: 'lg',
                resolve: {
                    entity: function () {
                        return {
                            name: null,
                            image: null,
                            imageContentType: null,
                            url: null,
                            time: null,
                            tags: null,
                            points: null,
                            id: null
                        };
                    }
                }
            }).result.then(function() {
                $state.go($state.current.name);
            }, function() {
                $state.go($state.current.name);
            });
        }
    }
})();
