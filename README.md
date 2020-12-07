# cairis-ui

[![Build Status](https://secure.travis-ci.org/cairis-platform/cairis-ui.png?branch=master)](http://travis-ci.org/cairis-platform/cairis-ui)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fcairis-platform%2Fcairis-ui.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fcairis-platform%2Fcairis-ui?ref=badge_shield)

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

Normally, all you have to do is go to cairis/cairis/bin on the server and run ```sudo -E ./installUI.sh```.

If you want to manually deploy latest version of the UI then do the following:

1.  Run ```yarn run build``` to create a deployable dist directory.  Copy this to the cairis/cairis directory on your server.
2.  Set the web_static_dir and web_asset_dir entries in your cairis.cnf to point to this dist directory.

### Development and unit testing support

If you're developing for CAIRIS, you can use the cairis_test_default database to avoid authentication.  To do this, you should add a .env.development file to the cairis-ui root directory.  In this file, you should set the VUE_APP_TEST_SESSION environment variable to *test*, and VUE_APP_TEST_CAIRIS_SERVER to the CAIRIS server hostname or IP address.


## License
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fcairis-platform%2Fcairis-ui.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fcairis-platform%2Fcairis-ui?ref=badge_large)