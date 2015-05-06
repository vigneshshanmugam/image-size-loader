# image-size-loader
Webpack image loader with some extra informations on the image. 

## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

``` javascript
var dimensions = require("image-size!./file.png");
// => emits file.png as file in the output directory and returns the public url
// => returns i. e. "/public-path/file.png"
```

## Template placeholders

* `[ext]` the extension of the resource
* `[name]` the basename of the resource
* `[path]` the path of the resource relative to the `context` query parameter or option.
* `[hash]` the hash or the content
* `[<hashType>:hash:<digestType>:<length>]` optionally you can configure
  * other `hashType`s, i. e. `sha1`, `md5`, `sha256`, `sha512`
  * other `digestType`s, i. e. `hex`, `base26`, `base32`, `base36`, `base49`, `base52`, `base58`, `base62`, `base64`
  * and `length` the length in chars
* `[N]` the N-th match obtained from matching the current file name against the query param `regExp`

## Examples

#### webpack.config.js

```js
// webpack.config.js
module.exports = {
    output: {
        publicPath: 'public/'
    },
    module: {
        loaders: [
            {
                test: /\.(gif|jpeg|png)/,
                loader: 'image-dimension-loader'
            }
        ]
    }
};
```


#### example_module.js

``` javascript
var result = require("./image.png");
// {width: 500, height: 700, type: "png", url: "public/image.png", geometry: "500x700"}

```
