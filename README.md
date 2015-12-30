# webpack-long-term-caching

How to implement long term caching with webpack.

This webpack configuration will ouput seperate minified bundles for application and vendor sources as well as their sourcemaps. The `index.html` will all be minified as well.

## Getting started

This will install all npm packages

    > npm install

## Production build

This will package the application and output to /dist

    > npm start

You should see output like the following:

```
Hash: a433745690711902c340
Version: webpack 1.12.9
Time: 1681ms
                                       Asset       Size  Chunks             Chunk Names
       assets/js/app.5d0e53c9a5099b974b83.js  216 bytes    0, 2  [emitted]  app
    assets/js/vendor.106ca29e3b7e900426fd.js    51.4 kB    1, 2  [emitted]  vendor
   assets/js/app.5d0e53c9a5099b974b83.js.map    1.09 kB    0, 2  [emitted]  app
assets/js/vendor.106ca29e3b7e900426fd.js.map     964 kB    1, 2  [emitted]  vendor
                                  index.html    1.11 kB          [emitted]
   [0] ./index.js 127 bytes {0} [built]
   [0] multi vendor 28 bytes {1} [built]
```

Now if you change the contents of `index.js` and rebuild, you'll see that the app bundle's hash changed but the vendor bundle's hash stayed the same.

```
Hash: 810d493f331a49634c18
Version: webpack 1.12.9
Time: 1776ms
                                       Asset       Size  Chunks             Chunk Names
       assets/js/app.c44c92316bd086705dd0.js  216 bytes    0, 2  [emitted]  app
    assets/js/vendor.106ca29e3b7e900426fd.js    51.4 kB    1, 2  [emitted]  vendor
   assets/js/app.c44c92316bd086705dd0.js.map    1.09 kB    0, 2  [emitted]  app
assets/js/vendor.106ca29e3b7e900426fd.js.map     964 kB    1, 2  [emitted]  vendor
                                  index.html    1.11 kB          [emitted]
   [0] ./index.js 127 bytes {0} [built]
```