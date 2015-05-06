# image-size-loader
Webpack image loader with some extra informations on the image. 

## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

``` javascript
var dimensions = require("image-size!./file.png");
// => returns js object: i.e. { width: 400, height: 300, type: "png" }
```

