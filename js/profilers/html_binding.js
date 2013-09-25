/**
  Renders a view with a binding that contains a lot of HTML. The idea
  here is to check how the W3C Range API performs on large chunks of HTML
  nodes.
**/
Perf.HtmlBindingProfiler = Perf.Benchmark.extend({
  name: 'HTML Bindings',

  setup: function() {
    var largeHtmlChunk = "<ul>";
    for (var i = 0; i < 5000; i++) {
      largeHtmlChunk += "<li>Evil Trout</li>";
    }
    largeHtmlChunk += "</ul>";

    this.setProperties({
      'htmlBindingsView': this.renderToScratch('htmlBindings'),
      'largeHtmlChunk': largeHtmlChunk
    });
  },

  test: function() {
    var htmlBindingsView = this.get('htmlBindingsView');

    htmlBindingsView.set('html', this.get('largeHtmlChunk'));

    Ember.run.schedule('afterRender', htmlBindingsView, 'set', 'html', '');
  },

  teardown: function() {
    this.get('htmlBindingsView').destroy();
  }
});
