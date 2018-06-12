var oneRestaurantToRate = {};
var restaurantToRateIds = [];
$(document).ready(function() {
	$('#restaurantNameRating').typeahead({
    	minLength: 2,
    	autoSelect: true,
    	source: [
    		{id: "1", name: "Hashtag"},
			{id: "2", name: "Urban Asia Bar & Grill"},
			{id: "3", name: "Joojeh Kebab"}
    	],
        updater:function (restaurant) {
        	$("#ratingRestId").html(restaurant.id);
        	$("#ratingRestName").html(restaurant.name);
        	$(".rateRest").removeClass('hide');
        	oneRestaurantToRate = {
        		id: restaurant.id,
        		name: restaurant.name
        	};
	    	return restaurant;
	    }
    });
});

function rateARestaurants() {
	console.log('about to rate id ' + oneRestaurantToRate.name);
}

function rateManyRestaurants() {
	var idTxt = $("#restIdsRating").val().trim().replace(/\s/g,'');
	if (idTxt === '') {
		alert('Please enter comma seperated restaurant ids');
		return;
	}
	restaurantToRateIds = _.uniq(idTxt.split(','));
	console.log('about to rate id ' + restaurantToRateIds.length);
}