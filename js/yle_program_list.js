(function($) {
/**
 * Enhanced version of jQuery autocomplete widget;
   Autocomplete event is fired after min 2 characters.
 */
  
  Drupal.behaviors.ypl = {
    attach: function(context, settings) {
      $("input.ypl-autocomplete", context)
        .each(function (){
          $(this).createYplAutocomplete();
        });
    } // attach
  };//behavior
  
  $.widget( "ypl.yplautocomplete", $.ui.autocomplete, {
    _renderItem: function(ul, item) {
  	  
  	  var result_item = 
        '<a>' +
        '<span class="media-type media-type-'+ item.mediaType + '" />' +
        '<span>'+ item.title +'</span>'+
        '</a>';
      
      return $('<li title="'+ item.description + '"></li>')
        .data("item.autocomplete", item)
        .append($(result_item))
        .appendTo(ul);
    },
    
    _resizeMenu: function() {
      var ul = this.menu.element;
      ul.outerWidth(Math.max(
        ul.width("").outerWidth() + 2,
        this.element.outerWidth()
      ));
    }
   
  });  
  
  $.fn.createYplAutocomplete = function() {
    var $input = $(this);
 
    $input.yplautocomplete({
      source: function(request, response) {
        $.ajax({
          url: Drupal.settings.basePath + '?q=yleprograms/autocomplete/' + $input.attr('langquery') + '/' + Drupal.encodePath(request.term),
          type: 'GET',
          dataType: 'json',
          success: function(data) {
            response(data);
          }
        }); //ajax
      }, //source
      
      minLength: 2,
      delay: 700,
      
      select: function(event, ui) {
        var items = this.value.split(',');
        items.pop();
        var content = items.join(',');
        if (content.length > 0) {
          content += ', ';
        }
        $input.val(ui.item ? content + ui.item.title : this.value);
        return false;
      }
    }); // yplautocomplete
	
  };
  return this;  
  
  
})(jQuery);
