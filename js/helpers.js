Ember.Handlebars.helper('time', function(value, options) {
  if (typeof value === "undefined" || value === 0) { return new Handlebars.SafeString("&mdash;"); }
  return new Handlebars.SafeString((value * 1000).toFixed(3) + 'ms');
});
