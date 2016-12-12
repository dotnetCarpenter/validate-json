
module.exports = validate

function validate(input, silent) {
    let valid = false

    try {

        JSON.parse(input)
        valid = true

    } catch(exception) {

        const errorPosition = /\d+$/
        const red = process.stdout.isTTY ? msg => `\u001B[31m${msg}\u001B[39m` : x=>x

        warn(exception.message)

        if( errorPosition.test(exception.message) ) {

            const position = exception.message.match(errorPosition)[0]|0


            warn(
                input.slice(0, position) +
                red(input.slice(position, position + 1)) +
                input.slice(position + 1, position + 2)
            )
            warn( red("-".repeat(position) + "^") )
        }

    } finally {
        validate.running = false
        return valid
    }


    function warn(msg) {
        silent || console.warn(msg)
    }
}
