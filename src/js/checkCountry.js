

export default function($form, $el) {

        let country = $el.val();
        console.log(country);
        if(country + '' == 'USA') {
            $form.find('#postalWrapper').hide('slide', 600, function() {
                $form.find('#zipWrapper').show('size', 600);
            });


        }
        if(country + '' == 'Canada') {
            $form.find('#zipWrapper').hide('slide', 600, function() {
                $form.find('#postalWrapper').show('size', 600);
            });


        }
}