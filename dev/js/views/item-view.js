var app = app || {};

(function($) {
  'use strict';

  var ItemView = Backbone.View.extend({
    // el: '.item-view',
    tagName: 'tr',
    template: _.template($('#item-template').html()),
    initialize: function () {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
    },
    render: function (model) {
      this.model = model;
      let output = template(this.model.toJSON());
      this.$el.html(output);
      return this;
    },
  });

}(jQuery));
