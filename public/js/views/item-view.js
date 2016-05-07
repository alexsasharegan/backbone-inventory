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
      'blur input.input-edit': 'close'
    },
    template: _.template($('#item-template').html()),
    itemEditTemplate: _.template($('#item-edit-template').html()),
    lastEdited: {},
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
      // cache a $ version of the object that called the event
      var elem = $(e.target);
      // save the original <td> data
      var val = elem.html();
      // store the model attr name that is also the <td> class
      var prop = elem.attr('class');
      // save the value so we can revert to it later
      this.lastEdited[prop] = val;
      elem.html(this.itemEditTemplate({ val: val, prop: prop }));
    },
    updateOnEnter: function updateOnEnter(e) {
      if (e.which === ENTER_KEY) {
        // cache the element to avoid excess jQuery selections
        var elem = $(e.target);
        // grab the user's input we want to save
        var valueToSave = elem.val();
        // put that value into the <td>
        var attr = elem.parent().attr('class');
        elem.parent().html(valueToSave);
        // build our model hash
        var hash = {};
        // use the class name to get the model attr
        // and store the new value
        hash[attr] = valueToSave;
        // @PUT in the db
        this.model.save(hash);
      }
    },
    closeOnEsc: function closeOnEsc(e) {
      if (e.which === ESC_KEY) {
        this.close(e);
      }
    },
    close: function close(e) {
      var elem = $(e.target);
      var prop = elem.attr('name');
      $(e.target).parent().html(this.lastEdited[prop]);
    }
  });
})(jQuery);