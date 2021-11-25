$(document).ready(function() {
    $('.cancel-button').click(function() {
        var id = $(this).parent().parent().parent().parent().parent().attr('id')
        var string = '#' + id;
        $(string).remove();

        $.ajax({
            type: "POST",
            url: "/cancelOrder/?id=" + id,
        }).done(function(data) {

        }).fail(function() {
            alert("Sorry. Server unavailable.");
        });

        return false;
    })
})