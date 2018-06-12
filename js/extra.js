function submitMessage() {
    $name = $("#name").val();
    $phone = $("#phone").val();
    $email = $("#email").val();
    $message = $("#message").val();

    if ($name == '') {
        $(".error-label-name").removeClass('hide');
        return;
    } else {
        $(".error-label-name").addClass('hide');
    }

    if ($email == '') {
        $(".error-label-email").removeClass('hide');
        return;
    } else {
        $(".error-label-email").addClass('hide');
    }

    if ($message == '') {
        $(".error-label-message").removeClass('hide');
        return;
    } else {
        $(".error-label-message").addClass('hide');
    }

    $("#loadingModal").modal('show');
    
}