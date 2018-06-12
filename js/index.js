$(document).ready(function() {
    if (isMobile) {
        $('#search-field, #search-location').on('mousedown', function (e) {
            $('html, body').animate({
                scrollTop: $("#search-field").offset().top - 65
            }, 200);
        });

        $('#search-field-add, #search-location-add').on('mousedown', function (e) {
            $('html, body').animate({
                scrollTop: $("#search-field-add").offset().top - 65
            }, 200);
        });
    }

    var timeout;
    $('#search-field').typeahead({
        minLength: 2,
        autoSelect: false,
        fitToElement: true,
        matcher: function(merchant) {
            if (merchant.name.toLowerCase().includes(this.query.trim().toLowerCase())) {
                return true;
            } else {
                this.query = 'No match found';
                return false;
            }
        },
        displayText: function(merchant) {
              return '<div style="padding: 1%;"><span class="bold">' + 
                        merchant.name + 
                        '</span> <br /><span class="font-0-8">' +
                        merchant.shortAddress + 
                        '</span></div>';
        },
        afterSelect: function(merchant) {
            if (merchant.id != -999) {
                $('#search-field').val(merchant.name);
            } else {
                $('#search-field').val('');
            }
        },
        source: [
            {id: "1", name: "Hashtag", shortAddress: "Hitech City, Hyderabad"},
            {id: "2", name: "Urban Asia Bar & Grill", shortAddress: "Jubilee Hills, Hyderabad"},
            {id: "3", name: "Rayalaseema Ruchulu", shortAddress: "Jubilee Hills, Hyderabad"},
            {id: "-999", name: "No match found", shortAddress: ""}
        ],
        updater:function (merchant) {
            if (merchant.id != -999) {
                window.location.href = "/" + merchant.merchantUrl;
            }
            return merchant;
        }
    });

    var isLocationUpdated = false;
    var defaultSelected = $('#search-location').val();
    $('#search-location').typeahead({
        //minLength: 0,
        //autoSelect: true,
        fitToElement: true,
        showHintOnFocus: "all",
        items: 4,
        displayText: function(location) {
              return '<div style="padding: 2%; font-size: 0.9em;"><span>' + 
                        location.name + 
                        '</span></div>';
        },
        afterSelect: function(location) {
            $('#search-location').val(location.name);
        },
        source: [
            {id: "1", isCity: true, cityId: null, name: "All of Hyderabad"},
            {id: "2", isCity: false, cityId: 1,  name: "Hitech City"},
            {id: "3", isCity: false, cityId: 1,  name: "Jubilee Hills"},
            {id: "4", isCity: false, cityId: 1,  name: "Banjara Hills"},
            {id: "5", isCity: false, cityId: 1,  name: "Gachibowli"},
            {id: "6", isCity: false, cityId: 1,  name: "Kondapur"}
        ],
        updater: function(location) {
            isLocationUpdated = true;
            defaultSelected = location.name;
            console.log('Location changed');
            return location;
        }
    });

    $('#search-location').on('mousedown', function() {
        $('#search-location').val('');
        $('#search-location').typeahead('lookup');
    });

    $('#search-location').on('focusout', function() {
        if (!isLocationUpdated) {
            $('#search-location').val(defaultSelected);
            isLocationUpdated = false;
        }
    });

    $("#search-field, #search-field-add").keypress(function(e) {
        if(e.which == 10 || e.which == 13) {
            e.preventDefault();
            homeSearch(this.value);
        }
    });

    $('.trending-wrapper').flickity(getFlickityOptions());
    $('.diary-wrapper').flickity(getFlickityOptions());

});

function clickSearchHome() {
    homeSearch($("#search-field").val());
}

function clickSearchAddHome() {
    homeSearch($("#search-field-add").val());
}

function homeSearch(searchString) {
    if (searchString == '') {
        searchString = 'all';
    }
    var urlWithParams = window.location.href;
    var urlWithOutParams = urlWithParams.split('?')[0];
    var urlWithOutHash = urlWithOutParams.split('#')[0];
    window.location = urlWithOutHash+'?search='+searchString;
}

function getFlickityOptions() {
    var options = {
        cellAlign: 'left',
        contain: true,
        freeScroll: true,
        pageDots: false,
        prevNextButtons: true
    };
    if (isMobile) {
        options.prevNextButtons = false;
    }
    return options;
}

function toggleLoadingAnimation() {
    if ($("#search-field").hasClass('loading')) {
        $("#search-field").removeClass('loading');
        $("#search-field").addClass('noloading');
    } else {
        $("#search-field").addClass('loading');
        $("#search-field").removeClass('noloading');
    }
}