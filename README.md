# Condo Manager - Mobile

## Overview

This is a [React Native](https://facebook.github.io/react-native) mobile app built using [Expo](https://expo.io), and consumes all it's infos from the _REST API_ provided by a [condo-manager](https://github.com/LittleDarthOne/condo-manager) instance. For this reason the adress pointing to the _API_ must be provided on the `app.json` at the root of the project, changing the key `api.host` like:

```javascript
  "api": {
    "host": "http://192.168.25.7:8989"
  }
```

## Running

As a React Native app, simply run:

```javascript
  npm install
  npm start
```

When ready, the Expo dev tools should open. From this point, run the app using the Expo Client app directly from a device, as explained in https://expo.io/learn
