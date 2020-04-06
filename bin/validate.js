#!/usr/bin/env node

"use strict"

const validate = require("../")
const p = process
const fs = require("fs")


/********** CLI HELP **********/

const options = {
    help: ["--help", "-h"],
    silent: ["--silent", "-s"],
    version: ["--version", "-v"]
}
const args = flatten(
    p.argv
        .slice(2)
        .map(param =>
            Object.keys(options)
                .map(name => options[name].indexOf(param) > -1 && name)
                .filter(x => x)
        ))

function flatten(array) {
    if (!Array.isArray(array)) return [array]
    return array.reduce((a,b) => a.concat(flatten(b)), [])
}

const silent = isParam("silent", args)
const help = isParam("help", args)
const version = isParam("version", args)

if (help || version) showVersionOrHelp(help)

function isParam(name, parameters) {
    return parameters.indexOf(name) > -1
}

function showVersionOrHelp (help) {
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
    exit(true)
}

/********** END OF CLI HELP **********/
const flatOptions = flatten(Object.entries(options))
const filepath = p.argv
                    .slice(2)
                    .filter(param =>
                        !isParam(param, flatOptions))
                    .join("")

if (p.stdin.isTTY) {
    try {
        exit(
            validate(
                fs.readFileSync(filepath, { encoding:"utf8" }),
                silent
            ))
    } catch (_) {
        console.warn(`${filepath || "File"} not found`)
        exit(false)
    }
} else {
    let input = ""

    p.stdin.setEncoding('utf8')

    p.stdin.on("data", data => {
        return input += data
    })

    p.stdin.on("end", () => {
        exit(validate(input, silent))
    })
}

function exit(valid) {
    valid ? p.exit(0) : p.exit(1)
}
