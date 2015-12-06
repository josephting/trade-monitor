# Trade Monitor

This app allows you to quickly view all the trade offers your Steam accounts sent. You can also cancel a trade offer directly within the app.

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

Make sure you have Gulp and Bower installed globally.

```
npm install -g gulp
npm install -g bower
```

Install local dependencies
```
npm install
bower install
```

Build and compile static assets

`gulp`

Run server

`node index.js`

Navigate to [http://localhost:3000](http://localhost:3000) to start using the app.
