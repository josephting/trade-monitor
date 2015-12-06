angular.module('app', [ 'ngRoute' ])

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
});
