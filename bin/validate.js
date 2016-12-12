#!/usr/bin/env node

"use strict"

const validate = require("../")
const p = process
const fs = require("fs")


if( fs.existsSync(process.argv[2]) ) {
    exit(
        validate(
            fs.readFileSync(process.argv[2], { encoding:"utf8" })))
} else {
    let input = ""

    p.stdin.on("data", data => input += data)

    p.stdin.on("end", () => { exit(validate(input)) })
}

function exit(valid) {
    valid ? p.exit(0) : p.exit(1)
}
