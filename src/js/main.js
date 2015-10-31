import countryTest   from './checkCountry';
import validateRules from './validateRules';
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

    /*** Valid fields ***/
    $contactForm.validate(validateRules);


    /*** form submission ***/
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

