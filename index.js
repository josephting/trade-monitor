var fs = require('fs'),
    express = require('express'),
    http = require('http'),
    cache = require('memory-cache'),
    querystring = require('querystring'),
    SteamID = require('steamid'),
    app = express(),
    baseUrl = 'http://api.steampowered.com/IEconService/',
    cred = {};

try {
    cred = JSON.parse(fs.readFileSync('credentials.json'));
} catch (e) {
    if (e.code === 'ENOENT') {
        cred = JSON.parse(process.env.credentials);
    }
}

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/accounts', function(req, res) {
    res.json(cred);
});

app.get('/:id/trade-offers', function(req, res) {
    var result = cache.get('trade-offers-' + req.params.id);

    if (result === null) {
        http.get(baseUrl + 'GetTradeOffers/v1?get_sent_offers=1&active_only=1&key=' + cred[req.params.id].apiKey, function(response) {
            var body = '';
            response.on('data', function(d) {
                body += d;
            });
            response.on('end', function() {
                result = JSON.parse(body);
                cache.put('trade-offers-' + req.params.id, result, 60000);
                res.json(result);
            });
        });
    } else {
        res.json(result);
    }
});

app.get('/:id/trade-offer/:tradeOfferId', function(req, res) {
    var result = cache.get('trade-offer-' + req.params.id + '-' + req.params.tradeOfferId);

    if (result === null) {
        http.get(baseUrl + 'GetTradeOffer/v1?tradeofferid=' + req.params.tradeOfferId + '&key=' + cred[req.params.id].apiKey, function(response) {
            var body = '';
            response.on('data', function(d) {
                body += d;
            });
            response.on('end', function() {
                result = JSON.parse(body);
                cache.put('trade-offer-' + req.params.id + '-' + req.params.tradeOfferId, result, 60000);
                res.json(result);
            });
        });
    } else {
        res.json(result);
    }
});

app.get('/:id/trade-offer/:tradeOfferId/cancel', function(req, res) {
    var postData = querystring.stringify({
        'tradeofferid': req.params.tradeOfferId,
        'key': cred[req.params.id].apiKey
    });

    var httpReq = http.request(
        {
            hostname: 'api.steampowered.com',
            path: '/IEconService/CancelTradeOffer/v1',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': postData.length
            }
        }, function(response) {
        });

    httpReq.write(postData);
    httpReq.end();

    res.json({"complete":true});
});

app.get('/goto/steam-profile/:accountId', function(req, res) {
    res.redirect('http://steamcommunity.com/profiles/' + convertAccountIDToSteam64ID(req.params.accountId));
});

app.use('/', express.static('public'));

app.set('views', './public');
app.listen(process.env.PORT | 3000);

function convertAccountIDToSteam64ID(accountId) {
    var sid = new SteamID();
    sid.universe = SteamID.Universe.PUBLIC;
    sid.type = SteamID.Type.INDIVIDUAL;
    sid.instance = SteamID.Instance.DESKTOP;
    sid.accountid = parseInt(accountId);
    return sid.getSteamID64();
}
