export default {
        rules: {
            "name": {
                required: true
            },
            "email": {
                required: true,
                email: true
            },
            "address": {
                regex: /^(:?\d{2,}-?)?\d{2,}\s[a-z]+\s[a-z]+\.?$/i
            },
            "postal-code": {
                regex: /^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ]( )?\d[ABCEGHJKLMNPRSTVWXYZ]\d$/i
            },
            "zip-code": {
                regex: /^\d{5}$/
            }
        },
        messages: {
            "name": {
                required: "Please enter your name, as it is required to submit."
            },
            "email": {
                required: "Please enter a valid email address; also required for submission."
            },
            "address": {
                regex: "Address should have number first then street name. If apartment then add unit number to beginning of street number followed by '-' with no single quotes."
            },
            "postal-code": {
                regex: "Need a valid Postal Code eh!"
            },
            "zip-code": {
                regex: "Going to need a valid Zip code."
            }
        }
    }