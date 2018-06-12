function merchantConfig() {
	var merchantConfiguration = {
		minLength: 2,
		source: [
    		{id: "1", name: "Hashtag"},
			{id: "2", name: "Urban Asia Bar & Grill"},
			{id: "3", name: "Joojeh Kebab"}
    	]
    }
    return merchantConfiguration;
}

var suggestions = [];
var cuisines = [];

$(document).ready(function() {
    var timeout;
    $("#recommendations").val(0);

    $('#restaurantName').typeahead(merchantConfig());

    $('#restaurantNameFlag').typeahead(merchantConfig());

    $('#rcmd-restaurantName').typeahead(merchantConfig());

    $('#suggestionNameAdd').typeahead({
    	minLength: 2,
    	source: [
        	{id: "1", name: "suggstion 1"},
   			{id: "2", name: "suggstion 2"},
   			{id: "3", name: "suggstion 3"}
        ]
    });

    $('#suggestionName').typeahead({
    	minLength: 2,
    	source: [
        	{id: "1", name: "suggstion 1"},
   			{id: "2", name: "suggstion 2"},
   			{id: "3", name: "suggstion 3"}
        ],
        updater:function (item) {
        	var sName = $("#suggestion-name-display").html();
        	if (sName == '') {
        		sName = item.name;
        	} else {
        		sName = sName + ', ' + item.name;	
        	}
        	suggestions.push(item.id);      	
        	$("#suggestion-name-display").html(sName);
        	return item;
	    },
	    afterSelect: function(item) {
	    	$("#suggestionName").val('');
	    }
    });

    $('#cuisineNameAdd').typeahead({
    	minLength: 2,
    	source: [
        	{id: "1", name: "cuisine 1"},
   			{id: "2", name: "cuisine 2"},
   			{id: "3", name: "cuisine 3"}
        ]
    });

    $('#cuisineName').typeahead({
    	minLength: 2,
    	source: [
        	{id: "1", name: "cuisine 1"},
   			{id: "2", name: "cuisine 2"},
   			{id: "3", name: "cuisine 3"}
        ],
        updater:function (item) {
        	var cName = $("#cuisine-name-display").html();
        	if (cName == '') {
        		cName = item.name;
        	} else {
        		cName = cName + ', ' + item.name;	
        	}
        	cuisines.push(item.id);      	
        	$("#cuisine-name-display").html(cName);
	        return item;
	    },
	    afterSelect: function(item) {
	    	$("#cuisineName").val('');
	    }
    });

    $('#itemName').typeahead({
    	minLength: 2,
    	autoSelect: true,
    	source: [
        	{id: "1", name: "item 1"},
   			{id: "2", name: "item 2"},
   			{id: "3", name: "item 3"}
        ]
    }); 

    $('#rcmd-itemName').typeahead({
    	minLength: 2,
    	autoSelect: true,
    	source: [
        	{id: "1", name: "item 1"},
   			{id: "2", name: "item 2"},
   			{id: "3", name: "item 3"}
        ]
    }); 

    $('#imageSearch').typeahead({
    	minLength: 2,
    	autoSelect: true,
    	source: [
        	{id: "1", name: "image 1", url: "asd1.com"},
   			{id: "2", name: "image 2", url: "asd2.com"},
   			{id: "3", name: "image 3", url: "asd3.com"}
        ],
        updater:function (item) {
        	$("#imageUrl").val(item.url);
        	$("#thumbnailUrl").val(item.url);
	        return item;
	    }
    });

    $("#imageSearch-add").typeahead({
    	minLength: 2,
    	autoSelect: true,
    	source: [
        	{id: "1", name: "image 1", url: "asd1.com"},
   			{id: "2", name: "image 2", url: "asd2.com"},
   			{id: "3", name: "image 3", url: "asd3.com"}
        ],
        updater:function (item) {
        	$("#image").val(item.url);
        	$("#thumbnail").val(item.url);
	        return item;
	    }
    });
});

function addNewMerchant() {
	var name = $("#nameNew").val().trim();
	var nameId = $("#nameIdNew").val().trim();
	var phone =  $("#phoneNew").val().trim();
	var address = $("#addressNew").val().trim();
	var localityId = $("#localityIdNew").val().trim();
	var typeStr = $("#typeNew").val().trim();
	var averageCost = $("#averageCostNew").val().trim();
	var imageUrl = $("#imageUrlNew").val().trim();
	var thumbnail = $("#thumbnailNew").val().trim();
	if (name == '' || nameId == '' || phone == '' || address == '' || localityId == '' || 
		typeStr == '' || averageCost == '' || imageUrl == '' || thumbnail == '') {
		alert('Incomplete Data. Aborting!');
		return;
	}
	var type = typeStr.split(",").map(function(item) {
	  return item.trim();
	});
	for (var i=0; i<type.length; i++) {
		console.log(type[i]);
	}
	alert('data saved');
}

