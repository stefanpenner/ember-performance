
/**
  Renders a list of items, then changes them all.
**/
Perf.MuchoTemplateBindingProfiler = Perf.Benchmark.extend({
  name: 'Mucho Template Bindings',

  viewContext: null,

  test: function(res) {
    var templateBindingsView = this.renderToScratch('containerRenderables', {
      container: Perf.__container__,
      context: this.get('viewContext')
    });
    this.set('templateBindingsView', templateBindingsView);
  },

  teardown: function(){
    this.get('templateBindingsView').destroy();
  }

});
