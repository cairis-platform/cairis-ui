# cairis-ui

[![Build Status](https://secure.travis-ci.org/failys/cairis-ui.png?branch=master)](http://travis-ci.org/failys/cairis-ui)

UI for CAIRIS.  

## Project setup
```
yarn install
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
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Installing into CAIRIS

To deploy latest version of the CAIRIS 2 UI:

1.  Run ```yarn run build``` to create a deployable dist directory.  Copy this to the cairis/cairis directory on your server.
2.  Set the web_static_dir and web_asset_dir entries in your cairis.cnf to point to this dist directory.

### Development and unit testing support

If you're developing for CAIRIS, you can use the cairis_test_default database to avoid authentication.  To do this, you should add a .env.development file to the cairis-ui root directory.  In this file, you should set the following environment variables:

VUE_APP_TEST_SESSION=test
VUE_APP_TEST_CAIRIS_SERVER=<CAIRIS server hostname or IP address>
