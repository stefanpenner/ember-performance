
/**
  Renders a list of items, then changes them all.
**/
Perf.MuchoTemplateBindingContainerRenderablesProfiler = Perf.MuchoTemplateBindingProfiler.extend({
  name: 'Mucho Template Bindings (container renderables, all miss)',

  setup: function(){
    this._super();
    Ember.FEATURES['container-renderables'] = true;
  },

  teardown: function() {
    Ember.FEATURES['container-renderables'] = false;
  }
});
