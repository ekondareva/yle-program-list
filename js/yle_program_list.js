(function($) {
/**
 * Performs a cached and delayed search.
   Overridden version of core autocomplete.js;
   Autocomplete event is fired after min 2 symbols
 */
Drupal.ACDB.prototype.search = function (searchString) {
  var min_length = 1; 
  var db = this;
  this.searchString = searchString;

  // See if this string needs to be searched for anyway. The pattern ../ is
  // stripped since it may be misinterpreted by the browser.
  searchString = searchString.replace(/^\s+|\.{2,}\/|\s+$/g, '');
  // Skip empty search strings, or search strings ending with a comma, since
  // that is the separator between search terms.
  if (searchString.length <= min_length ||
    searchString.charAt(searchString.length - 1) == ',') {
    return;
  }

  // See if this key has been searched for before.
  if (this.cache[searchString]) {
    return this.owner.found(this.cache[searchString]);
  }

  // Initiate delayed search.
  if (this.timer) {
    clearTimeout(this.timer);
  }
  this.timer = setTimeout(function () {
    db.owner.setStatus('begin');

    // Ajax GET request for autocompletion. We use Drupal.encodePath instead of
    // encodeURIComponent to allow autocomplete search terms to contain slashes.
    $.ajax({
      type: 'GET',
      url: db.uri + '/' + Drupal.encodePath(searchString),
      dataType: 'json',
      success: function (matches) {
        if (typeof matches.status == 'undefined' || matches.status != 0) {
          db.cache[searchString] = matches;
          // Verify if these are still the matches the user wants to see.
          if (db.searchString == searchString) {
            db.owner.found(matches);
          }
          db.owner.setStatus('found');
        }
      },
      error: function (xmlhttp) {
        Drupal.displayAjaxError(Drupal.ajaxError(xmlhttp, db.uri));
      }
    });
  }, this.delay);
};

/**
 * Fills the suggestion popup with any matches received.
 */
Drupal.jsAC.prototype.found = function (matches) {
  // If no value in the textfield, do not show the popup.
  if (!this.input.value.length) {
    return false;
  }
  var items = this.input.value.split(',');
  items.pop();
  var content = items.join(',');
  if (content.length > 0) {
    content += ', ';
  }
 
  // Prepare matches.
  var ul = $('<ul></ul>');
  var ac = this;
  var mediaTypeClass = 'media-type-video';
  for (key in matches) {
  	if (matches[key].mediaType == 'Audio') {
  	  mediaTypeClass = 'media-type-audio';
  	}

    var result_item = 
      '<div>' +
      '<span class="media-type '+ mediaTypeClass + '" />' +
      '<span>'+ matches[key].title +'</span>'+
      '</div>';
      	
    $('<li title="'+matches[key].description+'"></li>')
      .append($(result_item))
      .mousedown(function () { ac.hidePopup(this); })
      .mouseover(function () { ac.highlight(this); })
      .mouseout(function () { ac.unhighlight(this); })
      .data('autocompleteValue', content + matches[key].title)
      .appendTo(ul);
  }

  // Show popup with matches, if any.
  if (this.popup) {
    if (ul.children().length) {
      $(this.popup).empty().append(ul).show();
      $(this.ariaLive).html(Drupal.t('Autocomplete popup'));
    }
    else {
      $(this.popup).css({ visibility: 'hidden' });
      this.hidePopup();
    }
  }
};

})(jQuery);
