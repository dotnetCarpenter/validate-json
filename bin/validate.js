#!/usr/bin/env node

"use strict"

const validate = require("../")
const p = process

let input = ""

p.stdin.on("data", data => input += data)
p.stdin.on("end", () => {
    const isValid = validate(input)
    isValid ? p.exit(0) : p.exit(1)
})
