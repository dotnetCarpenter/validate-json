"use strict"

const assert = require("assert")
const { execSync } = require("child_process")
const path = require("path")
const command = "node " + path.resolve(__dirname, "../bin/validate.js")

// console.log("getErrorOutput(binPath)")
// console.log(getErrorOutput(command))
assert(getErrorOutput(command) == `File not found\n`, "Unexpected file not found message")

// console.log("getErrorOutput(binPath + ' NOT_HERE')")
// console.log(getErrorOutput(command + ' NOT_HERE').toString())
assert(getErrorOutput(command + ' NOT_HERE') == `NOT_HERE not found\n`, "Unexpected file not found message")

function getErrorOutput (command) {
  try {
    execSync(command, { stdio: ["inherit", "ignore", "pipe"]})
  } catch (stdio) {
    return stdio.stderr
  }
}