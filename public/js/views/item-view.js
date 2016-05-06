'use strict';

var app = app || {};

(function ($) {
  'use strict';

  app.ItemView = Backbone.View.extend({
    // el: '.item-view',
    tagName: 'tr',
    className: 'item-cell',
    events: {
      'dblclick': 'editItem',
      'keypress': 'updateOnEnter',
      'keydown': 'closeOnEsc',
      'blur': 'close'
    },
    template: _.template($('#item-template').html()),
    itemEditTemplate: _.template($('#item-edit-template').html()),
    initialize: function initialize() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
    },
    render: function render() {
      var output = this.template(this.model.toJSON());
      this.$el.html(output);
      return this;
    },
    editItem: function editItem(e) {
      var elem = $(e.target);
      var val = elem.html();
      this.lastEdited = val;
      elem.html(this.itemEditTemplate({ val: val }));
    },
    updateOnEnter: function updateOnEnter(e) {
      if (e.which === ENTER_KEY) {
        // cache the element to avoid excess jQuery selections
        var elem = $(e.target);
        // grab the user's input we want to save
        var valueToSave = elem.val();
        // put that value into the <td>
        elem.parent().html(valueToSave);
        // I want to save the user input to the model
        // but I don't know how to reference the correct
        // model attribute
        this.model.save();
      }
    },
    closeOnEsc: function closeOnEsc(e) {
      if (e.which === ESC_KEY) {
        this.close(e);
      }
    },
    close: function close(e) {
      var elem = $(e.target);
      $(e.target).parent().html(this.lastEdited);
    }
  });
})(jQuery);