import countryTest from './checkCountry';
import validateRules from './validateRules';

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
    $contactForm.validate(validateRules);


    $contactForm.on('submit', function(event) {
        event.preventDefault();
        $.ajax({
            url: '/addUser',
            type: 'POST',
            data: $(this).serialize(),
            success: function(data) {
                console.log('got the data into express!');
                $contactForm.trigger('reset');
            },
            error: function() {
                console.log('still got an error');
            }

        });

    })
});