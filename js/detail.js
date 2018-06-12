var rcmdOb = {};
$(document).ready(function() {
    
    var primaryImage = $("#primaryImageTemp").html();
    var background = "url("+primaryImage+")";
    $(".primary-image-banner").css("background", background);
    $(".primary-image-banner").css("background-repeat", "no-repeat");
    $(".primary-image-banner").css("background-position", "center");
    $(".primary-image-banner").css("background-size", "cover");

    $('.modal').on('hidden.bs.modal', function(e) {
    	if(window.location.hash == "#modal") {
            window.history.back();
        }    	
    });

    $('#modalSearchInput').typeahead({
        minLength: 2,
        source: [
            {id: "1", name: "Hashtag"},
            {id: "2", name: "Urban Asia Bar & Grill"},
            {id: "3", name: "Joojeh Kebab"}
        ]
    });

    $('#topSearchInput').typeahead({
        minLength: 2,
        fitToElement: true,
        source: [
            {id: "1", name: "Hashtag"},
            {id: "2", name: "Urban Asia Bar & Grill"},
            {id: "3", name: "Joojeh Kebab"}
        ]
    });
});

function imageView() {
    var primaryImage = $("#primaryImageTemp").html();
    var primaryDetail = $(".primary-detail").html();
    var secondaryDetail = $(".secondary-detail").html();
    $("#imageViewModal").find('.detail-image').attr('src', primaryImage);
    $("#imageViewModal").find('.primary-detail').html(primaryDetail);
    $("#imageViewModal").find('.secondary-detail').html(secondaryDetail);
    $("#imageViewModal").modal('show');
}

function loadPopularDishes() {
	$('#loadMoreModal').modal('show');
}

function openSearchModal() {
    $('#searchModal').modal('show');
}

// function goBackModal() {
// 	alert('modal closed');
// 	window.history.back();
// }