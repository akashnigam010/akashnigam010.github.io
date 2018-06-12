var data = {
	12 : {
		id: 12,
		name: 'Muttor Paneer',
		vegnonveg: 1,
		suggestions: [{
			id: 1,
			name: 'Paneer'
		}, {
			id: 2,
			name: 'Chicken'
		}],
		cuisines: [{
			id: 1,
			name: 'Italian'
		},{
			id: 2,
			name: 'Punjabi'
		}],
		thumbnail: 'https://bna-s3.s3.amazonaws.com/item-img/sandwich.png',
		image: 'https://bna-s3.s3.amazonaws.com/item-img/t/sandwich.png'
	},
	14 : {
		id: 14,
		name: 'Butter Chicken',
		vegnonveg: 3,
		suggestions: [{
			id: 4,
			name: 'Butter'
		}, {
			id: 2,
			name: 'Chicken'
		}],
		cuisines: [{
			id: 2,
			name: 'Punjabi'
		}],
		thumbnail: 'https://bna-s3.s3.amazonaws.com/item-img/sandwich.png',
		image: 'https://bna-s3.s3.amazonaws.com/item-img/t/sandwich.png'
	}
};
var dishes = {};
var editDish = {};
var editDishCopy = {};
var selectRestaurantId = '';

$(document).ready(function() {
	$('#restaurantNameModal').typeahead({
    	minLength: 2,
    	autoSelect: true,
    	source: [
    		{id: "1", name: "Hashtag"},
			{id: "2", name: "Urban Asia Bar & Grill"},
			{id: "3", name: "Joojeh Kebab"}
    	],
        updater:function (restaurant) {
        	selectRestaurantId = restaurant.id;
        	loadDishes(restaurant.id);
	    	return restaurant;
	    }
    });

	$('#suggestionNameModal').typeahead({
		minLength: 2,
		source: [
	    	{id: "1", name: "suggstion 1"},
			{id: "2", name: "suggstion 2"},
			{id: "3", name: "suggstion 3"}
	    ],
	    updater:function (item) {
	    	var sName = $("#suggestion-name-display-modal").html();
	    	if (sName == '') {
	    		sName = item.name;
	    	} else {
	    		sName = sName + ', ' + item.name;	
	    	}
	    	editDishCopy.suggestions.push({
	    		id: item.id,
	    		name: item.name
	    	});      	
	    	editDishCopy.suggestionsHtml = sName;
	    	$("#suggestion-name-display-modal").html(sName);
	    	return item;
	    },
	    afterSelect: function(item) {
	    	$("#suggestionNameModal").val('');
	    }
	});

	$('#cuisineNameModal').typeahead({
		minLength: 2,
		source: [
	    	{id: "1", name: "cuisine 1"},
			{id: "2", name: "cuisine 2"},
			{id: "3", name: "cuisine 3"}
	    ],
	    updater:function (item) {
	    	var cName = $("#cuisine-name-display-modal").html();
	    	if (cName == '') {
	    		cName = item.name;
	    	} else {
	    		cName = cName + ', ' + item.name;	
	    	}
	    	editDishCopy.cuisines.push({
	    		id: item.id,
	    		name: item.name
	    	});
	    	editDishCopy.cuisinesHtml = cName;     	
	    	$("#cuisine-name-display-modal").html(cName);
	        return item;
	    },
	    afterSelect: function(item) {
	    	$("#cuisineNameModal").val('');
	    }
	});
});

function loadDishes(merchantId) {
	// make the service call with merchant id and load all dishes to grid
	dishes = data;
	var gridBodyHtml = '';
	for (id in dishes) {
		gridBodyHtml += '<tr class="cursor-pointer" id="'+id+'">'+
								'<td onclick="editRow(this);">'+id+'</td>'+
								'<td onclick="editRow(this);">'+dishes[id].name+'</td>'+
								'<td>'+getVegnonveg(dishes[id].vegnonveg, id)+'</td>'+
								'<td onclick="editRow(this);">'+getTags(dishes[id].suggestions)+'</td>'+
								'<td onclick="editRow(this);">'+getTags(dishes[id].cuisines)+'</td>'+
								'<td><button class="bna-button-light font-1-3" style="margin:0; padding: 0; background-color: transparent;"'+
								' onclick="deleteItem('+id+');">&#10006;</button></td>'+
								'</tr>';
	}
	$(".grid-body").html(gridBodyHtml);
}

function refreshList() {
	if (selectRestaurantId != '') {
		loadDishes(selectRestaurantId);		  
	} else {
		alert('Please select a restaurant');
	}
	return;
}

