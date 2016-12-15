"use strict"

const assert = require("assert")
const fs = require("fs")
const validate = require("../")


assert(validate instanceof Function, "validate must be a function")

assert(validate("{}"), "empty object is valid JSON")
assert(validate("[]"), "empty array is valid JSON")
assert(validate("[1, 2, 3]"))
assert(validate('["hello", "world"]'))
assert(validate('{ "hello": "world" }'))
assert(validate('{ "hello": 4 }'))

assert.equal(validate("{ hello: 4 }", true), false, "is not valid JSON")
assert.equal(
    validate(
        fs.readFileSync(`${__dirname}/fixture/invalid.json`, "utf8"),
        true
    ),
    false,
    "is not valid JSON"
)
assert.equal(validate("lorem"), false, "invalid JSON at position 0 must return false")
