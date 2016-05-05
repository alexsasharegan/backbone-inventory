'use strict';

var app = app || {};

(function ($) {
  'use strict';

  app.AppView = Backbone.View.extend({
    el: '#app', // main container of div#app
    events: 'click .someclass', // TODO: add events for adding & editing items
    initialize: function initialize() {
      // cache the table body where inv items will be rendered
      this.$tbody = this.$('tbody.item-view');

      this.listenTo(app.items, 'add', this.addOne);
      this.listenTo(app.items, 'reset', this.addAll);
      // on doc load fetch all existing records from db
      // without triggering 'add' events for each record
      app.items.fetch({ reset: true });
    },
    render: function render() {
      //
    },
    addOne: function addOne(item) {
      // create and cache a new view
      // with the item passed in as the model
      var view = new app.ItemView({ model: item });
      // append the item view to our table body
      // by rendering the item view and accessing
      // it's generated dom element via the el prop
      // (this is why we "return this" inside of the render fun)
      this.$tbody.append(view.render().el);
    },
    addAll: function addAll() {
      // wipe our view clean
      this.$tbody.html('');
      app.items.each(this.addOne, this);
    }
  });
})(jQuery);