function addRecommendations() {
	var merchant = $('#rcmd-restaurantName');
	var currentMerchant = merchant.typeahead("getActive");
	var $merchantName = merchant.val();
	var item = $('#rcmd-itemName');
	var currentItem = item.typeahead("getActive");
	var $itemName = item.val();
	var $recommendations = $("#rcmd-recommendations").val();

	if (currentMerchant) {
		if (currentMerchant.name == $merchantName) {
			if (currentItem) {
				if (currentItem.name == $itemName) {
					if ($recommendations == '' || $recommendations <= 0) {
						alertMessage('Recommendations count should be more than 0');
						return;
					}

					alert('adding recommendations');
				} else {
					alert('Please select an item to update');	
				}				
			} else {
				alert('Please select an item to update');	
			}
		} else {
			alert('Please select a restaurant');
		}	
	} else {
		alert('Please select a restaurant');
	}
	return;
}

function addItem() {
	var merchant = $('#restaurantName');
	var currentMerchant = merchant.typeahead("getActive");
	var $merchantName = merchant.val();
	var $merchantId = '';
	var $itemName = '';
	var $vegNonveg = $("input:radio[name ='vegOrNonVeg']:checked").val();
	//var $suggestionId = '';
	//var $suggestionName = '';
	//var $cuisineId = '';
	//var $cuisineName = '';
	var $imageUrl = $("#image").val().trim();
	var $thumbnail = $("#thumbnail").val().trim();
	var $recommendations = 0;
	var $isActive = ($("#isActive:checked").val() == 'true') ? true : false;

	if ($("#recommendations").val() == '' || $("#recommendations").val() < 0) {
		alertMessage('Incorrect recommendations count');
		return;
	}	
	$recommendations = $("#recommendations").val();

	// var currentCuisine = $('#cuisineName').typeahead("getActive");
	// if (currentCuisine != undefined && currentCuisine.name == $('#cuisineName').val()) {
	// 	$cuisineId = currentCuisine.id;
	// 	$cuisineName = currentCuisine.name;
	// }

	// var currentSuggestion = $('#suggestionName').typeahead("getActive");
	// if (currentSuggestion != undefined && currentSuggestion.name == $('#suggestionName').val()) {
	// 	$suggestionId = currentSuggestion.id;
	// 	$suggestionName = currentSuggestion.name;
	// }

	if (currentMerchant) {
		if (currentMerchant.name == $merchantName) {
			if ($vegNonveg === undefined) {
				alertMessage('Please select Veg or Non veg Type');
				return;
			}

			$merchantId = currentMerchant.id;
			var itemName = $('#itemName');
			$itemName = itemName.val();
			var currentItem = itemName.typeahead("getActive");
			if ($itemName === '') {
				alertMessage('Enter an item name');
				return;
			}
			if ($imageUrl == '') {
				alertMessage('Please enter item image url');
				return;
			}

			if ($thumbnail == '') {
				alertMessage('Please enter item thumbnail url');
				return;
			}
			if (!currentItem || (currentItem && currentItem.name != $itemName)) {
				var input = confirm('Confirm Action \nName                              : '+$itemName+'\nRestaurant                      : '+$merchantName+'\nSuggestions               : '+suggestions+'\nCuisines                     : '+cuisines+'\nRecommendation Count : '+$recommendations+'\nImage Url                         : '+$imageUrl+'\nThumbnail                        : '+$thumbnail+'\nIs Active                           : '+$isActive);
				if (input == true) {
					var dataOb = {
							name : $itemName,
							merchantId : $merchantId,
							cuisineIds : cuisines,
							suggestionIds : suggestions,
							imageUrl : $imageUrl,
							thumbnail : $thumbnail,
							isActive : $isActive,
							recommendations : $recommendations
			    	};
			    	console.log(cuisines);
			    	console.log(suggestions);
			        alertMessage($itemName + ' successfully added');
			        cuisines = [];
			        suggestions = [];
					$("#itemName").val('');
					$('input[name="vegOrNonVeg"]').prop('checked', false);
					$("#recommendations").val(0);
					$("#cuisine-name-display").html('');
					$("#cuisineName").val('');
					$("#suggestion-name-display").html('');
					$("#suggestionName").val('');
					$("#image").val('');
					$("#thumbnail").val('');
					$('#suggestionName').typeahead('destroy');
					$('#cuisineName').typeahead('destroy');				
				} else {
					return;
				}
			} else {
				alertMessage('Item already added');
			}
		} else {
			alertMessage('Restaurant not selected');
		}		
	} else {
		alertMessage('Restaurant not selected');
	}
}

function addCuisine() {
	var cuisine = $('#cuisineNameAdd');
	var $cuisineName = cuisine.val();
	var current = cuisine.typeahead("getActive");
	if ($cuisineName === '') {
		alertMessage('Enter a cuisine name');
		return;
	}	

	if (!current || (current && current.name != $cuisineName)) {
		alertMessage('not equal');
	} else {
		alertMessage('Cuisine already exists');
	}
}

function addSuggestion() {
	var suggestion = $('#suggestionNameAdd');
	var $suggestionName = suggestion.val();
	var current = suggestion.typeahead("getActive");
	if ($suggestionName === '') {
		alertMessage('Enter a suggestion name');
		return;
	}	

	if (!current || (current && current.name != $suggestionName)) {
		alertMessage('not equal');
	} else {
		alertMessage('Suggestion name already exists');
	}
}

function alertMessage(message) {
	alert(message);
}
