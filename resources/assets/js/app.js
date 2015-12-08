angular.module('app', [ 'ngRoute', 'ui.select' ])

// Routes
.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'home.html',
        controller: 'HomeController'
    })
    .when('/:steamId/trade-offers', {
        templateUrl: 'trade-offers.html',
        controller: 'TradeOffersController'
    })
    .when('/:steamId/trade-offer/:tradeOfferId', {
        templateUrl: 'trade-offer.html',
        controller: 'TradeOfferController'
    })
    .when('/trade-offer-status', {
        templateUrl: 'trade-offer-status.html',
        controller: 'TradeOfferStatusController'
    })
    .otherwise({
        redirectTo: '/'
    });
})

// Controllers
.controller('HomeController', function($scope, $http) {
    $http.get('/accounts').then(function(res) {
        $scope.accounts = res.data;
    });
})

.controller('TradeOffersController', function($scope, $http, $route) {
    $scope.steamId = $route.current.params.steamId;
    $http.get($route.current.originalPath.replace(':steamId', $route.current.params.steamId)).then(function(res) {
        $scope.data = res.data;
    });
})

.controller('TradeOfferController', function($scope, $http, $route) {
    $scope.steamId = $route.current.params.steamId;
    $scope.tradeOfferId = $route.current.params.tradeOfferId;
    $http.get($route.current.originalPath.replace(':steamId', $route.current.params.steamId).replace(':tradeOfferId', $route.current.params.tradeOfferId)).then(function(res) {
        $scope.offer = res.data.response.offer;
    });

    $scope.cancel = function() {
        $http.get($route.current.originalPath.replace(':steamId', $route.current.params.steamId).replace(':tradeOfferId', $route.current.params.tradeOfferId) + '/cancel').then(function(res) {
            $scope.cancelled = res.completed;
        });
    };
})

.controller('TradeOfferStatusController', function($scope, $http) {
    $http.get('/accounts').then(function(res) {
        $scope.accounts = [];
        for (var account in res.data) {
            $scope.accounts.push(res.data[account]);
        }
    });

    $scope.steam64id = {};

    $scope.generateEndpoint = function() {
        $scope.endpoint = 'http://api.steampowered.com/IEconService/GetTradeOffer/v1?tradeofferid=' + $scope.tradeofferid + '&key=' + $scope.steam64id.selected.apiKey;
    };
});
