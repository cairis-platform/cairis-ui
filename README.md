# cairis-ui

UI for CAIRIS.  

The current design is based on the CAIRIS 1.x UI, but -- once complete -- this will replace the existing CAIRIS 1.x UI.  

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
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

### Working with CAIRIS

You will need a CAIRIS server to get/post/put/delete objects.  For the time being, the IP address of your CAIRIS server needs to be manually set in store/index.js.
You will also need to import a CAIRIS model into the cairis_test_default database, which is associated with the `test` session that is also hardcoded into store/index.js.  To do this, just use the cimport.py script without setting a user or database.