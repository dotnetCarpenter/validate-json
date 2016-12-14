#!/usr/bin/env node

"use strict"

const validate = require("../")
const p = process
const fs = require("fs")


/********** CLI HELP **********/
const options = {
    help: ["--help", "-h"],
    silent: ["--silent", "-s"],
    version: ["--version", "-V", "-v"]
}
const args =
flatten(
    p.argv
        .slice(2)
        .map(param =>
            Object.keys(options)
                .map(name => options[name].indexOf(param) > -1 && name)
                .filter(x=>x)
        )
)

function flatten(array, accu = []) {
    array.forEach(a => {
        if(Array.isArray(a)) flatten(a, accu)
        else accu.push(a)
    })
    return accu
}

const silent = args.indexOf("silent") > -1
const help = args.indexOf("help") > -1
const version = args.indexOf("version") > -1


if(help || version) {
    const pkg = require("../package.json")
    console.log(


`${pkg.realname} ${pkg.version}`)


    if(help) {
        console.log(


`Usage:  ${pkg.realname} path [options]
        cat file.json | ${pkg.realname} [options]
        ${pkg.realname} [options] < file.json

Options:
      -s, --silent     no text output - will still exit with exitcode 0 or 1
  -V, -v, --version    display version number and exit
      -h, --help       display this help and exit`


        )
    }
    exit(0)
}
/********** END OF CLI HELP **********/

const timeout = setTimeout(exit, 500)

if( fs.existsSync(p.argv[2]) ) {
    clearTimeout(timeout)

    exit(
        validate(
            fs.readFileSync(p.argv[2], { encoding:"utf8" }),
            silent
        ))
} else {
    let input = ""

    p.stdin.on("data", data => {
        clearTimeout(timeout)
        return input += data
    })

    p.stdin.on("end", () => {
        exit(validate(input), silent)
    })
}

function exit(valid) {
    valid ? p.exit(0) : p.exit(1)
}
