"use strict"

module.exports = validate

function validate(input, silent) {
    let valid = false

    try {
        JSON.parse(input)
        valid = true
    } catch(exception) {
        const errorPosition = /\d+$/

        warn(exception.message)

        if( errorPosition.test(exception.message) ) {

            const red = process.stdout.isTTY ? msg => `\u001B[31m${msg}\u001B[39m` : x=>x
            const position = exception.message.match(errorPosition)[0]|0

            warn(
                input.slice(0, position) +
                red(input.slice(position, position + 1)) +
                input.slice(position + 1, position + 2)
            )

            // recalculate position so new line doesn't count
            warn( red("-".repeat(recalcPosition(position, input)) + "^") )
        }

    } finally {
        validate.running = false
        return valid
    }


    function warn(msg) {
        silent || console.warn(msg)
    }
}


function recalcPosition(position, input) {
    let i = 0|0, newPos = 0|0
    while (i !== position) {
        newPos++
        if(input[i] === "\n") newPos = 0|0
        i++
    }
    return newPos
}
