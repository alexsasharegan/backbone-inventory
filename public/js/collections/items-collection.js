'use strict';

var app = app || {};

(function () {
  'use strict';

  var Inventory = Backbone.Collection.extend({
    model: app.Item,
    url: '/items'
  });

  app.items = new Inventory();
})();