const assert = require("assert")
const validate = require("../")


assert(validate instanceof Function, "validate must be a function")

assert(validate("{}"), "empty object is valid JSON")
assert(validate("[]"), "empty array is valid JSON")
assert(validate("[1, 2, 3]"))
assert(validate('["hello", "world"]'))
assert(validate('{ "hello": "world" }'))
assert(validate('{ "hello": 4 }'))

assert.equal(validate('{ hello: 4 }', true), false, "is not valid JSON")
