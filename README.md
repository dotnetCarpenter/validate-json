validjson
=========
[![Build Status](https://travis-ci.org/dotnetcarpenter/validate-json.svg?branch=master)](https://travis-ci.org/dotnetcarpenter/validate-json)



Simpel command line JSON validator written in nodejs.


### Installation ###

```
npm i -g valid-json-cli
```


### Usage ###

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


### Installation and usage with a project ###

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