function getVegnonveg(vegnonveg, id) {
	var radio1 = '<input class="no-margin" type="radio" name="vegOrNonVeg'+id+'" value="1"></input>';
	var radio2 = '<input class="no-margin" type="radio" name="vegOrNonVeg'+id+'" value="2"></input>';
	var radio3 = '<input class="no-margin" type="radio" name="vegOrNonVeg'+id+'" value="3"></input>';
	if (vegnonveg == 1) {
		radio1 = '<input class="no-margin" type="radio" name="vegOrNonVeg'+id+'" value="1" checked="checked"></input>';
	} else if (vegnonveg == 2) {
		radio2 = '<input class="no-margin" type="radio" name="vegOrNonVeg'+id+'" value="2" checked="checked"></input>';
	} else if (vegnonveg == 3) {
		radio3 = '<input class="no-margin" type="radio" name="vegOrNonVeg'+id+'" value="3" checked="checked"></input>';
	}
	
	return '<div>'+
              '<div class="radio-inline">'+
                radio1+
              '</div>'+
              '<div class="radio-inline">'+
                radio2+
              '</div>'+
              '<div class="radio-inline">'+
                radio3+
              '</div>'+
            '</div>';
}

function saveVegNonvegValues() {
	var input = confirm("Are you sure you want to bulk update ?? This is a costly process!!");
	if(input) {
		for (id in dishes) {
		console.log($('input[name=vegOrNonVeg'+id+']:checked').val());	
	}
	}
	return;
}

function deleteItem(id) {
	var input = confirm('Are you sure to delete Item Id : ' + id);
	if (input == true) {
		alert('deleted');
	} else{ 
		return;
	}
}

function getTags(tags) {
	var tagHtml = '';
	for (var i=0; i<tags.length; i++) {
		if (i == tags.length-1) {
			tagHtml += tags[i].name;
		} else {
			tagHtml += tags[i].name + ', ';
		}		
	}
	return tagHtml;
}

function editRow(child) {
	var row = $(child).closest('tr').attr('id');
	editDish = dishes[row];
	// create deep copy of dish being edited
	editDishCopy = jQuery.extend(true, {}, editDish);
	editDishCopy.suggestionsHtml = getTags(editDishCopy.suggestions);
	editDishCopy.cuisinesHtml = getTags(editDishCopy.cuisines);
	setModalValues(editDishCopy);
	$('#editModal').modal('show');
}

function setModalValues(dish) {
	$("#itemNameModal").val(dish.name);
	$("#suggestion-name-display-modal").html(dish.suggestionsHtml);
	$("#cuisine-name-display-modal").html(dish.cuisinesHtml);
	$("#imageModal").val(dish.image);
	$("#thumbnailModal").val(dish.thumbnail);
}

function resetModalSuggestions() {
	editDishCopy.suggestions = [];
	editDishCopy.suggestionsHtml = '';
	$("#suggestion-name-display-modal").html(editDishCopy.suggestionsHtml);
}

function resetModalCuisines() {
	editDishCopy.cuisines = [];
	editDishCopy.cuisinesHtml = '';
	$("#cuisine-name-display-modal").html(editDishCopy.cuisinesHtml);
}

function updateDish() {
	editDishCopy.name = $("#itemNameModal").val();
	editDishCopy.image = $("#imageModal").val();
	editDishCopy.thumbnail = $("#thumbnailModal").val();
	if (isDishEdited()) {
		//service call to update dish details
		//update row with new details
		var newDishTdHtml = 	'<td>'+editDishCopy.id+'</td>'+
							'<td>'+editDishCopy.name+'</td>'+
							'<td>'+getTags(editDishCopy.suggestions)+'</td>'+
							'<td>'+getTags(editDishCopy.cuisines)+'</td>'+
							'<td><button class="bna-button-light font-1-3" style="margin:0; padding: 0; background-color: transparent;"'+
							' onclick="deleteItem('+editDishCopy.id+');">&#10006;</button></td>';
		$('#'+editDishCopy.id+'').html(newDishTdHtml);
		//update original data structure with new details
		data[editDishCopy.id] = editDishCopy;
		$('#editModal').modal('hide');
	} else {
		$('#editModal').modal('hide');
	}
}

function isDishEdited() {
	if (editDishCopy.name != editDish.name || 
		isTagEdited(editDishCopy.suggestions, editDish.suggestions) || 
		isTagEdited(editDishCopy.cuisines, editDish.cuisines) || 
		editDishCopy.thumbnail != editDish.thumbnail || 
		editDishCopy.image != editDish.image) {
		return true;
	} else {
		return false;
	}
}

function isTagEdited(tagsCopy, tags) {
	if (tagsCopy.length != tags.length) {
		return true;
	} else {
		var tagIds = [];
		var tagCopyIds = [];
		for (var i=0; i<tagsCopy.length; i++) {
			tagIds[i] = tags[i].id;
			tagCopyIds[i] = tagsCopy[i].id;
		}
		if(_.isEqual(_.sortBy(tagIds), _.sortBy(tagCopyIds))) {
			return false;
		} else{
			return true;
		}
	}	
}