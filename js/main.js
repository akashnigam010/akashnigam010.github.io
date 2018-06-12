var accessToken = '';
var isMobile = false;
var isLoggedIn = false;
$(document).ready(function() {
	accessToken = $('#accessToken').val();
	isMobile = window.matchMedia("only screen and (max-width: 480px)").matches;
    window.onresize = function(event) {
        isMobile = window.matchMedia("only screen and (max-width: 480px)").matches;
        // $('#search-field').on('touchstart', function (e) {
        //     // do not use 'click'; it fires 2 events - mouseup and mousedown/touchstart and touchend
        //     var minusHeight = $(".search-box-wrapper").height()+15;
        //     $("html, body").animate({ scrollTop: ($('.home-banner').height()-minusHeight) }, 300);    
        // });
    };

    $('.downloadPlayStoreBtn').on('mouseup', function (e) {
        window.location = "https://play.google.com/store/apps/details?id=in.bananaa&hl=en";
    });
    
    $('#login-button').on('mouseup', function (e) {
    	if (isLoggedIn == false) {
    		console.log('user not logged in');
            //$("#loginModal").find(".loader").removeClass('hide');
            //$("#loginModal").find(".modal-body").addClass('hide');
    		$('#login-dropdown').addClass('hide');
    		$('#loginModal').modal('show');
    	} else {
    		$('#login-dropdown').removeClass('hide');
    		console.log('user already logged in, not opening modal');
    	} 	
    });

    $('#memeButton').on('mouseup', function (e) {
        $('#memeModal').modal('show');
    });
    
    function repositionModal() {
        var modal = $(this),
            dialog = modal.find('.modal-dialog');
        modal.css('display', 'block');
        dialog.css("margin-top", Math.max(0, ($(window).height() - dialog.height()) / 4));
    }
    $('.modal').on('show.bs.modal', repositionModal);
    
    $(window).on('resize', function() {
        $('.modal:visible').each(repositionModal);
    });

    $('.modal').on('show.bs.modal', function(e) {
        window.location.hash = "modal";
    });
    $('.modal').on('hidden.bs.modal', function(e) {
        if(window.location.hash == "#modal") {
            window.history.back();
        }
    });
    $(window).on('hashchange', function (event) {
        if(window.location.hash != "#modal") {
            $('.modal').modal('hide');
        }
    });
    
    $('[data-toggle="popover"]').popover();
});

function manualLogin() {
    var email = $("#m_email").val(),
    password = $("#m_password").val();

    if (!validateEmail(email)) {
        addError('Please check your email');
    } else if (!password) {
        addError('Please enter a password');
    } else {
        addSuccess('Logged in successfully');
    }
}

function register() {
    var name = $("#r_name").val(),
    email = $("#r_email").val(),
    password = $("#r_password").val();

    if (!name) {
        addError('Please enter your name');
    } else if (!validateEmail(email)) {
        addError('Please check your email');
    } else if (!password) {
        addError('Please enter a password');
    } else {
        addSuccess('Successfully Registered');
        // $.ajax({
        //  method : "GET",
        //  url : "/socyal/login/logout",
        //  contentType : "application/json"
        // }).done(function(response) {
        //  location.reload();
        // });
    }
}

function forgotPassword() {
    var email = $("#f_email").val();
    if (!validateEmail(email)) {
        addError('Please check your email');
    } else {
        addSuccess('Please check your email for password');
    }
}

function subscribe() {
    var email = $("#subscribeMail").val();
    if (!validateEmail(email)) {
        $("#subscriptionError").html("Please check your email");
        $("#subscriptionError").attr('style', 'color: red;')
        $("#subscriptionError").removeClass('hide');
    } else {
        $("#subscriptionError").html("Thank you!");
        $("#subscriptionError").attr('style', 'color: green;')
        $("#subscriptionError").removeClass('hide');
    }
}

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function addError(msg) {
    $(".login-title").addClass('hide');
    $(".login-success").addClass('hide');
    $(".login-error").html(msg);
    $(".login-error").removeClass('hide');
}

function addSuccess(msg) {
    $(".login-title").addClass('hide');
    $(".login-error").addClass('hide');
    $(".login-success").html(msg);
    $(".login-success").removeClass('hide');
}