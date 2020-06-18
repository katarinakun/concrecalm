$(function() {
	$("document").ready(function() {
		// The tags we will be looking for
		var categoryTags = ["interest", "research", "personal", "social", "inventory"];
		var interestTags = ["company", "ticker", "sector", "currency", "region"];
		var researchTags = ["report", "analyst", "notes", "ideas"];
		var personalTags = ["spouse", "wife", "husband", "son", "daughter", "birthday", "anniversary", "school", "college", "university"];
		var inventoryTags = ["software", "hardware", "OMS", "EMS", "SOR", "algos", "network", "routing network"];

		// State variable to keep track of which category we are in
		tagState = categoryTags;

		// Helper functions
		function split(val) {
			return val.split( /,\s*/ );
		}

		function extractLast(term) {
			return split(term).pop();
		}


		$("#tags")

		// Create the autocomplete box
		.autocomplete({
			minLength : 0,
			autoFocus : true,
            source : function(request, response) {
                // Use only the last entry from the textarea (exclude previous matches)
                lastEntry = extractLast(request.term);

				var filteredArray = $.map(tagState, function(item) {
					if (item.indexOf(lastEntry) === 0) {
						return item;
					} else {
						return null;
					}
				});
               
				// delegate back to autocomplete, but extract the last term
				response($.ui.autocomplete.filter(filteredArray, lastEntry));
			},
			focus : function() {
				// prevent value inserted on focus
				return false;
			},
			select : function(event, ui) {
				var terms = split(this.value);
				// remove the current input
				terms.pop();
				// add the selected item
				terms.push(ui.item.value);
				// add placeholder to get the comma-and-space at the end
				terms.push("");
				this.value = terms.join(", ");
				return false;
			}
		}).on("keydown", function(event) {
			// don't navigate away from the field on tab when selecting an item
			if (event.keyCode === $.ui.keyCode.TAB /** && $(this).data("ui-autocomplete").menu.active **/) {
				event.preventDefault();
				return;
			}

			// Code to position and move the selection box as the user types
			var newY = $(this).textareaHelper('caretPos').top + (parseInt($(this).css('font-size'), 10) * 1.5);
			var newX = $(this).textareaHelper('caretPos').left;
			var posString = "left+" + newX + "px top+" + newY + "px";
			$(this).autocomplete("option", "position", {
				my : "left top",
				at : posString
			});
		});
	});
});