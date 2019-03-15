# cairis-ui

[![Build Status](https://secure.travis-ci.org/failys/cairis-ui.png?branch=master)](http://travis-ci.org/failys/cairis-ui)

UI for CAIRIS.  

The current design is based on the CAIRIS 1.x UI, but -- once complete -- this will replace the existing CAIRIS 1.x UI.  

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run your unit tests
```
npm run test:unit
```

### Installing into CAIRIS

To deploy the CAIRIS 2 UI:

1.  Run ```npm run build``` to create a deployable dist directory.  Copy this to the cairis/cairis directory on your server.
2.  Set the web_static_dir and web_asset_dir entries in your cairis.cnf to point to this dist directory.

### Development and unit testing support

If you're developing for CAIRIS, you can use the cairis_test_default database to avoid authentication.  To do this:

1.  Manually set the IP address of your CAIRIS server in store/index.js.
2.  Set the session in store/index.js to 'test'.
