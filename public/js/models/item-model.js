'use strict';

var app = app || {};

(function () {
  'use strict';

  app.Item = Backbone.Model.extend({
    defaults: {
      substrate: 'composite',
      type: '3mm brushed',
      manufacturer: 'DIBOND',
      format: 'rigid',
      size: '96x48',
      wholesaleCost: 100,
      retailPrice: 12,
      stock: 1
    }
  });
})();