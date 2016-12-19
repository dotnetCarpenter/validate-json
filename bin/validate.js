#!/usr/bin/env node

"use strict"

const validate = require("../")
const p = process
const fs = require("fs")


/********** CLI HELP **********/

const options = {
    help: ["--help", "-h"],
    silent: ["--silent", "-s"],
    version: ["--version", "-v"]/*,
    timeout: ["--timeout", "-t"]*/
}
const timeout = 500
const args =
flatten(
    p.argv
        .slice(2)
        .map(param =>
            Object.keys(options)
                .map(name => options[name].indexOf(param) > -1 && name)
                .filter(x => x)
        )
)

function flatten(array, accu = []) {
    array.forEach(a => {
        if(Array.isArray(a)) flatten(a, accu)
        else accu.push(a)
    })
    return accu
}

const silent = isParam("silent", args)
const help = isParam("help", args)
const version = isParam("version", args)
//const timeout = isParam("timeout", args) || 500

function isParam(name, parameters) {
    return parameters.indexOf(name) > -1
}

if(help || version) {
    const pkg = require("../package.json")
    console.log(`${pkg.realname}: ${pkg.version}`)

    if(help) {
        console.log(
`Usage:  ${pkg.realname} path [options]
        cat file.json | ${pkg.realname} [options]
        ${pkg.realname} [options] < file.json
 
Options:
      -s, --silent     no text output - will still exit with exitcode 0 or 1
      -v, --version    display version number and exit
      -h, --help       display this help and exit`
        )
    }
    exit(0)
}
/********** END OF CLI HELP **********/
const flatOptions = flatten(Object.entries(options))
const filepath = p.argv
                    .slice(2)
                    .filter(param =>
                        !isParam(param, flatOptions))
                    .join("")


const timer = setTimeout(exit.bind(null, false), timeout)


if( fs.existsSync(filepath) ) {
    clearTimeout(timer)

    exit(
        validate(
            fs.readFileSync(filepath, { encoding:"utf8" }),
            silent
        ))
} else {
    let input = ""

    p.stdin.on("data", data => {
        clearTimeout(timer)
        return input += data
    })

    p.stdin.on("end", () => {
        exit(validate(input), silent)
    })
}

function exit(valid, msg) {
    valid ? p.exit(0) : p.exit(1)
}
