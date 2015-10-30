import countryTest from './checkCountry';

$(document).ready(function() {
    let $contactForm = $('#contact-info'),
        $name = $contactForm.find('#name'),
        $email = $contactForm.find('#email'),
        $street = $contactForm.find('#address'),
        $country = $contactForm.find('#country'),
        $province = $contactForm.find('#province'),
        $state = $contactForm.find('#state');


    $country.on('change', function() {
        countryTest($contactForm, $(this))
    });

    /*** Validations ***/
    $.validator.addMethod('regex', function(value, element, regex) {
        let re = new RegExp(regex);
        return re.test(value);
    });

    /*** Valid ***/
    $contactForm.validate({
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
    });
});