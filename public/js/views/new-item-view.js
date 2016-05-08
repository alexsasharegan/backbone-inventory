'use strict';

var app = app || {};

(function ($) {
  'use strict';

  app.NewItemView = Backbone.View.extend({
    tagName: 'tr',
    events: {
      'click button.save-item': 'newItem',
      'click button.delete-item': 'deleteItem',
      'keypress': 'enterNewItem'
    },
    template: _.template($('#new-item-template').html()),
    initialize: function initialize(attribute) {
      //
    },
    render: function render(attribute) {
      this.$el.html(this.template());
      return this;
    },
    newItem: function newItem(e) {
      var model = {};
      var $inputArr = $('input');
      _.each($inputArr, function (element, index, list) {
        model[element.name] = element.value;
      });
      app.items.create(model);
      this.remove();
    },
    enterNewItem: function enterNewItem(e) {
      if (e.which === ENTER_KEY) {
        this.newItem(e);
      }
    },
    deleteItem: function deleteItem(e) {
      this.remove();
    }
  });
})(jQuery);