validjson
=========
[![Build Status](https://travis-ci.org/dotnetCarpenter/validate-json.svg?branch=master)](https://travis-ci.org/dotnetCarpenter/validate-json)


Simpel command line JSON validator written in nodejs.


### Installation ###

```
npm i -g valid-json-cli
```


### Usage ###

Currently the only option which does something is `--silent`, which supress error hint
on error. It does not matter if you set the option before or after the path if you
supply a file as parameter. Unknown parameters are ignored.

```
Usage:  validjson path [options]
        cat file.json | validjson [options]
        validjson [options] < file.json

Options:
      -s, --silent     no text output - will still exit with exitcode 0 or 1
  -V, -v, --version    display version number and exit
      -h, --help       display this help and exit
```

![displays errors in color on the command line](img/Screenshot_from_version_1.1.1.png "Graphical error hint")


### API ###

validjson({String} json, {Boolean} [silent]) : {Boolean} valid

+ json - the input you want to validate as JSON
+ silent - an optional option to silent validjson on error

```js
"use strict"
// API: validjson({String} json, {Boolean} [silent]) : {Boolean} valid
const validjson = require("valid-json-cli")
const http = require("http")
const request = http.request({ hostname: "jsonip.com" }, response => {
    let json = ""
    response.setEncoding("utf8");
    response.on("data", (chunk) => {
        json += chunk
    })
    response.on("end", () => {
        console.log(`JSON data is ${validjson(json, true) ? "valid" : "invalid"}`)
        console.log(json)
    });
})

request.end()
```
https://runkit.com/585114841ca9e00014bc0cb4/585114841ca9e00014bc0cb5

### Installation and usage within a project ###

```
npm i --save valid-json-cli
yarn add valid-json-cli
```

In your `package.json` you can add:

```json
"scripts": {
    "validjson": "validjson",
    "json": "validjson < file.json | echo Good to go!"
},
```

Now you can use it via `npm run validjson` from outside npm e.i. Make.

```make
file.js : file1.json
    npm run validjson -- --silent $<
    # do something more
```
