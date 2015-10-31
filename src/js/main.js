import countryTest   from './checkCountry';
import scroll        from './scroll';

$(document).ready(function() {
    let $contactForm = $('#contact-info'),
        $name = $contactForm.find('#name'),
        $email = $contactForm.find('#email'),
        $street = $contactForm.find('#address'),
        $country = $contactForm.find('#country'),
        $province = $contactForm.find('#province'),
        $state = $contactForm.find('#state');


    /*** smooth scrolling ***/
    $('a').click(function() {
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 1000);
        return false;
    });

    /*** update form based on country selection ***/
    $country.on('change', function() {
        countryTest($contactForm, $(this))
    });

    /*** New Validations ***/
    $.validator.addMethod('regex', function(value, element, regex) {
        let re = new RegExp(regex);
        return re.test(value);
    });

    /*** Valid fields and submit ***/
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
            "postalCode": {
                regex: /^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ]( )?\d[ABCEGHJKLMNPRSTVWXYZ]\d$/i
            },
            "zipCode": {
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
            "postalCode": {
                regex: "Need a valid Postal Code eh!"
            },
            "zipCode": {
                regex: "Going to need a valid Zip code."
            }
        },
        submitHandler: function(form) {
            $.ajax({
                url: '/addUser',
                type: 'POST',
                data: $(form).serialize(),
                success: function(data) {
                    console.log('got the data into express!');
                    $contactForm.trigger('reset');
                },
                error: function() {
                    console.log('still got an error');
                }

            });
        }
    });


});

