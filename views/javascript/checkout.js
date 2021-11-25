$(document).ready(function(){
    $.get('/isSession', null, function(res){
        if(res){
            $("#userPoints").prop('hidden', false);
        }
        else{
            $("#userPoints").prop('hidden', true);
        }
    })
    function isFilled() {
        var firstname = validator.trim($("#firstname").val());
        var lastname = validator.trim($("#lastname").val());
        var email = validator.trim($('#email').val());
        var phonenumber = validator.trim($("#phonenumber").val());
        var postalcode = validator.trim($("#postalcode").val());
        var province = validator.trim($("#province").val());
        var city = validator.trim($("#city").val());
        var barangay = validator.trim($("#barangay").val());
        var street = validator.trim($("#street").val());

        var firstnameEmpty = validator.isEmpty(firstname);
        var lastnameEmpty = validator.isEmpty(lastname);
        var emailEmpty = validator.isEmpty(email);
        var phonenumberEmpty = validator.isEmpty(phonenumber);
        var postalcodeEmpty = validator.isEmpty(postalcode);
        var provinceEmpty = validator.isEmpty(province);
        var cityEmpty = validator.isEmpty(city);
        var barangayEmpty = validator.isEmpty(barangay);
        var streetEmpty = validator.isEmpty(street);

        return !firstnameEmpty && !lastnameEmpty && !emailEmpty && !phonenumberEmpty && !postalcodeEmpty && !provinceEmpty && !cityEmpty && !barangayEmpty && !streetEmpty
    }

    function isValidEmail(field, callback) {
        return isValidEmail;
    }

    function validateField(field){
        var value = validator.trim(field.val());
        var empty = validator.isEmpty(value);

        if(empty) {
            field.removeClass('is-valid');
            field.addClass('is-invalid');
        }
        else {
            field.removeClass('is-invalid');
            field.addClass('is-valid');
        }

        var filled = isFilled();

        var email = validator.trim($('#email').val());
        var isValidEmail = validator.isEmail(email);

        if(filled && isValidEmail) {
            $("#checkout").prop('disabled', false);
        }
        else {
            $("#checkout").prop('disabled', true);
        }
    }

    $('#firstname').keyup(function () {
        validateField($('#firstname'));
    });
    $('#lastname').keyup(function () {
        validateField($('#lastname'));
    });
    $('#email').keyup(function () {
        validateField($('#email'));
        var email = validator.trim($('#email').val());
        var isValidEmail = validator.isEmail(email);
        if(isValidEmail){
            $('#email').removeClass('is-invalid');
            $('#email').addClass('is-valid');
        }
        else{
            $('#email').removeClass('is-valid');
            $('#email').addClass('is-invalid');
        }
    });
    $('#phonenumber').keyup(function () {
        validateField($('#phonenumber'));
    });
    $('#postalcode').keyup(function () {
        validateField($('#postalcode'));
    });
    $('#province').keyup(function () {
        validateField($('#province'));
    });
    $('#city').keyup(function () {
        validateField($('#city'));
    });
    $('#barangay').keyup(function () {
        validateField($('#barangay'));
    });
    $('#street').keyup(function () {
        validateField($('#street'));
    });

    $('#points').on('input', function() {
        var input = parseFloat($(this).val())
        var max = parseFloat($(this).attr('max'))
        
        if(input > max) {
            $(this).val(max)
        }
        if(input < 0) {
            $(this).val(0)
        }
    })
})