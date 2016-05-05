'use strict';

var app = app || {};

(function ($) {
  'use strict';

  app.ItemView = Backbone.View.extend({
    // el: '.item-view',
    tagName: 'tr',
    template: _.template($('#item-template').html()),
    initialize: function initialize() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
    },
    render: function render() {
      var output = this.template(this.model.toJSON());
      this.$el.html(output);
      return this;
    }
  });
})(jQuery);