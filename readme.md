# `credentials.json`

You must create a `credentials.json` file in project root in order for this to work. This file contains the Steam ID of the Steam account you want to track along with its username or any name you want to tag the account as and the [API key](http://steamcommunity.com/dev/apikey).

Format

``` JSON
{
  "Steam64ID": {
    "username": "username",
    "id": "Steam64ID",
    "apiKey": "API Key"
  },
  "70000000000000000": {
    "username": "username",
    "id": "70000000000000000",
    "apiKey": "9A8C789E6B129837DE98F100C9F8A2E2"
  }
}
```

# Run server

`node index.js`
