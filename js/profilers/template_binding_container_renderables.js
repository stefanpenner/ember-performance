/**
  Renders a list of items, then changes them all.
**/
Perf.TemplateBindingContainerRenderablesProfiler = Perf.TemplateBindingProfiler.extend({

  name: 'Template Bindings (cr)',

  setup: function(){
    this._super();
    Ember.FEATURES['container-renderables'] = true;
  }
});
