

export default function($form, $el) {

        let country = $el.val();
        console.log(country);
        if(country + '' == 'USA') {
            $form.find('#postalWrapper').hide('slide', 600, function() {
                $(this).find('#postal-code, #province').prop('disabled', true);
                $form.find('#zipWrapper').show('size', 600, function() {
                    $(this).find('#zip-code, #state').prop('disabled', false);
                });
            });


        }
        if(country + '' == 'Canada') {
            $form.find('#zipWrapper').hide('slide', 600, function() {
                $(this).find('#zip-code, #state').prop('disabled', true);
                $form.find('#postalWrapper').show('size', 600, function() {
                    $(this).find('#postal-code, #province').prop('disabled', false);
                });
            });


        }
}