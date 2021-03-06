var app = app || {};

(function($) {
  'use strict';

  app.NewItemView = Backbone.View.extend({
    tagName: 'tr',
    events: {
      'click button.save-item': 'newItem',
      'click button.delete-item': 'deleteItem',
      'keypress': 'enterNewItem',
    },
    template: _.template($('#new-item-template').html()),
    initialize: function (attribute) {
      //
    },
    render: function (attribute) {
      this.$el.html(this.template());
      return this;
    },
    newItem: function (e) {
      let model = {};
      let $inputArr = $('input');
      _.each($inputArr, function (element, index, list) {
        model[element.name] = element.value;
      });
      app.items.create(model);
      this.remove();
    },
    enterNewItem: function (e) {
      if (e.which === ENTER_KEY) {
        this.newItem(e);
      }
    },
    deleteItem: function (e) {
      this.remove();
    },
  });

}(jQuery));
